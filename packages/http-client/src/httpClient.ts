import {
  HttpPayload,
  HttpRequest,
  HttpRequestMethod,
  HttpResponse,
  ResponseData,
} from "@fistware/http-core";

import { buildOptions, buildResponse } from "./utils/httpUtils.js";
import { sanitizeLogHeaderRecord } from "./utils/logSanitization.js";
import {
  DEFAULT_REDACT_CENSOR,
  isLogRedactionEnabled,
  Logger,
  LoggerType,
  redactSensitiveObject,
  type DestinationStream,
} from "@fistware/logger";

/**
 * Creates an HTTP client instance with predefined configuration options.
 *
 * The returned client provides methods for making HTTP requests (`get`, `post`, `put`, `delete`)
 * to a specified base URL. Each method is generic and supports typed payloads and responses.
 * Logging can be enabled and configured via the options.
 *
 * @param options - Configuration options for the HTTP client.
 * @param options.baseUrl - The base URL to prefix all request URLs.
 * @param options.logging - Optional. Enables or disables logging of requests and responses.
 * @param options.loggingLevel - Optional. Specifies the logging level (e.g., 'info', 'debug').
 * @param options.logDestination - Optional. Pino destination stream (e.g. for tests).
 *
 * @returns An object with `get`, `post`, `put`, and `delete` methods for making HTTP requests.
 *
 * @template P - The type of the request payload.
 * @template Rq - The type of the HTTP request object.
 * @template M - The type of the response data.
 *
 * @example
 * ```typescript
 * const client = HttpClient({ baseUrl: 'https://api.example.com', logging: true });
 * const response = await client.get<MyPayload, MyRequest, MyResponse>('/endpoint', myRequest);
 * ```
 */
export function HttpClient(options: HttpClientOptions) {
  const { baseUrl, logging, loggingLevel, logDestination } = options;

  const logger = Logger({
    enabled: logging,
    level: loggingLevel,
    ...(logDestination ? { destination: logDestination } : {}),
  });

  return {
    get: <
      P extends HttpPayload,
      Rq extends HttpRequest<P>,
      M extends ResponseData,
    >(
      url: string,
      request: Rq,
    ): Promise<HttpResponse<M>> =>
      execute<P, M>({
        url: `${baseUrl}${url}`,
        request,
        method: HttpRequestMethod.GET,
        logger,
      }),
    post: <
      P extends HttpPayload,
      Rq extends HttpRequest<P>,
      M extends ResponseData,
    >(
      url: string,
      request: Rq,
    ): Promise<HttpResponse<M>> =>
      execute<P, M>({
        url: `${baseUrl}${url}`,
        request,
        method: HttpRequestMethod.POST,
        logger,
      }),
    put: <
      P extends HttpPayload,
      Rq extends HttpRequest<P>,
      M extends ResponseData,
    >(
      url: string,
      request: Rq,
    ): Promise<HttpResponse<M>> =>
      execute<P, M>({
        url: `${baseUrl}${url}`,
        request,
        method: HttpRequestMethod.PUT,
        logger,
      }),
    patch: <
      P extends HttpPayload,
      Rq extends HttpRequest<P>,
      M extends ResponseData,
    >(
      url: string,
      request: Rq,
    ): Promise<HttpResponse<M>> =>
      execute<P, M>({
        url: `${baseUrl}${url}`,
        request,
        method: HttpRequestMethod.PATCH,
        logger,
      }),
    delete: <
      P extends HttpPayload,
      Rq extends HttpRequest<P>,
      M extends ResponseData,
    >(
      url: string,
      request: Rq,
    ): Promise<HttpResponse<M>> =>
      execute<P, M>({
        url: `${baseUrl}${url}`,
        request,
        method: HttpRequestMethod.DELETE,
        logger,
      }),
  };
}

/**
 * Configuration options for creating an HTTP client instance.
 *
 * @property baseUrl - The base URL to prefix all request URLs.
 * @property logging - Optional. Enables or disables logging of HTTP requests and responses. Defaults to `true`.
 * @property loggingLevel - Optional. Specifies the logging level (e.g., 'info', 'debug'). Defaults to 'info'.
 */
export interface HttpClientOptions {
  baseUrl: string;
  logging?: boolean;
  loggingLevel?: string;
  /** Optional log output stream (e.g. for tests). */
  logDestination?: DestinationStream;
}

interface ExecuteOptions<P extends HttpPayload> {
  url: string;
  request: HttpRequest<P>;
  method: HttpRequestMethod;
  logger: LoggerType;
}

function buildRequestLogBody<P extends HttpPayload>(
  request: HttpRequest<P>,
  headers: Headers,
  redactLogs: boolean,
  censor: string,
): Record<string, unknown> {
  const safeHeaders = sanitizeLogHeaderRecord(
    Object.fromEntries(headers),
    censor,
    redactLogs,
  );
  return {
    headers: safeHeaders,
    payload: redactSensitiveObject(request.payload, censor, redactLogs),
  };
}

function buildResponseLogBody<M extends ResponseData>(
  result: HttpResponse<M>,
  redactLogs: boolean,
  censor: string,
): Record<string, unknown> {
  const safeHeaders = sanitizeLogHeaderRecord(
    Object.fromEntries(result.headers ?? new Headers()),
    censor,
    redactLogs,
  );
  return {
    ...(result as unknown as Record<string, unknown>),
    headers: safeHeaders,
    data: redactSensitiveObject(result.data, censor, redactLogs),
  };
}

async function execute<P extends HttpPayload, M extends ResponseData>(
  options: ExecuteOptions<P>,
): Promise<HttpResponse<M>> {
  const { url, request, method, logger } = options;
  const headers = request.headers ?? new Headers();
  const httpOptions = buildOptions(headers, method);
  const redactLogs = isLogRedactionEnabled();
  const censor = DEFAULT_REDACT_CENSOR;

  logger.info({
    url,
    request: buildRequestLogBody(request, headers, redactLogs, censor),
    method,
  });

  const response = await fetch(url, {
    ...httpOptions,
    ...(method === HttpRequestMethod.GET
      ? {}
      : { body: JSON.stringify(request.payload) }),
  });

  const result = await buildResponse<M>(response);
  logger.info({
    url,
    response: buildResponseLogBody(result, redactLogs, censor),
    method,
  });

  return result;
}
