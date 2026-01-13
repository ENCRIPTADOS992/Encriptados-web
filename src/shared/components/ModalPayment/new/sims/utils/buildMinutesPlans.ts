// src/shared/components/ModalPayment/new/sims/utils/buildMinutesPlans.ts
"use client";

import type { FormType } from "../types/simFormTypes";
import type { ModalProduct, Variant } from "../types/modalSimTypes";

export type MinutesPlan = {
  id: string | number;
  label: string;
  value: number;
};

type Params = {
  formType: FormType;
  variants: Variant[];
  product: ModalProduct | undefined;
};

export function buildMinutesPlans({
  formType,
  variants,
  product,
}: Params): MinutesPlan[] {
  console.log("[buildMinutesPlans] start", {
    formType,
    variantsLength: variants?.length ?? 0,
    variants: JSON.stringify(variants, null, 2),
    configSim: product?.config_sim,
  });

  if (formType !== "encrypted_minutes") {
    console.log("[buildMinutesPlans] formType NO es encrypted_minutes");
    return [];
  }

  const fromVariants =
    (variants ?? [])
      .map((v, i) => {
        const minutes =
          typeof v.minutes === "number" ? v.minutes : undefined;
        
        // Intentar obtener el precio de múltiples fuentes
        const rawPrice = v.cost ?? v.price ?? (v as any).regular_price ?? (v as any).sale_price ?? 0;
        const cost = typeof rawPrice === "string" ? parseFloat(rawPrice) : Number(rawPrice);

        // Crear label: priorizar minutes > label > name > precio formateado
        let label = "Plan";
        if (typeof minutes === "number" && minutes > 0) {
          label = `${minutes} Min`;
        } else if (v.label && String(v.label).trim()) {
          label = String(v.label);
        } else if (v.name && String(v.name).trim()) {
          label = String(v.name);
        } else if (!Number.isNaN(cost) && cost > 0) {
          // Si no hay label, usar el precio como label
          label = `${cost} USD`;
        }

        const plan: MinutesPlan = {
          id: v.id ?? i,
          label,
          value: !Number.isNaN(cost) ? cost : 0,
        };

        console.log("[buildMinutesPlans] fromVariants item", {
          rawVariant: v,
          rawPrice,
          cost,
          plan,
        });

        return plan;
      })
      .filter((p) => p.value > 0);

  console.log("[buildMinutesPlans] fromVariants result", fromVariants);

  if (fromVariants.length > 0) {
    console.log(
      "[buildMinutesPlans] usando fromVariants (NO config_sim)"
    );
    return fromVariants;
  }

  const items = product?.config_sim ?? [];
  console.log("[buildMinutesPlans] from config_sim fallback", items);

  const fromConfigSim: MinutesPlan[] = items
    .map((c, i) => {
      const numMinutes = c.code ? Number(c.code) : 0;
      // Intentar obtener precio del item de config o del producto
      const itemPrice = (c as any).price ?? (c as any).cost ?? product?.price ?? 0;
      const price = typeof itemPrice === "string" ? parseFloat(itemPrice) : Number(itemPrice);

      // Generar label: priorizar minutos > nombre/sku > precio
      let label = "Plan";
      if (numMinutes > 0) {
        label = `${numMinutes} Min`;
      } else if ((c as any).name && String((c as any).name).trim()) {
        label = String((c as any).name);
      } else if (c.sku && String(c.sku).trim()) {
        label = String(c.sku);
      } else if (!Number.isNaN(price) && price > 0) {
        label = `${price} USD`;
      }

      const plan: MinutesPlan = {
        id: c.sku || c.code || i,
        label,
        value: !Number.isNaN(price) ? price : 0,
      };

      console.log("[buildMinutesPlans] fromConfigSim item", {
        rawConfig: c,
        plan,
      });

      return plan;
    })
    .filter((p) => p.value > 0);

  console.log(
    "[buildMinutesPlans] fromConfigSim result (fallback)",
    fromConfigSim
  );

  return fromConfigSim;
}
