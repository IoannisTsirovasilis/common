import { BadRequestError, HttpPayload } from "@fistware/http-core";
import { FastifyRequest } from "fastify";
import Joi from "joi";
import { FastifyHttpRequest } from "../interfaces/FastifyHttpRequest";

export function validateSchema(schema: Joi.Schema, value: unknown) {
  const result = schema.validate(value, {
    abortEarly: false,
    stripUnknown: true,
  });
  return result;
}

export function validateRequest<
  R extends FastifyHttpRequest,
  P extends HttpPayload,
>(req: FastifyRequest<R>, schema: Joi.Schema): P {
  const fieldsToValidate = {
    ...(req.body ?? {}),
    ...(req.params ?? {}),
    ...(req.query ?? {}),
  };

  const { error, value } = validateSchema(schema, fieldsToValidate);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new BadRequestError(message);
  }

  return value as P;
}
