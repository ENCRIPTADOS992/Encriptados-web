"use client";

import React, { useState } from "react";
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

/**
 * StickyPriceBanner - Componente unificado y responsive
 * Mobile: barra fija en el bottom, layout compacto
 * Tablet/Desktop: banner flotante centrado con más detalles
 * Se oculta completamente cuando from=app_mobile
 */
const StickyPriceBannerUnified: React.FC<StickyPriceBannerProps> = ({
  visible,
  productInfo,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const { isFromAppMobile } = useAppMobile();

  // Ocultar completamente cuando viene de app móvil
  if (!visible || dismissed || isFromAppMobile) return null;

  return (
    <>
      {/* Mobile version - Fixed bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-neutral-900 p-4 shadow-2xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          {/* Icon + Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-lg bg-white flex-shrink-0 overflow-hidden">
              <img
                src={productInfo.iconUrl}
                alt={productInfo.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white font-semibold truncate">
                {productInfo.title}
              </p>
              <p className="text-base text-white font-bold">
                {productInfo.price}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={productInfo.onBuy}
            className="bg-cyan-500 text-white text-sm font-semibold px-5 py-3 rounded-full flex-shrink-0 hover:bg-cyan-600 transition-colors"
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Tablet/Desktop version - Floating banner */}
      <div className="hidden lg:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-neutral-900 border border-neutral-700/60 rounded-2xl p-6 shadow-2xl flex items-center justify-between gap-6">
          {/* Left: Icon + Info */}
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
              <img
                src={productInfo.iconUrl}
                alt={productInfo.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <p className="text-white text-base font-semibold">
                {productInfo.title}
              </p>
              <p className="text-neutral-400 text-sm">
                {productInfo.subtitle ?? "Comunicación cifrada y segura"}
              </p>
            </div>
          </div>

          {/* Right: Price + CTA */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <span className="text-neutral-400 text-xs uppercase tracking-wide">
                Desde
              </span>
              <p className="text-white text-2xl font-bold">
                {productInfo.price}
              </p>
            </div>

            <button
              onClick={productInfo.onBuy}
              className="bg-white text-neutral-900 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {productInfo.ctaLabel ?? "Comprar ahora"}
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 text-white/40 hover:text-white w-7 h-7 flex items-center justify-center text-sm transition-colors"
            aria-label="Cerrar banner"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default StickyPriceBannerUnified;
