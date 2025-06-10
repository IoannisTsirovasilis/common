import { HttpPayload, HttpRequest, ResponseData } from "@fistware/http-core";
import Joi from "joi";

/**
 * Options for handling an API request in a Next.js environment.
 *
 * @typeParam P - The type of the HTTP payload.
 * @typeParam R - The type of the HTTP request, extending `HttpRequest<P>`.
 * @typeParam M - The type of the response data.
 *
 * @property action - An asynchronous function that processes the request fields and returns a result.
 * @property schema - (Optional) A Joi schema used to validate the request payload.
 * @property transformResponse - (Optional) A function to transform the response data before sending it to the client.
 * @property handleAuth - (Optional) An asynchronous function to handle authentication logic using the incoming Next.js request.
 */
export interface HandleApiRequestOptions<
  P extends HttpPayload,
  R extends HttpRequest<P>,
  M extends ResponseData,
> {
  action: (fields: R) => Promise<any>;
  schema?: Joi.Schema;
  transformResponse?: (data: any) => M | M[];
  handleAuth?: (headers: Record<string, string>) => Promise<void>;
}
