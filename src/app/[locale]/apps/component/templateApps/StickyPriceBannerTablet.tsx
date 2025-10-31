// src/app/[locale]/apps/component/templateApps/StickyPriceBannerTablet.tsx
"use client";

import React from "react";

type StickyPriceBannerTabletProps = {
  visible: boolean;
  productInfo: {
    title: string;
    price: string;
    ctaLabel?: string;
    onBuy?: () => void;
    onChat?: () => void;
  };
};

const StickyPriceBannerTablet: React.FC<StickyPriceBannerTabletProps> = ({
  visible,
  productInfo,
}) => {
  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-4 right-4 left-4 z-40
        bg-white/95 backdrop-blur
        rounded-2xl shadow-xl
        px-4 py-4
        flex items-center justify-between gap-4
        transition-all duration-300
      `}
    >
      <div>
        <p className="text-[11px] uppercase text-gray-400 tracking-wide">
          Sigues viendo: 
        </p>
        <h4 className="text-base font-semibold text-gray-900">
          {productInfo.title}
        </h4>
        <p className="text-lg font-bold text-black mt-1">
          {productInfo.price}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={productInfo.onBuy}
          className="bg-[#0097d7] text-white text-sm px-4 py-2 rounded-lg"
        >
          {productInfo.ctaLabel ?? "Comprar"}
        </button>
        {productInfo.onChat && (
          <button
            onClick={productInfo.onChat}
            className="border border-gray-200 text-sm px-3 py-2 rounded-lg"
          >
            Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default StickyPriceBannerTablet;
