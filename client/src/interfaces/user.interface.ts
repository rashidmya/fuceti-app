import { Message } from "./message.interface";

export interface User {
  self: boolean;
  userId: string;
  username: string;
  connected: boolean;
  messages: Array<Message>;
}

export interface UserReactive extends User {
  hasNewMessages: boolean;
}

export interface UserState {
  users: Array<User>;
  selectedUser: UserReactive | null;
}
