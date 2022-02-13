import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
export interface UserSocket extends Socket {
  auth: {
    userId?: string;
  };
}

const URL = process.env.SERVER_URL || "http://localhost:3000";
const socket = io(URL, { autoConnect: false, withCredentials: true });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default <UserSocket>socket;
