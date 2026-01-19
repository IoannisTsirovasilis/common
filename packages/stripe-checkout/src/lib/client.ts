import { HttpClient, HttpResponse } from "@fistware/http-client";
import { CreateCheckoutSessionRequest } from "./interfaces/CreateCheckoutSessionRequest";
import { CreateCheckoutSessionResponse } from "./interfaces/CreateCheckoutSessionResponse";
import { StripeLineItem } from "./interfaces/StripeLineItem";

const httpClient = HttpClient({
  baseUrl: String(process.env.API_URL_FOR_STRIPE),
});

export async function createCheckoutSession(lineItems: StripeLineItem[]) {
  const request: CreateCheckoutSessionRequest = {
    payload: {
      lineItems,
    },
  };

  const response: HttpResponse<CreateCheckoutSessionResponse> =
    await httpClient.post("", request);
  return response.data.url;
}
