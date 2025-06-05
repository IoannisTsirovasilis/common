import { HttpPayload, ResponseData } from "@fistware/http-core";
import { FastifyRequest } from "fastify";
import Joi from "joi";

export interface HandleApiRequestOptions<
  P extends HttpPayload,
  M extends ResponseData,
> {
  action: (fields: P) => Promise<any>;
  schema?: Joi.Schema;
  transformResponse: (data: any) => M | M[];
  handleAuth?: (req: FastifyRequest) => Promise<void>;
}
