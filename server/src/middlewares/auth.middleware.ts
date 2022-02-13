import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { accessTokenSecret } from "../utils/jwt";

function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]; // Bearer Token
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: { message: "Null token" } });
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ error: { message: err.message } });
    (<any>req).user = user;
    next();
  });
}

export { authenticate };
