import { ResponseData } from "@fistware/http-client";

export interface CreateCheckoutSessionResponse extends ResponseData {
  url: string;
}
