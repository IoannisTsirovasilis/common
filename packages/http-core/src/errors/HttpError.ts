import { ResponseCode } from "../enums/ResponseCode.js";

export interface HttpErrorOptions {
  requestId?: string;
  correlationId?: string;
}

export class HttpError extends Error {
  status: ResponseCode;
  requestId?: string;
  correlationId?: string;

  constructor(
    message: string,
    status: ResponseCode,
    options?: HttpErrorOptions,
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.requestId = options?.requestId;
    this.correlationId = options?.correlationId;
  }

  /**
   * Returns a structured error object with tracing information
   * @returns Object containing error details and tracing info
   */
  toStructuredError(): {
    message: string;
    status: ResponseCode;
    requestId?: string;
    correlationId?: string;
    timestamp: string;
    stack?: string;
  } {
    return {
      message: this.message,
      status: this.status,
      requestId: this.requestId,
      correlationId: this.correlationId,
      timestamp: new Date().toISOString(),
    };
  }
}
