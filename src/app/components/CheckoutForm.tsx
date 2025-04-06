import { Button } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";

export const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <Button>Submit</Button>
    </form>
  );
};

export default CheckoutForm;
