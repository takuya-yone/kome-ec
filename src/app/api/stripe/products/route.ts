import { stripe } from "@/app/utils/stripe-server";
import type Stripe from "stripe";

export class ProductWithPricesForDisp {
  product: Stripe.Product;
  prices: Array<Stripe.Price>;
  primaryPrice?: Stripe.Price;

  constructor(product: Stripe.Product, prices: Array<Stripe.Price>) {
    this.product = product;
    this.prices = prices;
    this.primaryPrice = prices.find(
      (price) => price.id === product.default_price,
    );
  }

  toJSON() {
    if (!this.primaryPrice) {
      throw new Error("Primary price not found");
    }
    return {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      images: this.product.images,
      primaryPrice: (({ currency, unit_amount }) => ({
        currency,
        unit_amount,
      }))(this.primaryPrice),
      // prices: this.prices.map((price) => ({
      //   id: price.id,
      //   unit_amount: price.unit_amount,
      //   currency: price.currency,
      //   recurring: price.recurring,
      // })),
    };
  }
}

export async function GET(request: Request) {
  const products = await stripe.products.list();
  const productWithPricesForDispList = [];
  for await (const product of products.data) {
    const prices = await stripe.prices.list({
      product: product.id,
    });

    productWithPricesForDispList.push(
      new ProductWithPricesForDisp(product, prices.data).toJSON(),
    );
  }

  return new Response(
    JSON.stringify({ products: productWithPricesForDispList }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
