import { HttpResponse, ResponseData } from "@fistware/http-core";
import { Logger } from "@fistware/logger";
import { FastifyReply, FastifyRequest } from "fastify";

export const logger = Logger({
  level: String(process.env.LOG_LEVEL || "info"),
  enabled: process.env.LOG_ENABLED === "true",
});

export function logRequest(req: FastifyRequest) {
  logger.info({
    method: req.method,
    url: req.url,
    request: {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
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
  reply: FastifyReply,
) {
  logger.info({
    response: {
      status: response.status,
      data: response.data,
    },
    method: reply.request.method,
    url: reply.request.url,
    status: response.status,
  });
}
