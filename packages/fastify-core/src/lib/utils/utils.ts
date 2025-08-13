import {
  HttpError,
  HttpResponse,
  ResponseCode,
  ResponseData,
} from "@fistware/http-core";
import { FastifyReply } from "fastify";
import { HEADERS } from "../constants/constants";
import { logError, logResponse } from "../logger";
import { getUnixTimestamp } from "@fistware/utils";

interface SendResponseOptions<M extends ResponseData> {
  reply: FastifyReply;
  data: M | M[];
  transformResponse: (data: any) => M | M[];
}

export function sendResponse<M extends ResponseData>(
  options: SendResponseOptions<M>,
) {
  const { reply, data, transformResponse } = options;

  const response: HttpResponse<M | M[]> = {
    data: transformResponse(data),
    message: "",
    status: ResponseCode.Ok,
    requestId: String(reply.getHeader("x-request-id")),
    correlationId: String(reply.getHeader("x-correlation-id")),
    timestamp: getUnixTimestamp(),
  };

  Object.entries(HEADERS).forEach(([key, value]) => reply.header(key, value));

  logResponse(response, reply);
  return reply.status(response.status).send(response);
}

export function sendErrorResponse(error: unknown, reply: FastifyReply) {
  const errorResponse = handleError(error);

  logError(error, errorResponse);

  Object.entries(HEADERS).forEach(([key, value]) => reply.header(key, value));
  return reply.status(errorResponse.status).send(errorResponse);
}

function handleError(error: unknown) {
  if (error instanceof HttpError) {
    return buildErrorResponse(error);
  }

  return buildGeneralErrorResponse(
    new Error("Something went wrong. Please try again later."),
  );
}

function buildErrorResponse(error: HttpError) {
  const res: HttpResponse<{}> = {
    data: {},
    message: error.message,
    status: error.status,
    requestId: String(error.requestId),
    correlationId: String(error.correlationId),
    timestamp: getUnixTimestamp(),
  };

  return res;
}

function buildGeneralErrorResponse(error: Error) {
  const status = ResponseCode.InternalServerError;
  const res: HttpResponse<{}> = {
    data: {},
    message: error.message,
    status,
    requestId: "",
    correlationId: "",
    timestamp: getUnixTimestamp(),
  };

  return res;
}

export function defaultTransformResponse(data: any) {
  return data as ResponseData | ResponseData[];
}
