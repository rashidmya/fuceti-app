export interface Message {
  sent?: Boolean;
  from?: UserId;
  to?: UserId;
  content: Content
}

export interface Content {
    text: string[];
    stamp: string;
}


type UserId = string;
