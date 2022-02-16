export interface Message {
  text: string[];
  stamp: string;
  sent?: Boolean;
  from?: UserId;
  to?: UserId;
}

type UserId = string;
