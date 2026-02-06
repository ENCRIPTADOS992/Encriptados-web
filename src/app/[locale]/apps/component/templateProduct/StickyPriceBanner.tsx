"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import { Tag } from "lucide-react";

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
    onSale?: boolean;
    regularPrice?: string;
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

  // Scroll direction state
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // Detectar orientación landscape en móvil y dirección de scroll
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscapeMobile(isMobile && isLandscape);
    };

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  // Reset dismissed state when visibility changes to true
  useEffect(() => {
    if (visible) {
      setIsDismissed(false);
    }
  }, [visible]);

  // Detectar clic fuera del banner para cerrarlo (SOLO DESKTOP)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Solo permitir cerrar con click afuera si NO es móvil (pantallas grandes)
      if (window.innerWidth < 1024) return;

      if (bannerRef.current && !bannerRef.current.contains(event.target as Node)) {
        setIsDismissed(true);
      }
    };

    if (visible && !isDismissed) {
      document.addEventListener("mousedown", handleClickOutside);
      // Removed touchstart listener to avoid accidental closing on mobile/tablet via touch
      // document.addEventListener("touchstart", handleClickOutside); 
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [visible, isDismissed]);

  // Lógica de visibilidad combinada
  // 1. Debe ser visible según el padre (scrolled past trigger)
  // 2. No debe ser landscape mobile
  // 3. No debe haber sido dismissed (cerrado manualmente en desktop)
  // 4. Lógica móvil: Si es móvil/tablet, solo mostrar si se hace scroll hacia abajo (hide on scroll up)

  const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Si no es visible desde el padre, ocultar siempre
  if (!visible) return null;

  // Si es landscape en móvil, ocultar
  if (isLandscapeMobile) return null;

  // Si fue cerrado (desktop), ocultar
  if (isDismissed) return null;

  // Lógica específica móvil: Ocultar si hace scroll hacia arriba
  // Si hace scroll hacia abajo, se muestra (siempre que 'visible' sea true)
  if (isMobileOrTablet && scrollDirection === 'up') return null;

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
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-white font-bold text-2xl sm:text-3xl leading-tight">
                  {productInfo.price}
                </div>
                {productInfo.onSale && productInfo.regularPrice && (
                  <span className="inline-flex items-center gap-1 bg-white/15 rounded-full px-2 py-0.5">
                    <Tag className="w-3.5 h-3.5 text-white" />
                    <span className="text-sm text-white">
                      Antes <span className="line-through">{productInfo.regularPrice}</span>
                    </span>
                  </span>
                )}
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

