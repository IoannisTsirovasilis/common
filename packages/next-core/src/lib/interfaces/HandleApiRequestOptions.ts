import { HttpPayload, HttpRequest, ResponseData } from "@fistware/http-core";
import Joi from "joi";
import { NextRequest } from "next/server";

export interface HandleApiRequestOptions<
  P extends HttpPayload,
  R extends HttpRequest<P>,
  M extends ResponseData,
> {
  action: (fields: R) => Promise<any>;
  schema?: Joi.Schema;
  paramsSchema?: Joi.Schema;
  transformResponse: (data: any) => M | M[];
  handleAuth?: (req: NextRequest) => Promise<void>;
}
