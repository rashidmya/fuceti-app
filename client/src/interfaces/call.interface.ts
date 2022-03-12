import { User } from "./user.interface";

export interface CallState {
  incoming: boolean;
  connected: boolean;
  user: User | null;
}
