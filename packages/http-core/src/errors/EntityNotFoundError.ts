import { ResponseCode } from "../enums/ResponseCode.js";
import { HttpError } from "./HttpError.js";

export class EntityNotFoundError extends HttpError {
  constructor(message: string) {
    super(message, ResponseCode.NotFound);
    this.name = "EntityNotFoundError";
  }
}
