// src/shared/hooks/usePriceVisibility.ts
"use client";

import { useEffect, useState } from "react";

export const usePriceVisibility = (targetRef: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(true); 

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const rect = entry.boundingClientRect;
        const rootBounds = entry.rootBounds;

        // fallback simple
        if (!rootBounds) {
          setIsVisible(entry.isIntersecting);
          return;
        }

        const viewportTop = rootBounds.top; // normalmente 0

        // El bloque de precio ya se fue completamente hacia arriba (estás debajo de él)
        const isBelowPrice = !entry.isIntersecting && rect.bottom <= viewportTop;

        if (entry.isIntersecting) {
          // El precio está en pantalla → sin banner
          setIsVisible(true);
        } else if (isBelowPrice) {
          // Ya pasaste el precio hacia abajo → mostrar banner (visible = false en tu lógica)
          setIsVisible(false);
        } else {
          // Estás por encima del precio (aún no llegas) → sin banner
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return { isVisible };
};
