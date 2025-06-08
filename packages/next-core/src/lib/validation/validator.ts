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
  schema?: Joi.Schema,
) {
  if (!schema) {
    return {} as P;
  }

  const request = await req.json();

  const query = Object.fromEntries(req.nextUrl.searchParams.entries());

  const { error, value } = validateSchema(schema, { ...request, ...query });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new BadRequestError(message);
  }

  return value as P;
}

export function validateParams<P extends HttpPayload>(
  params?: any,
  schema?: Joi.Schema,
) {
  if (!params) {
    return {} as P;
  }

  if (!schema) {
    return params as P;
  }

  const { error, value } = validateSchema(schema, params);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new BadRequestError(message);
  }

  return value as P;
}
