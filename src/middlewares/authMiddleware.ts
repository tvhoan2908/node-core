import { NextFunction, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ResponseEntity } from "../resources";
import { HttpStatusCode } from "../config";
import { AccessDeniedException } from "../exceptions/accessDeniedException";
import { AuthUtils } from "../modules/users/utils/authUtils";
import { UnauthorizedException } from "../exceptions";
import { env } from "../env";
import { ConsoleUtils } from "../utils/console.utils";
import { UserService } from "../modules/users/services/user.service";
import { CustomRequest, IJwtPayload } from "../@types";
import { UserMapper } from "../modules/users/resources";

const logger = new ConsoleUtils("authMiddleware");
export const authMiddleware =
  (permissions?: string[]) => async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      permissions = permissions ?? [];
      const bearerToken = AuthUtils.getBearerToken(req);
      if (!bearerToken) throw new UnauthorizedException("unauthorized.");

      const payload = jwt.verify(bearerToken, env.jwtSecretKey) as IJwtPayload;
      logger.info("payload:", payload);
      const user = await UserService.getUserById(payload.id);
      const loggedUser = UserMapper.toLoggedInDTO(user);
      // Check user has all permisison
      const hasPermisison =
        permissions?.length > 0 ? permissions?.filter((item) => loggedUser?.permissions.includes(item)) : true;

      if (hasPermisison) {
        req.user = loggedUser;
      } else {
        throw new AccessDeniedException("forbiden");
      }
    } catch (error) {
      if (error instanceof AccessDeniedException)
        return ResponseEntity.ok({ res, success: false, message: "forbiden", code: HttpStatusCode.forbiden });
      let msgError = "unauthorized";
      if (error instanceof TokenExpiredError) {
        msgError = "token expired";
      } else if (error instanceof JsonWebTokenError) {
        msgError = "jwt malformed";
      }

      return ResponseEntity.ok({ res, message: msgError, success: false, code: HttpStatusCode.unauthorized });
    }
    next();
  };
