import { createCheckoutSession } from "../lib/client";
import { StripeLineItem } from "../lib/interfaces/StripeLineItem";

export function StripeCheckoutButton(props: CheckoutButtonProps) {
  return (
    <button
      className={props.className}
      type="button"
      onClick={() => {
        createCheckoutSession(props.lineItems).then((url) => {
          if (url) {
            window.location.href = url;
          }
        });
      }}
    >
      Checkout
    </button>
  );
}

export interface CheckoutButtonProps {
  lineItems: StripeLineItem[];
  className?: string;
}
