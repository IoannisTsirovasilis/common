import { HttpPayload, HttpRequest, ResponseData } from "@fistware/http-core";
import { validateParams, validateRequest } from "./lib/validation/validator";
import { HandleApiRequestOptions } from "./lib/interfaces/HandleApiRequestOptions";
import { logRequest, logResponse } from "./lib/logger";
import {
  buildResponse,
  buildServiceRequest,
  defaultTransformResponse,
  handleError,
} from "./lib/utils/utils";
import { NextRequest, NextResponse } from "next/server";
import { HEADERS } from "./lib/constants/constants";

export function handleApiRequest<
  P extends HttpPayload,
  R extends HttpRequest<P>,
  M extends ResponseData,
>(options: HandleApiRequestOptions<P, R, M>) {
  const {
    action,
    schema,
    transformResponse = defaultTransformResponse,
    handleAuth,
    paramsSchema,
  } = options;
  return async (req: NextRequest, props: { params: any }) => {
    try {
      logRequest(req, props?.params);

      if (handleAuth) {
        await handleAuth(req);
      }

      const fields = await validateRequest<P>(req, schema);

      const validatedParams = validateParams<P>(props?.params, paramsSchema);

      const requestFields = { ...fields, ...validatedParams };

      const serviceRequest = buildServiceRequest<P, R>(req, requestFields as P);

      const data = await action(serviceRequest);

      const response = buildResponse(data, transformResponse);

      logResponse(data, req);

      return NextResponse.json(response, {
        headers: HEADERS,
        status: response.status,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
