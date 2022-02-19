if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { UserSocket } from "./interfaces/socket.interface";
import express from "express";
import { Server } from "socket.io";
import bcrypt from "bcrypt";
import http from "http";
import cors, { CorsOptions } from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { randomBytes } from "crypto";
import Redis from "ioredis";
import { setupWorker } from "@socket.io/sticky";
import { createAdapter } from "@socket.io/redis-adapter";
import { RedisMessageStore, RedisSessionStore } from "./utils/redis";
import auth from "./routes/auth.route";
import users from "./routes/users.route";
import pool from "./config/db.config";
import { User } from "./interfaces/users.interface";

const randomId = () => randomBytes(8).toString("hex");
const clientURL = process.env.CLIENT_URL || "http://localhost:8080";

const app = express();
const server = http.createServer(app);
const redisClient = new Redis();

const sessionStore = new RedisSessionStore(redisClient);
const messageStore = new RedisMessageStore(redisClient);

const corsOptions: CorsOptions = {
  credentials: true,
  origin: clientURL,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    pool.query(
      "SELECT * from users WHERE username = $1",
      [username],
      (err, res) => {
        if (err) {
          return done(err);
        }
        if (res.rows.length === 0) {
          return done(null, false, { message: "Username is incorrect!" });
        }
        bcrypt.compare(password, res.rows[0].password, function (err, same) {
          if (err) {
            return done(err);
          }
          if (!same) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, res.rows[0]);
        });
      }
    );
  })
);

passport.serializeUser(function (user: User, done) {
  process.nextTick(function () {
    done(null, user.id);
  });
});

passport.deserializeUser(function (id: User, done) {
  process.nextTick(function () {
    pool.query(
      "SELECT id,username FROM users WHERE id = $1",
      [id],
      (err, res) => {
        if (err) {
          return done(err);
        }
        done(null, res.rows[0]);
      }
    );
  });
});

app.use("/api/auth/", auth);
app.use("/api/users/", users);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const io = new Server(server, {
  cors: {
    origin: clientURL,
    credentials: true,
  },
  adapter: createAdapter(redisClient, redisClient.duplicate()),
});

io.use(async (socket: UserSocket, next) => {
  const sessionId = socket.handshake.auth.sessionId;
  if (sessionId) {
    const session = await sessionStore.findSession(sessionId);
    if (session) {
      socket.sessionId = sessionId;
      socket.userId = session.userId;
      socket.username = session.username;
      return next();
    }
  }
  const userId = socket.handshake.auth.userId;
  const username = socket.handshake.auth.username;
  if (!userId || !username) {
    return next(new Error("not logged in"));
  }
  socket.userId = userId;
  socket.username = username;
  socket.sessionId = randomId();
  next();
});

io.on("connection", async (socket: UserSocket) => {
  sessionStore.saveSession(socket.sessionId, {
    userId: socket.userId,
    username: socket.username,
    connected: true,
  });

  socket.emit("session", {
    sessionId: socket.sessionId,
  });

  socket.join(socket.userId!);

  // fetch existing users
  const users: Array<any> = [];
  const [messages, sessions] = await Promise.all([
    messageStore.findMessagesForUser(socket.userId),
    sessionStore.findAllSessions(),
  ]);
  const messagesPerUser: any = new Map();
  messages.forEach((message: any) => {
    const { from, to } = message;
    const otherUser = socket.userId === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  sessions.forEach((session: UserSocket) => {
    users.push({
      userId: session.userId,
      username: session.username,
      connected: session.connected,
      messages: messagesPerUser.get(session.userId) || [],
    });
  });
  socket.emit("users", users);

  //notify existing users
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
    connected: true,
    messages: [],
  });

  // forward the eprivate message to thee right reecpieent (and to other tabs of seneedere)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userId,
      to,
    };
    socket.to(to).to(socket.userId!).emit("private message", message);
    messageStore.saveMessage(message);
  });

  socket.on("disconnect", async () => {
    const matchingSockeets = await io.in(socket.userId!).allSockets();
    const isDisconnected = matchingSockeets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit("user disconnected", socket.userId);
      sessionStore.saveSession(socket.sessionId, {
        userId: socket.userId,
        username: socket.username,
        connected: false,
      });
    }
  });
});

setupWorker(io);
