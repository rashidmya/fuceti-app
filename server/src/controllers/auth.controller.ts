import { Request, Response } from "express";
import pool from "../config/db.config";
import bcrypt from "bcrypt";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import jwtTokens from "../utils/jwt";
import { refreshTokenSecret } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (email, username, password) 
      VALUES ($1, $2, $3) RETURNING *`,
      [email, username, hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (e: any) {
    res
      .status(500)
      .json({ status: 500, data: "Something went wrong..", error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // username check
    const users = await pool.query("SELECT * from users WHERE username = $1", [
      username,
    ]);
    if (users.rows.length === 0)
      return res
        .status(401)
        .json({ status: 401, error: "Username is incorrect!" });

    //password check
    const validatePassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validatePassword)
      return res
        .status(401)
        .json({ status: 401, error: "Password is incorrect!" });

    //jwt
    let tokens = jwtTokens(users.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.status(200).json(tokens);
    // res.status(200).json({ status: 200, data: "Successfully logged in" });
  } catch (e: any) {
    res.status(500).json({ status: 500, error: e.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const Rtoken = req.cookies.refresh_token;
    if (!Rtoken) return res.status(401).json({ error: "No refresh token" });
    jwt.verify(Rtoken, refreshTokenSecret, (err: any, user: any) => {
      if (err) res.status(401).json({ error: err.message });
      const tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true});
      res.json(tokens)
    });
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
};
