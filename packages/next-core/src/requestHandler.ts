import { HttpPayload, HttpRequest, ResponseData } from "@fistware/http-core";
import { validateRequest } from "./lib/validation/validator.js";
import { HandleApiRequestOptions } from "./lib/interfaces/HandleApiRequestOptions.js";
import { logRequest, logResponse } from "./lib/logger.js";
import {
  buildResponse,
  buildServiceRequest,
  defaultTransformResponse,
  extractRequestParts,
  handleError,
} from "./lib/utils/utils.js";
import { NextRequest, NextResponse } from "next/server";
import { NextRequestProps } from "./lib/interfaces/NextRequestProps.js";
import { HEADERS } from "./lib/constants/constants.js";

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
  } = options;
  return async (req: NextRequest, props: NextRequestProps) => {
    try {
      const requestParts = await extractRequestParts(req, props);
      logRequest(req, requestParts);

      if (handleAuth) {
        await handleAuth(requestParts.headers);
      }

      const fields = await validateRequest<P>(req, requestParts, schema);

      const serviceRequest = buildServiceRequest<P, R>(req, fields);

      const data = await action(serviceRequest);

      const response = buildResponse(data, transformResponse, req);

      logResponse(response, req);

      return NextResponse.json(response, {
        headers: HEADERS,
        status: response.status,
      });
    } catch (error: unknown) {
      return handleError(error, req);
    }
  };
}
