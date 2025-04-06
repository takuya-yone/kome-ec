import { ENV } from "@/app/utils/config";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(ENV.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
