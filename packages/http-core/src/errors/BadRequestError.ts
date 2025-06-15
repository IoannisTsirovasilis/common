import { ResponseCode } from "../enums/ResponseCode.js";
import { HttpError } from "./HttpError.js";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, ResponseCode.BadRequest);
  }
}
