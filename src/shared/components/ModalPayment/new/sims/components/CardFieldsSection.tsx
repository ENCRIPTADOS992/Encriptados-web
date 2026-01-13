// src/shared/components/ModalPayment/new/sims/components/CardFieldsSection.tsx
"use client";

import React from "react";
import type { UseFormRegister } from "react-hook-form";

import type { SimFormValues } from "../types/simFormTypes";
import { CARD_SPLIT_WRAPPER, getFieldWrapperClassName } from "../layout/simFormLayout";

type Props = {
  method: SimFormValues["method"];
  register: UseFormRegister<SimFormValues>;
  mountError?: string | null;
  stripeStatus?: "idle" | "loading" | "ready" | "error";
};

export function CardFieldsSection({ method, register, mountError, stripeStatus }: Props) {
  if (method !== "card") return null;

  const isLoading = stripeStatus === "loading" || stripeStatus === "idle";

  return (
    <div className="space-y-1.5">
      {/* Titular */}
      <div className={getFieldWrapperClassName(false)}>
        <input
          {...register("cardName")}
          placeholder="Titular de la tarjeta"
          className="w-full bg-transparent outline-none text-[14px]"
          autoComplete="cc-name"
        />
      </div>

      {/* Split Elements (número) */}
      <div className={CARD_SPLIT_WRAPPER}>
        <div id="card-number-el" className="w-full min-h-[20px]" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#EBEBEB] rounded-[8px]">
            <span className="text-[12px] text-gray-500 animate-pulse">Cargando...</span>
          </div>
        )}
      </div>

      {/* Exp / CVC */}
      <div className="grid grid-cols-2 gap-[8px]">
        <div className={CARD_SPLIT_WRAPPER}>
          <div id="card-expiry-el" className="w-full min-h-[20px]" />
        </div>
        <div className={CARD_SPLIT_WRAPPER}>
          <div id="card-cvc-el" className="w-full min-h-[20px]" />
        </div>
      </div>

      {/* Código postal */}
      <div className={CARD_SPLIT_WRAPPER}>
        <input
          {...register("cardPostal")}
          placeholder="Código postal"
          className="w-full bg-transparent outline-none text-[14px]"
          autoComplete="postal-code"
        />
      </div>

      {mountError && (
        <p className="text-red-600 text-sm">{mountError}</p>
      )}
      
      {isLoading && !mountError && (
        <p className="text-[12px] text-gray-500">Inicializando formulario de pago...</p>
      )}
    </div>
  );
}
