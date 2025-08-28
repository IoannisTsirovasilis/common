import { HttpError, ResponseCode } from "@fistware/http-core";
import { NextError } from "../errors/NextError";
import { JSX } from "react";

export async function renderAsyncOrError(
  rendering: () => Promise<JSX.Element>,
): Promise<JSX.Element> {
  return await rendering().catch((error) => {
    if (error instanceof HttpError) {
      throw new NextError(error.message, error.status, {
        requestId: error.requestId,
        correlationId: error.correlationId,
      });
    }

    throw new NextError(
      "Something went wrong",
      ResponseCode.InternalServerError,
      {
        requestId: "",
        correlationId: "",
      },
    );
  });
}
