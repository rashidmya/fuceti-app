import { Socket } from "socket.io-client";



export interface UserSocket extends Socket {
    auth: {
      username?: string;
      sessionId?: string;
    }
    userId?: string;
  }
