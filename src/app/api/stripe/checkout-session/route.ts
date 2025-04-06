import { getLineItem, getLineItems } from "@/app/actions/products";
import { stripe } from "@/app/utils/stripe-server";
import { Stripe } from "@stripe/stripe-js";

export async function POST(request: Request) {
  const data = await request.json();

  const keys = Object.keys(data);

  const products = [];

  for (const key of keys) {
    const quantity = Number(data[key]);
    if (quantity > 0) {
      products.push(await getLineItem(key, Number(data[key])));
    }
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["JP"],
    },
    line_items: products,
    mode: "payment",
    return_url: "http://localhost:3000/success",
  });

  // if (!session.url) {
  //   return new Response("Session URL not found", {
  //     status: 500,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

  // return Response.redirect(session.url, 303);
  return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
