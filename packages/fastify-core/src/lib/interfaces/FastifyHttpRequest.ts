import { RouteGenericInterface } from "fastify";

export interface FastifyHttpRequest extends RouteGenericInterface {
  Body: Record<string, unknown>;
  Params: Record<string, string>;
  Querystring: Record<string, string>;
  Headers: Record<string, string>;
}
