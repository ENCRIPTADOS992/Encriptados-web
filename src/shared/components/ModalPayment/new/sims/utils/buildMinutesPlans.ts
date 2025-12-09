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
    variants,
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
        const cost = Number(v.cost ?? v.price ?? 0);

        const plan: MinutesPlan = {
          id: v.id ?? i,
          label:
            typeof minutes === "number" && minutes > 0
              ? `${minutes} Min`
              : v.label || v.name || "Plan",
          value: !Number.isNaN(cost) ? cost : 0,
        };

        console.log("[buildMinutesPlans] fromVariants item", {
          rawVariant: v,
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
      const price = Number(product?.price ?? 0);

      const plan: MinutesPlan = {
        id: c.sku || c.code || i,
        label: numMinutes > 0 ? `${numMinutes} Min` : c.sku || "Plan",
        value: price,
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
