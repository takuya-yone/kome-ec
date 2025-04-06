import { ENV } from "@/app/utils/config";
import Stripe from "stripe";

export const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);
