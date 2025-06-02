import {
  HttpRequestMethod,
  HttpResponse,
  ResponseData,
} from "@fistware/http-core";

export async function buildResponse<M extends ResponseData>(
  response: Response,
): Promise<HttpResponse<M>> {
  const body: HttpResponse<M> = await response.json();

  const result: HttpResponse<M> = {
    data: body.data,
    message: body.message,
    status: body.status,
  };

  return result;
}

export function buildOptions(headers: Headers, method: HttpRequestMethod) {
  const h = new Headers();
  headers.forEach((v: string, k: string) => {
    h.set(k, v);
  });

  return {
    method,
    headers: h,
  };
}

export function maskSensitiveData(headers: Headers) {
  const headersObj = Object.fromEntries(headers.entries());
  headersObj.Authorization = String(
    headers?.get("Authorization")?.split(" ")[0],
  );

  return headersObj;
}
