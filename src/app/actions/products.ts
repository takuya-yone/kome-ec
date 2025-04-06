"use server";
import { stripe } from "@/app/utils/stripe-server";

import { ProductWithPrices } from "@/app/class/ProductWithPrices";

export async function getProducts() {
  const products = await stripe.products.list();
  const productWithPricesForDispList = [];
  for await (const product of products.data) {
    const prices = await stripe.prices.list({
      product: product.id,
    });

    productWithPricesForDispList.push(
      new ProductWithPrices(product, prices.data, 0).toJSON(),
    );
  }
  return productWithPricesForDispList;
}

export async function getLineItem(id: string, quantity: number) {
  const product = await stripe.products.retrieve(id);
  const prices = await stripe.prices.list({
    product: product.id,
  });

  return new ProductWithPrices(product, prices.data, quantity).toLineItem();
}

export async function getLineItems() {
  const products = await stripe.products.list();
  const lineItems = [];
  for await (const product of products.data) {
    const prices = await stripe.prices.list({
      product: product.id,
    });

    lineItems.push(new ProductWithPrices(product, prices.data, 0).toLineItem());
  }
  return lineItems;
}
