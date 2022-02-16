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
import { InMemorySessionStore } from "./utils/session";
import { InMemoryMessageStore } from "./utils/message";
import { randomBytes } from "crypto";

const sessionStore = new InMemorySessionStore();
const messageStore = new InMemoryMessageStore();

const randomId = () => randomBytes(8).toString("hex");

const port = process.env.PORT || 3000;
const clientURL = process.env.CLIENT_URL || "http://localhost:8080";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: clientURL,
    credentials: true,
  },
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

io.use((socket: UserSocket, next) => {
  const sessionId = socket.handshake.auth.sessionId;
  if (sessionId) {
    const session = sessionStore.findSession(sessionId);
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

io.on("connection", (socket: UserSocket) => {
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
  sessionStore.findAllSessions().forEach((session: UserSocket) => {
    users.push({
      userId: session.userId,
      username: session.username,
      connected: session.connected
    })
  })
  socket.emit("users", users);

  //notify existing useeres
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
    connected: true
  });

  socket.on("private message", ({ content, to }) => {
    socket.to(to).to(socket.userId!).emit("private message", {
      content,
      from: socket.userId,
      to
    });
  });

  socket.on("disconnect", async  () => {
    const matchingSockeets = await io.in(socket.userId!).allSockets();
    const isDisconnected = matchingSockeets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit("user disconnected", socket.userId);
      sessionStore.saveSession(socket.sessionId, {
        userId: socket.userId,
        username: socket.username,
        connected: false
      })
    }
  });
});

server.listen(port, () => console.log(`listening on ${port}`));
