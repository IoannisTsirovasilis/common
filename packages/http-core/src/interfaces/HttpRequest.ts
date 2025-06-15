import { HttpPayload } from "./HttpPayload.js";

export interface HttpRequest<P extends HttpPayload> {
  headers?: Headers;
  payload?: P;
}
