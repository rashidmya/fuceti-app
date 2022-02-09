if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express, { Response } from "express";
import { Server } from "socket.io";
import http from "http";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import users from "./routes/auth.route";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;
const clientURL = process.env.CLIENT_URL || "http://localhost:8080/";

const corsOptions: CorsOptions = {
  credentials: true,
  origin: clientURL,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth/", users);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected!");
});

server.listen(port, () => console.log(`listening on ${port}`));
