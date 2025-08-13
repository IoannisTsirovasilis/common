import {
  HttpPayload,
  HttpRequest,
  HttpRequestMethod,
  HttpResponse,
  ResponseData,
} from "@fistware/http-core";
import { getUnixTimestamp } from "@fistware/utils";

export async function buildResponse<
  M extends ResponseData,
  P extends HttpPayload,
>(response: Response, request: HttpRequest<P>): Promise<HttpResponse<M>> {
  const body: HttpResponse<M> = await response.json();

  const result: HttpResponse<M> = {
    headers: response.headers,
    data: body.data,
    message: body.message,
    status: body.status,
    requestId: String(request.headers?.get("x-request-id")),
    correlationId: String(request.headers?.get("x-correlation-id")),
    timestamp: getUnixTimestamp(),
  };

  return result;
}

export function buildOptions(headers: Headers, method: HttpRequestMethod) {
  const h = new Headers();
  headers.forEach((v: string, k: string) => {
    h.set(k, v);
  });

  const requestId = crypto.randomUUID();
  const correlationId = h.get("x-correlation-id") ?? crypto.randomUUID();
  h.set("x-request-id", requestId);
  h.set("x-correlation-id", correlationId);

  return {
    method,
    headers: h,
  };
}
