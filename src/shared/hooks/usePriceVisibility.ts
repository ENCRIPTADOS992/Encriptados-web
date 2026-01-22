// src/shared/hooks/usePriceVisibility.ts
"use client";

import { useEffect, useState } from "react";

export const usePriceVisibility = (targetRef: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const el = targetRef.current;
      if (!el) {
        requestAnimationFrame(setup);
        return;
      }

      if (typeof IntersectionObserver === "undefined") {
        const handleScroll = () => {
          const rect = el.getBoundingClientRect();
          const viewportTop = 0;
          const isBelowPrice = rect.bottom <= viewportTop;
          setIsVisible(!isBelowPrice);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        cleanup = () => window.removeEventListener("scroll", handleScroll);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // Simplificado: visible si está intersecando con el viewport
          setIsVisible(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "-50px 0px 0px 0px", // Margen superior para activar un poco antes
        }
      );

      observer.observe(el);
      cleanup = () => observer.disconnect();
    };

    setup();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [targetRef]);

  return { isVisible };
};
