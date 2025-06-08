import { HttpResponse, ResponseData } from "@fistware/http-core";
import { Logger } from "@fistware/logger";
import { NextRequest } from "next/server";
import { NextRequestProps } from "./interfaces/NextRequestProps";

export const logger = Logger({
  level: String(process.env.LOG_LEVEL || "info"),
  enabled: process.env.LOG_ENABLED === "true",
});

export async function logRequest(req: NextRequest, props: NextRequestProps) {
  const headers = Object.fromEntries(req.headers.entries());
  const { searchParams } = req.nextUrl;

  const body = await req.json();

  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  logger.info({
    method: req.method,
    url: req.url,
    request: {
      headers,
      body,
      params: props?.params,
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
