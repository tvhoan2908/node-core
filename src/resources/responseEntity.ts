import { Response } from "express";
import { IBaseResponse, IResponseEntity } from "../@types";
import { HttpStatusCode } from "../config";

export class ResponseEntity {
  static ok<T>(request: IResponseEntity<T>) {
    const response: IBaseResponse<T> = {
      success: "success" in request ? request.success! : true,
      code: request.code || 200,
      message: request.message || "success",
      data: request.data,
      pagination: request.pagination,
      errors: request.errors,
    };
    request.res.status(request.code || 200).json(response);
  }

  static exception(res: Response, error: any, message?: string) {
    const code: number = error?.status || error?.response?.status || HttpStatusCode.internalServer;
    const response: IBaseResponse<unknown> = {
      success: false,
      code,
      message: message || error.message || "Something went wrong.",
    };

    res.status(code).json(response);
  }
}
