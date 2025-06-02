import { ResponseCode } from "../enums/ResponseCode";
import { HttpError } from "./HttpError";

export class UnauthorizedError extends HttpError {
  constructor() {
    super("User is not authorized", ResponseCode.Unauthorized);
  }
}
