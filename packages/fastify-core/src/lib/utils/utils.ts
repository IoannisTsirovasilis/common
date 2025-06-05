import {
  HttpError,
  HttpResponse,
  ResponseCode,
  ResponseData,
} from "@fistware/http-core";
import { FastifyReply } from "fastify";
import { HEADERS } from "../constants/constants";
import { logError, logResponse } from "../logger";

interface SendResponseOptions<M extends ResponseData> {
  reply: FastifyReply;
  data: M | M[];
  transformResponse: (data: unknown) => M | M[];
}

export function sendResponse<M extends ResponseData>(
  options: SendResponseOptions<M>,
) {
  const { reply, data, transformResponse } = options;

  const response: HttpResponse<M | M[]> = {
    data: transformResponse(data),
    message: "",
    status: ResponseCode.Ok,
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
  };

  return res;
}

function buildGeneralErrorResponse(error: Error) {
  const status = ResponseCode.InternalServerError;
  const res: HttpResponse<{}> = {
    data: {},
    message: error.message,
    status,
  };

  return res;
}
