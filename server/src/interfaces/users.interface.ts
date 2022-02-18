import {Express} from 'express';
export interface User extends Express.User {
  id?: string;
  username?: string;
  email?: string;
}