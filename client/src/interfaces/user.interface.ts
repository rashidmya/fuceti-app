  import { Message } from "./message.interface";
  export interface User {
    self: boolean;
    userId: string;
    username: string;
  }

  export interface UserReactive extends User {
    connected: boolean;
    messages: Array<Message>;
    hasNewMessages: boolean;
  }
  
  
  export interface UserState {
    users: Array<User>;
    selectedUser: UserReactive | null
  }
  