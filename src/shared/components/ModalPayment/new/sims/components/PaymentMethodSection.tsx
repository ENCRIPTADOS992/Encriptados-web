// src/shared/components/ModalPayment/new/sims/components/PaymentMethodSection.tsx
"use client";

import React from "react";
import type { UseFormSetValue } from "react-hook-form";

import type { SimFormValues } from "../types/simFormTypes";
import { PAYMENT_METHOD_GRID } from "../layout/simFormLayout";

type Props = {
  method: SimFormValues["method"];
  setValue: UseFormSetValue<SimFormValues>;
};

export function PaymentMethodSection({ method, setValue }: Props) {
  return (
    <div className="space-y-1.5">  
      <p className="text-[12px] leading-[12px] font-bold text-[#010C0F]/80">
        Método de pago
      </p>

      <div className={PAYMENT_METHOD_GRID}>
        {/* Tarjeta */}
        <button
          type="button"
          aria-pressed={method === "card"}
          onClick={() =>
            setValue("method", "card", { shouldValidate: true })
          }
          className={[
            "w-full border flex flex-row items-center justify-center gap-2",
            "h-[46px] rounded-[6px] px-[24px] py-[4px]",
            "sm:h-[76px] sm:rounded-[8px] sm:px-3 sm:py-2 ipad:h-[60px] ipad:px-4",
            method === "card"
              ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
              : "bg-[#EBEBEB] border border-transparent",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1",
          ].join(" ")}
        >
          <img
            src="/images/home/add_card.webp"
            alt=""
            className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
          />
          <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
            Tarjeta de crédito
          </span>
        </button>

        {/* Cripto */}
        <button
          type="button"
          aria-pressed={method === "crypto"}
          onClick={() =>
            setValue("method", "crypto", { shouldValidate: true })
          }
          className={[
            "w-full border flex flex-row items-center justify-center gap-2",
            "h-[46px] rounded-[6px] px-[24px] py-[4px]",
            "sm:h-[76px] sm:rounded-[8px] sm:px-3 sm:py-2 ipad:h-[60px] ipad:px-4",
            method === "crypto"
              ? "bg-[#FAFAFA] border-2 border-[#3D3D3D]"
              : "bg-[#EBEBEB] border border-transparent",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1",
          ].join(" ")}
        >
          <img
            src="/images/home/send_money.webp"
            alt=""
            className="w-5 h-5 sm:w-5 sm:h-5 ipad:w-6 ipad:h-6"
          />
          <span className="text-[12px] sm:text-[13px] ipad:text-[14px] font-bold text-[#3D3D3D] leading-tight text-center sm:text-left">
            Criptomonedas
          </span>
        </button>
      </div>
    </div>
  );
}
