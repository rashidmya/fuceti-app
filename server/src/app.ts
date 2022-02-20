if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.route";
import users from "./routes/users.route";
import { UserSocket } from "./interfaces/socket.interface";
import { RedisMessageStore, RedisSessionStore } from "./utils/redis";
import { randomBytes } from "crypto";
import Redis from "ioredis";
import { setupWorker } from "@socket.io/sticky";
import { createAdapter} from "@socket.io/redis-adapter";

const randomId = () => randomBytes(8).toString("hex");
const clientURL = process.env.CLIENT_URL || "http://localhost:8080";

const app = express();
const server = http.createServer(app);
const redisClient = new Redis();

const sessionStore = new RedisSessionStore(redisClient);
const messageStore = new RedisMessageStore(redisClient);

const io = new Server(server, {
  cors: {
    origin: clientURL,
    credentials: true,
  },
  adapter: createAdapter(redisClient,redisClient.duplicate())
});

const corsOptions: CorsOptions = {
  credentials: true,
  origin: clientURL,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth/", auth);
app.use("/api/users/", users);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
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
  ])
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
 
  socket.on('call request', to => {
    const callInfo = {
      from: {
        username: socket.username,
        userId: socket.userId
      }
    }
    socket.to(to).emit('call request', callInfo)
  })

  socket.on('call hangup', ({userId}) => {
    socket.to(userId).emit('call hangup')
  })

  socket.on('call decline', ({userId})=> {
    socket.to(userId).emit('call decline')
  })

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
