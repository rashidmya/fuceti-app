import { User } from "./user.interface";

export interface CallState {
  request: boolean;
  incoming: boolean;
  connected: boolean;
  user: User | null;
}
