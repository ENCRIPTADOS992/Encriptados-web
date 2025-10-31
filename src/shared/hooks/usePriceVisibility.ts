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
        setIsVisible(entry.isIntersecting);
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
