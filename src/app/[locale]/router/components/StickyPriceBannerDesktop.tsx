// src/app/[locale]/apps/component/templateApps/StickyPriceBannerDesktop.tsx
"use client";

import React, { useState } from "react";

type StickyPriceBannerDesktopProps = {
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
};

const StickyPriceBannerDesktop: React.FC<StickyPriceBannerDesktopProps> = ({
  visible,
  productInfo,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!visible || dismissed) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2
        z-50
        w-[1058px] max-w-[95vw]
        h-[138px]
        bg-[#161616]
        border border-[#404040]/60
        rounded-[14px]
        px-6 py-6
        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        flex items-center justify-between gap-6
      `}
    >
      <div className="flex items-center gap-[22px] w-[247.8px] min-w-[247.8px]">
        {/* Icono */}
        <div className="w-[54px] h-[54px] rounded-[12px] bg-white/5 flex items-center justify-center overflow-hidden">
          <img
            src={productInfo.iconUrl}
            alt={productInfo.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-1">
          <p className="text-white text-[15px] font-semibold leading-tight">
            {productInfo.title}
          </p>
          <p className="text-[#A5A5A5] text-[13px] leading-tight">
            {productInfo.subtitle ?? "Comunicación cifrada y segura"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[34px] w-[357px] min-w-[357px] justify-end">
        <div className="flex flex-col leading-tight">
          <span className="text-[#A5A5A5] text-xs uppercase tracking-wide">
            Desde
          </span>
          <span className="text-white text-2xl font-bold">
            {productInfo.price}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={productInfo.onBuy}
            className="bg-white text-[#161616] text-sm font-semibold px-5 py-3 rounded-lg hover:bg-white/90 transition"
          >
            {productInfo.ctaLabel ?? "Comprar ahora"}
          </button>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-white/40 hover:text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
        aria-label="Cerrar banner"
      >
        ✕
      </button>
    </div>
  );
};

export default StickyPriceBannerDesktop;
