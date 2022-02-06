import { Request, Response } from "express";
import pool from '../db';
import { QueryResultRow } from "pg";

export const login = async (req: Request, res: Response) => {
    try {
        const users: QueryResultRow = await pool.query('SELECT * FROM users') 
        res.status(200).json({users: users.rows})
    } catch(e) {
        res.status(400).json(e)
    }
}