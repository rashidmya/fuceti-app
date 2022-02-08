import { Request } from 'express';
import { User } from './users.interface';

export interface TokenPayload {
    id: string,
    username: string,
    email: string,
}

export interface RequestWithUser extends Request {
    user: User
}