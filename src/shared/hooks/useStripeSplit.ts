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

type Status = "idle" | "loading" | "ready" | "error";

const MAX_MOUNT_RETRIES = 10;
const MOUNT_RETRY_DELAY_MS = 150;
const INITIAL_MOUNT_DELAY_MS = 100;

export function useStripeSplit(enabled: boolean) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const splitRef = useRef<SplitCardElements | null>(null);
  const retryCountRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Si no está habilitado, limpiar y salir
    if (!enabled) {
      if (elementsRef.current) {
        try {
          unmountSplitCardElements(elementsRef.current);
        } catch {}
      }
      stripeRef.current = null;
      elementsRef.current = null;
      splitRef.current = null;
      retryCountRef.current = 0;
      setStatus("idle");
      setError(null);
      return;
    }

    // Si ya está montado, no hacer nada
    if (splitRef.current) {
      console.log("[useStripeSplit] Ya montado, ignorando");
      return;
    }

    mountedRef.current = true;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    async function mount() {
      if (!mountedRef.current) return;
      if (splitRef.current) {
        console.log("[useStripeSplit] Ya montado durante retry, saliendo");
        return;
      }

      setStatus("loading");
      
      try {
        setError(null);
        
        // Verificar que los elementos DOM existen antes de intentar montar
        const numberEl = document.querySelector("#card-number-el");
        const expiryEl = document.querySelector("#card-expiry-el");
        const cvcEl = document.querySelector("#card-cvc-el");
        
        if (!numberEl || !expiryEl || !cvcEl) {
          throw new Error(`No existe el elemento DOM (number: ${!!numberEl}, expiry: ${!!expiryEl}, cvc: ${!!cvcEl})`);
        }

        const stripe = await getStripe();
        if (!mountedRef.current) return;
        
        const elements = createCardElements(stripe);
        const split = mountSplitCardElements(elements, {
          number: "#card-number-el",
          expiry: "#card-expiry-el",
          cvc: "#card-cvc-el",
        });
        
        if (!mountedRef.current) {
          try {
            split.number.unmount();
            split.expiry.unmount();
            split.cvc.unmount();
          } catch {}
          return;
        }
        
        stripeRef.current = stripe;
        elementsRef.current = elements;
        splitRef.current = split;
        retryCountRef.current = 0;
        setStatus("ready");
        console.log("[useStripeSplit] ✅ Stripe montado correctamente");
      } catch (e: any) {
        if (!mountedRef.current) return;
        
        const errorMsg = e?.message || "No se pudo montar Stripe.";
        console.warn(`[useStripeSplit] ⚠️ Error montando (intento ${retryCountRef.current + 1}/${MAX_MOUNT_RETRIES}):`, errorMsg);
        
        // Reintentar si es un error de elemento DOM no encontrado
        if (errorMsg.includes("No existe") && retryCountRef.current < MAX_MOUNT_RETRIES) {
          retryCountRef.current += 1;
          retryTimeout = setTimeout(() => {
            if (mountedRef.current) mount();
          }, MOUNT_RETRY_DELAY_MS);
          return;
        }
        
        setError(errorMsg);
        setStatus("error");
      }
    }

    // Delay inicial para permitir que React renderice los elementos DOM
    const initialDelay = setTimeout(() => {
      if (mountedRef.current) mount();
    }, INITIAL_MOUNT_DELAY_MS);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialDelay);
      if (retryTimeout) clearTimeout(retryTimeout);
      // No limpiamos refs aquí porque el efecto se ejecutará de nuevo con enabled=false si es necesario
    };
  }, [enabled]);

  return { status, error, stripeRef, elementsRef, splitRef };
}
