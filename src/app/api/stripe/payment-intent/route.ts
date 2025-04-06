import { stripe } from "@/app/utils/stripe-server";

export async function POST(request: Request) {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "jpy",
    payment_method_types: ["card"],
  });

  return new Response(JSON.stringify({ clientSecret: intent.client_secret }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
