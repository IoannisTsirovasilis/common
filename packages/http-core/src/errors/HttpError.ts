import { ResponseCode } from "../enums/ResponseCode.js";

export class HttpError extends Error {
  status: ResponseCode;
  constructor(message: string, status: ResponseCode) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
