import { Request, Response } from "express";
import pool from "../config/db.config";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await pool.query("SELECT id,email,username,type,created_at, friends FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).json(user.rows[0])
  } catch (e) {
    console.log(e);
  }
};