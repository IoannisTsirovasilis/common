import { HttpError, ResponseCode } from "@fistware/http-core";
import { getUnixTimestamp } from "@fistware/utils";
export class NextError extends HttpError {
  readonly digest: string;
  constructor(
    message: string,
    status: ResponseCode,
    {
      requestId,
      correlationId,
    }: {
      requestId?: string;
      correlationId?: string;
    },
  ) {
    super(message, status, {
      requestId,
      correlationId,
    });

    const json = {
      requestId,
      correlationId,
      message,
      status,
      timestamp: getUnixTimestamp(),
    };

    this.digest = JSON.stringify(json);
  }
}
