import { ResponseCode } from "../enums/ResponseCode";
import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, ResponseCode.BadRequest);
  }
}
