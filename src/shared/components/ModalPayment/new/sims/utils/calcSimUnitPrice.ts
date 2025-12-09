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
