import { HttpStatusCode } from "../config";

export class UnauthorizedException extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = HttpStatusCode.unauthorized;
  }

  statusCode() {
    return this.status;
  }
}
