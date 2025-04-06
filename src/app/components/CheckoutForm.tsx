import { stripePromise } from "@/app/utils/stripe-client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import React, { useCallback } from "react";

export const CheckoutForm = (props: { clientSecret: string }) => {
  // const fetchClientSecret = useCallback(() => {
  //   // Create a Checkout Session
  //   return fetch("/api/stripe/checkout-session", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.clientSecret);
  // }, []);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: props.clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
