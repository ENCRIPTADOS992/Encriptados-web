// src/app/[locale]/apps/component/templateApps/StickyPriceBannerMobile.tsx
"use client";

import React from "react";

type StickyPriceBannerMobileProps = {
  visible: boolean;
  productInfo: {
    title: string;
    price: string;
    subtitle?: string;
    iconUrl: string;
    onBuy?: () => void;
  };
};

const StickyPriceBannerMobile: React.FC<StickyPriceBannerMobileProps> = ({
  visible,
  productInfo,
}) => {
  if (!visible) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        z-50
        h-[120px]
        bg-[#101010]
        px-4 py-3
        shadow-[0_14px_54px_rgba(0,0,0,0.8)]
      "
    >
      <div className="flex items-center justify-between gap-3 h-full">
        {/* Icono + texto */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-[44px] h-[44px] rounded-[7.8px] bg-white flex items-center justify-center overflow-hidden">
            <img
              src={productInfo.iconUrl}
              alt={productInfo.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-[11px] text-white font-semibold leading-tight truncate">
              {productInfo.title}
            </p>
            <p className="text-[14px] text-white font-bold leading-tight truncate">
              {productInfo.price}
            </p>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={productInfo.onBuy}
          className="
            bg-[#059CCB] text-white
            text-[12px] font-semibold
            w-[91px] h-[48px]
            rounded-[50px]
            flex items-center justify-center
            px-4
          "
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default StickyPriceBannerMobile;
