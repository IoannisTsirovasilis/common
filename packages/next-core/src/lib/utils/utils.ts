import {
  HttpError,
  HttpPayload,
  HttpRequest,
  HttpResponse,
  ResponseCode,
  ResponseData,
} from "@fistware/http-core";
import { NextRequest, NextResponse } from "next/server";
import { HEADERS } from "../constants/constants";
import { logError } from "../logger";

export function buildServiceRequest<
  P extends HttpPayload,
  Rs extends HttpRequest<P>,
>(req: NextRequest, payload: P) {
  const headers = new Headers();
  headers.set("x-forwarded-for", req.headers.get("x-forwarded-for") ?? "");

  const result = {
    headers,
    payload,
  } as Rs;

  return result;
}

export function buildResponse<M extends ResponseData>(
  data: M | M[],
  transformResponse: (data: any) => M | M[],
) {
  const response: HttpResponse<M | M[]> = {
    data: transformResponse(data),
    message: "",
    status: ResponseCode.Ok,
  };

  return response;
}

export function handleError(error: unknown) {
  let response: HttpResponse<{}>;
  if (error instanceof HttpError) {
    response = buildErrorResponse(error);
  } else {
    response = buildGeneralErrorResponse(
      new Error("Something went wrong. Please try again later."),
    );
  }

  logError(error, response);

  return NextResponse.json(response, {
    headers: HEADERS,
    status: response.status,
  });
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

export function defaultTransformResponse(data: any) {
  return data as ResponseData | ResponseData[];
}
