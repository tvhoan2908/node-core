import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ILoginResponse } from "../resources/auth";
import { ResponseEntity } from "../../../resources";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req.body);

      ResponseEntity.ok<ILoginResponse>({ res, data });
    } catch (error) {
      next(error);
    }
  }
}
