import jwt from "jsonwebtoken";
import { User } from "../interfaces/users.interface";

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "accessxd";
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refreshxd";

function jwtTokens({ id, username, email }: User) {
  const user = { id, username, email };
  const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: "20s" });
  const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: "5m" });
  return { accessToken, refreshToken };
}

export default jwtTokens;
