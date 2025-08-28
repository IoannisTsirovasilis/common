import { HttpPayload, HttpError, ResponseCode } from "@fistware/http-core";
import Joi from "joi";
import { NextRequest } from "next/server";
import { NextRequestParts } from "../interfaces/NextRequestParts.js";
import { extractCorrelationId, extractRequestId } from "../utils/utils.js";

export function validateSchema(schema: Joi.Schema, value: unknown) {
  const result = schema.validate(value, {
    abortEarly: false,
    stripUnknown: true,
  });
  return result;
}

export function validateRequest<P extends HttpPayload>(
  req: NextRequest,
  parts: NextRequestParts,
  schema?: Joi.Schema,
) {
  if (!schema) {
    return {} as P;
  }
  const { body, query, params } = parts;

  const { error, value } = validateSchema(schema, {
    ...body,
    ...query,
    ...params,
  });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new HttpError(message, ResponseCode.BadRequest, {
      requestId: extractRequestId(req),
      correlationId: extractCorrelationId(req),
    });
  }

  return value as P;
}
