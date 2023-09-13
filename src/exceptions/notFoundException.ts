import { HttpStatusCode } from "../config";

export class NotFoundException extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = HttpStatusCode.notfound;
  }

  statusCode() {
    return this.status;
  }
}
