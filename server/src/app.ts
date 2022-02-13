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
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("not logged in"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: id,
      username: (<UserSocket>socket).username
    });
  }
  socket.emit("users", users);

  //notify existing useeres
  socket.broadcast.emit('user connected', {
    userId: (<UserSocket>socket).id,
    username: (<UserSocket>socket).username
  })

  socket.on('private message', ({msg, to}) => {
    socket.to(to).emit('private message', {
      msg,
      from: socket.id
    })
  })
  
socket.on('disconnect', ()=> {
  socket.broadcast.emit('user disconnected', socket.id)
})
});

server.listen(port, () => console.log(`listening on ${port}`));
