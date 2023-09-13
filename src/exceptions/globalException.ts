import { NextFunction, Request, Response } from "express";
import { ResponseEntity } from "../resources";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  ResponseEntity.exception(res, error);
  next();
};
