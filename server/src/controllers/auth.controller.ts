import { Request, Response } from "express";
import pool from "../config/db.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtTokens from "../utils/jwt";
import { refreshTokenSecret } from "../utils/jwt";
import { RequestWithUser } from "../interfaces/auth.interface";

const date = new Date();
const days = 30;
date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (email, username, password) 
      VALUES ($1, $2, $3) RETURNING *`,
      [email, username, hashedPassword]
    );
    const tokens = jwtTokens(newUser.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      expires: date,
    });
    res
      .status(200)
      .json({ token: tokens.accessToken, username, id: newUser.rows[0].id });
  } catch (e: any) {
    res.status(500).json({
      error: {
        status: 500,
        message: e.message,
      },
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // username check
    const user = await pool.query("SELECT * from users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0)
      return res
        .status(401)
        .send({ error: { status: 401, message: "Username is incorrect!" } });

    //password check
    const validatePassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!validatePassword)
      return res
        .status(401)
        .json({ error: { status: 401, message: "Password is incorrect!" } });

    //jwt
    const tokens = jwtTokens(user.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      expires: date,
    });
    res
      .status(200)
      .json({ token: tokens.accessToken, username, id: user.rows[0].id });
  } catch (e: any) {
    res.status(500).json({ error: { status: 500, message: e.message } });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(401).json({ error: { message: "no refresh token" } });
    jwt.verify(refreshToken, refreshTokenSecret, (err: any, user: any) => {
      if (err) res.status(401).json({ error: { message: err.message } });
      const tokens = jwtTokens(user);
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        expires: date,
      });
      res.json({ token: tokens.accessToken });
    });
  } catch (e: any) {
    res.status(401).json({ error: { status: 401, message: e.message } });
  }
};

export const verify = async (req: RequestWithUser, res: Response) => {
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refresh_token");
    res.status(200).json({ status: 200, message: "Logged out!" });
  } catch (e: any) {
    res.status(500).json({ error: { status: 500, message: e.message } });
  }
};
