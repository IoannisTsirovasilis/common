import { HttpPayload, ResponseData } from "@fistware/http-core";
import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyHttpRequest } from "./lib/interfaces/FastifyHttpRequest";
import { validateRequest } from "./lib/validation/validator";
import { HandleApiRequestOptions } from "./lib/interfaces/HandleApiRequestOptions";
import { logRequest } from "./lib/logger";
import {
  defaultTransformResponse,
  sendErrorResponse,
  sendResponse,
} from "./lib/utils/utils";

export function handleApiRequest<
  P extends HttpPayload,
  R extends FastifyHttpRequest,
  M extends ResponseData,
>(options: HandleApiRequestOptions<P, M>) {
  const {
    action,
    schema,
    transformResponse = defaultTransformResponse,
    handleAuth,
  } = options;
  return async (req: FastifyRequest<R>, reply: FastifyReply) => {
    try {
      logRequest(req);

      if (handleAuth) {
        await handleAuth(req.headers as Record<string, string>);
      }

      const fields = schema
        ? await validateRequest<R, P>(req, schema)
        : ({} as P);

      const data = await action(fields);

      return sendResponse({
        reply,
        data,
        transformResponse,
      });
    } catch (error: unknown) {
      return sendErrorResponse(error, reply);
    }
  };
}
