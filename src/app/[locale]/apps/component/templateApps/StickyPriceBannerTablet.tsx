// src/app/[locale]/apps/component/templateApps/StickyPriceBannerTablet.tsx
"use client";

import React from "react";

type StickyPriceBannerTabletProps = {
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

const StickyPriceBannerTablet: React.FC<StickyPriceBannerTabletProps> = ({
  visible,
  productInfo,
}) => {
  if (!visible) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        z-50
        w-[704px] max-w-[calc(100%-40px)]
        bg-[#161616]
        border border-[#404040]/60
        rounded-[14px]
        p-6
        flex items-center justify-between
      "
    >
      {/* Icono + texto */}
      <div className="flex items-center gap-5">
        <div className="w-[44px] h-[44px] rounded-[7.8px] bg-white flex items-center justify-center overflow-hidden">
          <img
            src={productInfo.iconUrl}
            alt={productInfo.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <span className="text-[14px] font-semibold text-white leading-none">
            {productInfo.title}
          </span>
          <span className="text-[20px] font-bold text-white leading-none">
            {productInfo.price}
          </span>
        </div>
      </div>

      {/* Botón */}
      <button
        onClick={productInfo.onBuy}
        className="text-white text-[14px] font-semibold rounded-[50px]"
        style={{
          width: "144px",
          height: "54px",
          padding: "10px 34px",
          backgroundColor: "#10B4E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          whiteSpace: "nowrap",
        }}
      >
        {productInfo.ctaLabel ?? "Comprar ahora"}
      </button>
    </div>
  );
};

export default StickyPriceBannerTablet;
