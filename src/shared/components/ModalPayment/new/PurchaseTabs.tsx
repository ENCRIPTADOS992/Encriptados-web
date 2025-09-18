// src/shared/components/ModalPayment/new/PurchaseTabs.tsx
"use client";

import React from "react";

import { useUiPolicy } from "./useUiPolicy";

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
  const { showTabs, allowedModes } = useUiPolicy();

  const visibleModes: Mode[] = (allowedModes ?? []).filter((m): m is Mode =>
    ["new_user", "roning_code", "recharge"].includes(m as string)
  ) as Mode[];

  if (!showTabs || visibleModes.length <= 1) return null;

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
        className={[base, isActive ? clsActive : clsInactive, !enableSwitching && "cursor-not-allowed"]
          .filter(Boolean)
          .join(" ")}
        onClick={enableSwitching ? () => onSelect?.(mode) : undefined}
        disabled={!enableSwitching}
      >
        {label}
      </button>
    );
  };

  // Mapeo nombre → label
  const labels: Record<Mode, string> = {
    new_user: "Quiero mi usuario",
    roning_code: "Código RONING",
    recharge: "Recargar",
  };

  return (
    <div className="w-full">
      <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80 mb-2">
        ¿Cómo quieres recibir tu licencia?
      </p>
      <div className="w-full h-11 grid grid-cols-3 gap-2">
        {visibleModes.map((m) => (
          <Btn key={m} label={labels[m]} mode={m} />
        ))}
      </div>
    </div>
  );
}