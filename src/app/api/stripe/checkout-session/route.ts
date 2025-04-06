import { stripe } from "@/app/utils/stripe-server";

export async function POST(request: Request) {
  // const session = await stripe.checkout.sessions.create({
  //   billing_address_collection: "required",
  //   shipping_address_collection: {
  //     allowed_countries: ["JP"],
  //   },
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "jpy",
  //         product_data: {
  //           name: "T-shirt",
  //           images: ["https://example.com/t-shirt.png"],
  //         },
  //         unit_amount: 1099,
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   automatic_tax: {
  //     enabled: true,
  //   },
  //   mode: "payment",
  //   success_url: "https://example.com/success",
  // });

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["JP"],
    },
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "KOME",
            images: [
              "https://img.dinos.co.jp/kp/defaultMall/images/goods/KHD/2024/etc/KH7412c1.jpg?Mode=l11",
              "https://img.dinos.co.jp/kp/defaultMall/images/goods/KHD/2024/etc/KH7408c1.jpg?Mode=l11",
            ],
          },
          unit_amount: 1099,
        },
        quantity: 1,
      },
    ],
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
