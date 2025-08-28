import {
  HttpError,
  HttpPayload,
  HttpRequest,
  HttpResponse,
  ResponseCode,
  ResponseData,
} from "@fistware/http-core";
import { NextRequest, NextResponse } from "next/server";
import { HEADERS } from "../constants/constants.js";
import { logError } from "../logger.js";
import { NextRequestProps } from "../interfaces/NextRequestProps.js";
import { NextRequestParts } from "../interfaces/NextRequestParts.js";
import { getUnixTimestamp } from "@fistware/utils";

export function buildServiceRequest<
  P extends HttpPayload,
  Rs extends HttpRequest<P>,
>(req: NextRequest, payload: P) {
  const { headers } = req;

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
  req: NextRequest,
) {
  const response: HttpResponse<M | M[]> = {
    data: transformResponse(data),
    message: "",
    status: ResponseCode.Ok,
    requestId: extractRequestId(req),
    correlationId: extractCorrelationId(req),
    timestamp: getUnixTimestamp(),
  };

  return response;
}

export function handleError(error: unknown, req: NextRequest) {
  const err =
    error instanceof HttpError
      ? error
      : new HttpError(
          "Something went wrong. Please try again later.",
          ResponseCode.InternalServerError,
          {
            requestId: extractRequestId(req),
            correlationId: extractCorrelationId(req),
          },
        );
  const response: HttpResponse<{}> = buildErrorResponse(err);

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
    requestId: error.requestId || "",
    correlationId: error.correlationId || "",
    timestamp: getUnixTimestamp(),
  };

  return res;
}

export function defaultTransformResponse(data: any) {
  return data as ResponseData | ResponseData[];
}

export async function extractRequestParts(
  req: NextRequest,
  props: NextRequestProps,
) {
  const body = await extractBody(req);
  const params = await extractPathParams(props);
  const query = extractQueryParams(req);
  const headers = extractHeaders(req);

  return {
    body,
    params,
    query,
    headers,
  } as NextRequestParts;
}

async function extractBody(req: NextRequest) {
  return await req.json().catch(() => ({}));
}

async function extractPathParams(props: NextRequestProps) {
  if (!props) {
    return {};
  }

  const params = await props.params;

  return params || {};
}

function extractQueryParams(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  return query;
}

function extractHeaders(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}

export function extractRequestId(req: NextRequest) {
  return req.headers.get("x-request-id") || "";
}

export function extractCorrelationId(req: NextRequest) {
  return req.headers.get("x-correlation-id") || "";
}
