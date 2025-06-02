import {
  HttpPayload,
  HttpRequest,
  HttpRequestMethod,
  HttpResponse,
  ResponseData,
} from "@fistware/http-core";
import { CreateLogger } from "./logger";
import {
  buildOptions,
  buildResponse,
  maskSensitiveData,
} from "./utils/httpUtils";
import { Logger } from "pino";

export function HttpClient(options: HttpClientOptions) {
  const { baseUrl, logging, loggingLevel } = options;

  const logger = CreateLogger({
    enabled: logging,
    level: loggingLevel,
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

export interface HttpClientOptions {
  baseUrl: string;
  logging?: boolean;
  loggingLevel?: string;
}

interface ExecuteOptions<P extends HttpPayload> {
  url: string;
  request: HttpRequest<P>;
  method: HttpRequestMethod;
  logger: Logger<never, boolean>;
}

async function execute<P extends HttpPayload, M extends ResponseData>(
  options: ExecuteOptions<P>,
): Promise<HttpResponse<M>> {
  const { url, request, method, logger } = options;
  const headers = request.headers ?? new Headers();
  const httpOptions = buildOptions(headers, method);

  const headersObj = maskSensitiveData(headers);

  logger.info({
    url,
    request: {
      ...request,
      headers: headersObj,
    },
    method,
  });

  const response = await fetch(url, {
    ...httpOptions,
    body: JSON.stringify(request.payload),
  });

  const result = await buildResponse<M>(response);

  logger.info({ url, result, method });

  return result;
}
