// src/shared/components/ModalPayment/new/PurchaseTabs.tsx
"use client";

import React from "react";

export type Mode = "new_user" | "roning_code" | "recharge";

export default function PurchaseTabs({
  active = "roning_code",
  onSelect,
  enableSwitching = false,
}: {
  active?: Mode;
  onSelect?: (m: Mode) => void;
  enableSwitching?: boolean;
}) {
  const base =
    "h-11 rounded-[8px] px-[14px] text-[12px] leading-[12px] font-bold flex items-center justify-center text-center";
  const clsInactive = "bg-[#EBEBEB] text-[#3D3D3D] border border-transparent";
  const clsActive = "bg-white text-black border-2 border-[#3D3D3D]";

  const Btn = ({ label, mode }: { label: string; mode: Mode }) => {
    const isActive = active === mode;
    return (
      <button
        type="button"
        aria-pressed={isActive}
        className={[
          base,
          isActive ? clsActive : clsInactive,
          !enableSwitching && "cursor-not-allowed",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={enableSwitching ? () => onSelect?.(mode) : undefined}
        disabled={!enableSwitching}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Título de la sección (12px, bold, #010C0F al 80%, line-height 12px) */}
      <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80 mb-2">
        ¿Cómo quieres recibir tu licencia?
      </p>

      {/* Grid 3 columnas, gap 8px, alto 44px total */}
      <div className="w-full h-11 grid grid-cols-3 gap-2">
        <Btn label="Quiero mi usuario" mode="new_user" />
        <Btn label="Código RONING" mode="roning_code" />
        <Btn label="Recargar" mode="recharge" />
      </div>
    </div>
  );
}
