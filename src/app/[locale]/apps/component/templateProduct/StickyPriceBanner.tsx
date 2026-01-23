"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";

interface StickyPriceBannerProps {
  visible: boolean;
  productInfo: {
    title: string;
    price: string;
    subtitle?: string;
    iconUrl: string;
    ctaLabel?: string;
    onBuy?: () => void;
    onChat?: () => void;
  };
}

const StickyPriceBannerUnified: React.FC<StickyPriceBannerProps> = ({
  visible,
  productInfo,
}) => {
  const { isFromAppMobile } = useAppMobile();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Detectar orientación landscape en móvil
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscapeMobile(isMobile && isLandscape);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  // Reset dismissed state when visibility changes to true
  useEffect(() => {
    if (visible) {
      setIsDismissed(false);
    }
  }, [visible]);

  // Detectar clic fuera del banner para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (bannerRef.current && !bannerRef.current.contains(event.target as Node)) {
        setIsDismissed(true);
      }
    };

    if (visible && !isDismissed) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [visible, isDismissed]);

  // No mostrar si: no visible, es app mobile, es landscape en móvil, o fue cerrado
  if (!visible || isFromAppMobile || isLandscapeMobile || isDismissed) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1320px]"
    >
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#1b1b1b] to-[#0f0f0f] shadow-[0_24px_60px_rgba(0,0,0,0.55)] px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={productInfo.iconUrl}
                alt={productInfo.title}
                className="h-full w-full object-cover aspect-square"
              />
            </div>
            <div className="min-w-0">
              <div className="text-white font-semibold text-lg sm:text-xl truncate">
                {productInfo.title}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end lg:gap-10">
            <div className="text-left lg:text-right">
              <div className="text-white/75 text-xs sm:text-sm leading-none">
                Desde
              </div>
              <div className="text-white font-bold text-2xl sm:text-3xl leading-tight">
                {productInfo.price}
              </div>
            </div>

            <button
              type="button"
              onClick={productInfo.onBuy}
              className="bg-[#12B6E0] hover:bg-[#0ea4ca] text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full whitespace-nowrap transition-colors"
            >
              {productInfo.ctaLabel ?? "Comprar ahora"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyPriceBannerUnified;

