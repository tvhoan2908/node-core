import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { ResponseEntity } from "../resources";
import { HttpStatusCode } from "../config";

export const validateRequestMiddleware = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errors = error.details.map((item) => item.message);
    return ResponseEntity.ok({ res, errors, message: "Invalid request", code: HttpStatusCode.unProcessableContent });
  }

  next();
};
