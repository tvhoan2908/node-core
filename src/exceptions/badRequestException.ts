import { HttpStatusCode } from "../config";

export class BadRequestException extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = HttpStatusCode.badRequest;
  }

  statusCode() {
    return this.status;
  }
}
