import { Request, Response } from "express";
import pool from "../config/db.config";
import bcrypt from "bcrypt";
import { RequestWithUser } from "../interfaces/auth.interface";

const date = new Date();
const days = 30;
date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `INSERT INTO users (email, username, password) 
      VALUES ($1, $2, $3) RETURNING *`,
      [email, username, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ status: 500, error: { message: err } });
        }
        const user = {
          username,
          password,
        };
        req.login(user, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ status: 500, error: { message: err } });
          }
          res.status(200).json({ message: "success", status: 200 });
        });
      }
    );

    res.status(200).json({ message: "success", status: 200 });
  } catch (e: any) {
    res.status(500).json({ status: 500, error: { message: e.message } });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "success", status: 200 });
  } catch (e: any) {
    res.status(500).json({ status: 500, error: { message: e.message } });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    req.logout();
  } catch (e: any) {
    res.status(500).json({ status: 500, error: { message: e.message } });
  }
};
