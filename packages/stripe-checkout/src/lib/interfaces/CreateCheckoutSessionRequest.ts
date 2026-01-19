import { HttpRequest, HttpPayload } from "@fistware/http-client";

export interface CreateCheckoutSessionRequest extends HttpRequest<CreateCheckoutSessionPayload> {}

export interface CreateCheckoutSessionPayload extends HttpPayload {
  lineItems: {
    price: string;
    quantity: number;
  }[];
}
