// src/app/[locale]/apps/component/templateApps/StickyPriceBannerMobile.tsx
"use client";

import React from "react";

type StickyPriceBannerMobileProps = {
  visible: boolean;
  productInfo: {
    title: string;
    price: string;
    ctaLabel?: string;
    onBuy?: () => void;
    onChat?: () => void;
  };
};

const StickyPriceBannerMobile: React.FC<StickyPriceBannerMobileProps> = ({
  visible,
  productInfo,
}) => {
  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-[#0f1012] text-white
        px-4 py-3
        flex items-center justify-between gap-3
        transition-all duration-300
      `}
    >
      <div className="flex-1">
        <p className="text-[11px] text-gray-300 leading-none mb-1">
          {productInfo.title}
        </p>
        <p className="text-lg font-semibold leading-none">
          {productInfo.price}
        </p>
      </div>
      <div className="flex gap-2">
        {productInfo.onChat && (
          <button
            onClick={productInfo.onChat}
            className="bg-white/10 text-xs px-3 py-2 rounded-lg"
          >
            Chat
          </button>
        )}
        <button
          onClick={productInfo.onBuy}
          className="bg-[#00a9ff] text-xs px-4 py-2 rounded-lg font-semibold"
        >
          {productInfo.ctaLabel ?? "Comprar"}
        </button>
      </div>
    </div>
  );
};

export default StickyPriceBannerMobile;
