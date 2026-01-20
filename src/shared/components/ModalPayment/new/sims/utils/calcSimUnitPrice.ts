// src/shared/components/ModalPayment/new/sims/utils/calcSimUnitPrice.ts
"use client";

import type { FormType } from "../types/simFormTypes";
import type { ModalProduct, Variant } from "../types/modalSimTypes";
import type { MinutesPlan } from "./buildMinutesPlans";

type Params = {
  formType: FormType;
  minutesPlans: MinutesPlan[];
  selectedPlanId: string | number | null;
  variants: Variant[];
  selectedVariant: Variant | null;
  product: ModalProduct | undefined;
};

export function calcSimUnitPrice({
  formType,
  minutesPlans,
  selectedPlanId,
  variants,
  selectedVariant,
  product,
}: Params): number {
  if (formType === "encrypted_minutes" && minutesPlans.length) {
    const selected =
      minutesPlans.find((p) => p.id === selectedPlanId) ??
      minutesPlans[0];

    const valueNumber = Number(selected.value || 0);

    console.log("[calcSimUnitPrice] MINUTES", {
      formType,
      selectedPlanId,
      selected,
      minutesPlans,
      unitPrice: valueNumber,
    });

    return valueNumber;
  }

  if (formType === "encrypted_data" && selectedPlanId != null) {
    const valueNumber = Number(selectedPlanId) || 0;

    console.log("[calcSimUnitPrice] DATA", {
      formType,
      selectedPlanId,
      unitPrice: valueNumber,
    });

    return valueNumber;
  }

  if (formType === "encrypted_esimData") {
    const toNumber = (v: unknown): number => {
      const n = typeof v === "string" ? parseFloat(v) : Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const amounts = (variants ?? [])
      .map((v) => toNumber((v as any).price ?? (v as any).cost ?? (v as any).regular_price ?? (v as any).sale_price))
      .filter((n) => n > 0);

    const defaultAmount = amounts[0] ?? 0;
    const selectedAmount = selectedPlanId != null ? toNumber(selectedPlanId) : defaultAmount;
    const productPrice = toNumber(product?.price);

    let base = productPrice > 0 && defaultAmount > 0 ? productPrice - defaultAmount : 0;
    if (!Number.isFinite(base) || base < 0 || base > 100) base = 7.5;

    const unitPrice = Math.max(base + (selectedAmount || 0), 0);

    console.log("[calcSimUnitPrice] ESIM+DATA", {
      formType,
      selectedPlanId,
      defaultAmount,
      selectedAmount,
      productPrice,
      base,
      unitPrice,
    });

    return unitPrice;
  }

  if (variants.length) {
    const v = selectedVariant ?? variants[0];
    const valueNumber = Number(
      v.price ?? v.cost ?? product?.price ?? 0
    );

    console.log("[calcSimUnitPrice] VARIANT", {
      formType,
      selectedVariant,
      fallbackVariant: variants[0],
      productPrice: product?.price,
      unitPrice: valueNumber,
    });

    return valueNumber;
  }

  const valueNumber = Number(product?.price ?? 0);

  console.log("[calcSimUnitPrice] PRODUCT PRICE", {
    formType,
    productPrice: product?.price,
    unitPrice: valueNumber,
  });

  return valueNumber;
}
