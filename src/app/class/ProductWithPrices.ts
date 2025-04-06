import type { LineItem } from "@stripe/stripe-js";
import type Stripe from "stripe";

export type ProductWithPricesForDisplay = {
  id: string;
  name: string;
  description: string | null;
  images: Array<string>;
  primaryPrice: {
    currency: string;
    unit_amount: number | null;
  };
};

export class ProductWithPrices {
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

  toLineItem(): Stripe.Checkout.SessionCreateParams.LineItem {
    return {
      price_data: {
        currency: "jpy",
        product_data: {
          name: this.product.name,
          images: this.product.images,
        },
        unit_amount: this.primaryPrice?.unit_amount ?? 0,
      },
      quantity: 1,
    };
  }

  toJSON(): ProductWithPricesForDisplay {
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
