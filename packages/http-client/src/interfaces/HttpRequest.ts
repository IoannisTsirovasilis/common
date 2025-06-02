import { HttpPayload } from "./HttpPayload";

export interface HttpRequest<P extends HttpPayload> {
  headers?: Headers;
  payload?: P;
}
