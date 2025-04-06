"use client";
import { CheckoutForm } from "@/app/components/CheckoutForm";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProducts } from "./actions/products";
import type { ProductWithPricesForDisplay } from "./class/ProductWithPrices";

export default function Home() {
  const [products, setProducts] = useState<ProductWithPricesForDisplay[]>();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <div className="p-20">
        <main className="">
          <div className="py-10">
            <Typography className="bg-gray-100 overflow-auto" variant="body1">
              {JSON.stringify(products, null, 2)}
            </Typography>
          </div>

          <div className="border-amber-200 border-8">
            <CheckoutForm />
          </div>

          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left">
            <li className="mb-2 tracking-[-.01em]">
              <Typography>
                Get started by editing
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  src/app/page.tsx
                </code>
              </Typography>
            </li>
            <li>
              <Typography>Save and see your changes instantly.</Typography>
            </li>

            <form action="/api/stripe/checkout-session" method="POST">
              <Button type="submit">Checkout</Button>
            </form>
            <Button variant="text">
              <p>あいうえお</p>
            </Button>
            <button type="button">Text</button>
            <p>あいうえお</p>
            <Typography>あいうえお</Typography>
          </ol>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
