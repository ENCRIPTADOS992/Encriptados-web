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
  /** Cuando hay cupón activo, ignorar sale_price y usar price regular */
  skipSale?: boolean;
};

export function calcSimUnitPrice({
  formType,
  minutesPlans,
  selectedPlanId,
  variants,
  selectedVariant,
  product,
  skipSale = false,
}: Params): number {
  const toNumber = (v: unknown): number => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const onSale = !skipSale && (product?.on_sale === true || (product as any)?.on_sale === "true");

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
    const amounts = (variants ?? [])
      .map((v) => {
        const saleValue = onSale ? (v as any).sale_price : undefined;
        return toNumber(saleValue ?? (v as any).price ?? (v as any).cost ?? (v as any).regular_price);
      })
      .filter((n) => n > 0);

    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    const isEsimRecargaDatos =
      titleNorm.includes("esim + datos") || titleNorm.includes("esim + recarga datos");
    const fixedBase = 12;

    if (isEsimRecargaDatos) {
      const defaultTotal = amounts[0] ?? 0;
      const defaultRecharge = Math.max(defaultTotal - fixedBase, 0);
      const selected = selectedPlanId != null ? toNumber(selectedPlanId) : defaultRecharge;
      const unitPrice = amounts.includes(selected)
        ? selected
        : Math.max(fixedBase + selected, 0);

      console.log("[calcSimUnitPrice] ESIM+RECARGA_DATOS", {
        formType,
        selectedPlanId,
        fixedBase,
        defaultTotal,
        defaultRecharge,
        unitPrice,
      });

      return unitPrice;
    }

    const defaultAmount = amounts[0] ?? 0;
    const selectedAmount = selectedPlanId != null ? toNumber(selectedPlanId) : defaultAmount;

    const productSalePrice = onSale ? toNumber((product as any)?.sale_price) : undefined;
    const productPrice = productSalePrice ?? toNumber(product?.price);

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
    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    const isTimProvider =
      String((product as any)?.provider ?? (product as any)?.brand ?? "")
        .toLowerCase()
        .includes("tim");
    const isTimEsimData =
      isTimProvider &&
      titleNorm.includes("esim") &&
      (titleNorm.includes("datos") || titleNorm.includes("data"));

    // If onSale is true, we consider sale_price first.
    let raw = 0;
    if (isTimEsimData) {
      const saleVal = onSale ? (v as any).sale_price : undefined;
      raw = saleVal ?? (v as any).regular_price ?? (v as any).price ?? (v as any).cost ?? product?.price ?? 0;
    } else {
      const saleVal = onSale ? (v as any).sale_price : undefined;
      raw = saleVal ?? v.price ?? v.cost ?? product?.price ?? 0;
    }

    const valueNumber = toNumber(raw);

    console.log("[calcSimUnitPrice] VARIANT", {
      formType,
      selectedVariant,
      fallbackVariant: variants[0],
      productPrice: product?.price,
      unitPrice: valueNumber,
      onSale
    });

    return valueNumber;
  }

  const sp = onSale ? parseFloat(String((product as any)?.sale_price ?? "0")) : NaN;
  const valueNumber = (!isNaN(sp) && sp > 0) ? sp : Number(product?.price ?? 0);

  console.log("[calcSimUnitPrice] PRODUCT PRICE", {
    formType,
    productPrice: product?.price,
    salePrice: (product as any)?.sale_price,
    onSale,
    unitPrice: valueNumber,
  });

  return valueNumber;
}
