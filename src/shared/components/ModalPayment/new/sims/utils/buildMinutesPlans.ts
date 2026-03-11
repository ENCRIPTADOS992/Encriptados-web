// src/shared/components/ModalPayment/new/sims/utils/buildMinutesPlans.ts
"use client";

import type { FormType } from "../types/simFormTypes";
import type { ModalProduct, Variant } from "../types/modalSimTypes";
import { resolveVariantPrice, isProductOnSale } from "./resolveVariantPrice";

export type MinutesPlan = {
  id: string | number;
  label: string;
  value: number;
  minutes?: number;
};

type Params = {
  formType: FormType;
  variants: Variant[];
  product: ModalProduct | undefined;
  /** Si true, ignorar sale_price y usar precio regular */
  skipSale?: boolean;
  /** Costo base de la eSIM (para derivar monto de recarga de minutos) */
  esimBasePrice?: number;
};

export function buildMinutesPlans({
  formType,
  variants,
  product,
  skipSale = false,
  esimBasePrice = 0,
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

  const parseNum = (v: unknown): number | undefined => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
  };

  const parseMinutesFromText = (text: unknown): number | undefined => {
    const s = String(text ?? "");
    const m = s.match(/(\d+)\s*(min(?:uto)?s?|minutes?)/i);
    if (!m) return undefined;
    const n = parseInt(m[1], 10);
    return Number.isFinite(n) ? n : undefined;
  };

  const deriveMinutes = (v: Variant, cost: number): number | undefined => {
    const fromField = parseNum((v as any).minutes);
    if (fromField && fromField > 0) return fromField;

    // Buscar en atributos de la variante (ej: {name: "minutos", option: "25"})
    const attrs = (v as any).attributes;
    if (Array.isArray(attrs)) {
      const minuteAttr = attrs.find((a: any) =>
        /^minutos?$/i.test(a.name || "")
      );
      if (minuteAttr) {
        const fromAttr = parseNum(minuteAttr.option);
        if (fromAttr && fromAttr > 0) return fromAttr;
      }
    }

    const fromLabel = parseMinutesFromText((v as any).label) ?? parseMinutesFromText((v as any).name);
    if (fromLabel && fromLabel > 0) return fromLabel;

    const fromTags =
      parseMinutesFromText((v as any).tags) ??
      parseMinutesFromText((v as any).tag) ??
      parseMinutesFromText((v as any).tag_name);
    if (fromTags && fromTags > 0) return fromTags;

    return undefined;
  };

  const fromVariants =
    (variants ?? [])
      .map((v, i) => {
        const onSale = !skipSale && isProductOnSale(product);
        const cost = resolveVariantPrice(v, onSale);
        const minutes = deriveMinutes(v, cost);

        // Crear label: priorizar minutes derivados > monto recarga (precio - eSIM) > label > name > precio
        let label = "Plan";
        if (typeof minutes === "number" && minutes > 0) {
          label = `${minutes} Minutos`;
        } else {
          // Mostrar monto de recarga de minutos (precio total - costo eSIM)
          const rechargeAmount = Math.max(cost - esimBasePrice, 0);
          if (rechargeAmount > 0) {
            label = `${rechargeAmount} USD`;
          } else if (v.label && String(v.label).trim()) {
            label = String(v.label);
          } else if (v.name && String(v.name).trim()) {
            label = String(v.name);
          } else if (!Number.isNaN(cost) && cost > 0) {
            label = `${cost} USD`;
          }
        }

        const plan: MinutesPlan = {
          id: v.id ?? i,
          label,
          value: !Number.isNaN(cost) ? cost : 0,
          minutes,
        };

        console.log("[buildMinutesPlans] fromVariants item", {
          rawVariant: v,
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
      if ((c as any).name && String((c as any).name).trim()) {
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
        minutes: numMinutes > 0 ? numMinutes : undefined,
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
