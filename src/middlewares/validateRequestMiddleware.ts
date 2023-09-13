import { NextFunction, Response } from "express";
import { Schema } from "joi";
import { ResponseEntity } from "../resources";
import { HttpStatusCode } from "../config";
import { CustomRequest } from "../@types";

export const validateRequestMiddleware =
  (schema: Schema) => (req: CustomRequest, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errors = error.details.map((item) => item.message);
      req.invalidError = { message: "Invalid Request", errors };
      return ResponseEntity.ok({ res, errors, message: "Invalid request", code: HttpStatusCode.unProcessableContent });
    }

    next();
  };
