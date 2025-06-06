import { BadRequestError, HttpPayload } from "@fistware/http-core";
import Joi from "joi";
import { NextRequest } from "next/server";

export function validateSchema(schema: Joi.Schema, value: unknown) {
  const result = schema.validate(value, {
    abortEarly: false,
    stripUnknown: true,
  });
  return result;
}

export async function validateRequest<P extends HttpPayload>(
  req: NextRequest,
  schema: Joi.Schema,
) {
  const request = await req.json();

  const { error, value } = validateSchema(schema, request);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new BadRequestError(message);
  }

  return value as P;
}

export function validateParams<P extends HttpPayload>(
  params: any,
  schema: Joi.Schema,
) {
  const { error, value } = validateSchema(schema, params);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new BadRequestError(message);
  }

  return value as P;
}
