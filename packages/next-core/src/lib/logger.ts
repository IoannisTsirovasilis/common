import { HttpResponse, ResponseData } from "@fistware/http-core";
import { Logger } from "@fistware/logger";
import { NextRequest } from "next/server";
import { NextRequestParts } from "./interfaces/NextRequestParts";

export const logger = Logger({
  level: String(process.env.LOG_LEVEL || "info"),
  enabled: process.env.LOG_ENABLED === "true",
});

export function logRequest(req: NextRequest, parts: NextRequestParts) {
  const { headers, body, query, params } = parts;

  logger.info({
    method: req.method,
    url: req.nextUrl,
    request: {
      headers,
      body,
      params,
      query,
    },
  });
}

export function logError(error: unknown, response: HttpResponse<{}>) {
  logger.error({
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    response: {
      status: response.status,
      data: response.data,
      message: response.message,
    },
    status: response.status,
  });
}

export function logResponse<M extends ResponseData>(
  response: HttpResponse<M | M[]>,
  req: NextRequest,
) {
  logger.info({
    response: {
      status: response.status,
      data: response.data,
    },
    method: req.method,
    url: req.url,
    status: response.status,
  });
}
