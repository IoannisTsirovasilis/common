import { HttpPayload, HttpRequest, ResponseData } from "@fistware/http-core";
import { validateRequest } from "./lib/validation/validator";
import { HandleApiRequestOptions } from "./lib/interfaces/HandleApiRequestOptions";
import { logRequest, logResponse } from "./lib/logger";
import {
  buildResponse,
  buildServiceRequest,
  defaultTransformResponse,
  extractRequestParts,
  handleError,
} from "./lib/utils/utils";
import { NextRequest, NextResponse } from "next/server";
import { HEADERS } from "./lib/constants/constants";
import { NextRequestProps } from "./lib/interfaces/NextRequestProps";

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
        await handleAuth(req);
      }

      const fields = await validateRequest<P>(req, requestParts, schema);

      const serviceRequest = buildServiceRequest<P, R>(req, fields);

      const data = await action(serviceRequest);

      const response = buildResponse(data, transformResponse);

      logResponse(response, req);

      return NextResponse.json(response, {
        headers: HEADERS,
        status: response.status,
      });
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
