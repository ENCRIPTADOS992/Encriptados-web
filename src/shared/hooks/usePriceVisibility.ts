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
          const rect = entry.boundingClientRect;
          const rootBounds = entry.rootBounds;

          if (!rootBounds) {
            setIsVisible(entry.isIntersecting);
            return;
          }

          const viewportTop = rootBounds.top;
          const isBelowPrice = !entry.isIntersecting && rect.bottom <= viewportTop;

          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (isBelowPrice) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        },
        {
          root: null,
          threshold: 0.1,
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
