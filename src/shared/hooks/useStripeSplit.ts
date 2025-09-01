// src/hooks/useStripeSplit.ts
"use client";

import { useEffect, useRef, useState } from "react";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import {
  getStripe,
  createCardElements,
  mountSplitCardElements,
  unmountSplitCardElements,
  type SplitCardElements,
} from "@/payments/stripeClient";

type Status = "idle" | "ready" | "error";

export function useStripeSplit(enabled: boolean) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const splitRef = useRef<SplitCardElements | null>(null);

  useEffect(() => {
    let mounted = true;

    async function mount() {
      if (!enabled || splitRef.current) return;
      try {
        setError(null);
        const stripe = await getStripe();
        const elements = createCardElements(stripe);
        const split = mountSplitCardElements(elements, {
          number: "#card-number-el",
          expiry: "#card-expiry-el",
          cvc: "#card-cvc-el",
        });
        if (!mounted) {
          split.number.unmount(); split.expiry.unmount(); split.cvc.unmount();
          return;
        }
        stripeRef.current = stripe;
        elementsRef.current = elements;
        splitRef.current = split;
        setStatus("ready");
      } catch (e: any) {
        setError(e?.message || "No se pudo montar Stripe.");
        setStatus("error");
      }
    }

    mount();

    return () => {
      mounted = false;
      if (elementsRef.current) unmountSplitCardElements(elementsRef.current);
      stripeRef.current = null;
      elementsRef.current = null;
      splitRef.current = null;
      setStatus("idle");
    };
  }, [enabled]);

  return { status, error, stripeRef, elementsRef, splitRef };
}
