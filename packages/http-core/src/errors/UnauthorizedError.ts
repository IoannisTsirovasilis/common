import { ResponseCode } from "../enums/ResponseCode.js";
import { HttpError } from "./HttpError.js";

export class UnauthorizedError extends HttpError {
  constructor() {
    super("User is not authorized", ResponseCode.Unauthorized);
    this.name = "UnauthorizedError";
  }
}
