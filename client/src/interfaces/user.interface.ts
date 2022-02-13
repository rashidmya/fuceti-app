export interface UsersReactive {
    connected: boolean;
    messages: Array<string>;
    hasNewMessages: boolean;
  }
  
  export interface UsersEvent extends UsersReactive {
    self: boolean;
    userId: string;
  }
  
  export interface UserState {
    users: Array<UsersEvent>;
  }
  
  