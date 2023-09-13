import jwt from "jsonwebtoken";
import { User } from "../../../databases/entities";
import { env } from "../../../env";
import { Request } from "express";
import { IJwtPayload } from "../../../@types";

export class AuthUtils {
  static generateToken(payload: User): string {
    const jwtPayload: IJwtPayload = {
      id: payload.id,
      username: payload.username,
    };
    return jwt.sign(jwtPayload, env.jwtSecretKey!, { expiresIn: "1d" });
  }

  static getBearerToken(req: Request): string | null {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token.toString();
    }
    return null;
  }
}
