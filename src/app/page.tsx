"use client";
import { CheckoutForm } from "@/app/components/CheckoutForm";
import { stripePromise } from "@/app/utils/stripe-client";
import { Button, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const hasAPICalledRef = useRef(false);
  const [piClientSecret, setPiClientSecret] = useState("");

  useEffect(() => {
    if (hasAPICalledRef.current) return;
    hasAPICalledRef.current = true;
    fetch("/api/stripe/payment-intent", {
      method: "post",
    })
      .then((data) => data.json())
      .then((response) => setPiClientSecret(response.clientSecret));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
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

          {piClientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: piClientSecret,
              }}
            >
              <CheckoutForm />
            </Elements>
          )}

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
  );
}
