import { NextFunction, Response } from "express";
import { ResponseEntity } from "../../../resources";
import { CustomRequest } from "../../../@types";

export class UserController {
  static async getMe(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      ResponseEntity.ok({ res });
    } catch (error) {
      next(error);
    }
  }
}
