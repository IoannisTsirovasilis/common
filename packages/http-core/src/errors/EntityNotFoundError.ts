import { ResponseCode } from "../enums/ResponseCode";
import { HttpError } from "./HttpError";

export class EntityNotFoundError extends HttpError {
  constructor(message: string) {
    super(message, ResponseCode.NotFound);
  }
}
