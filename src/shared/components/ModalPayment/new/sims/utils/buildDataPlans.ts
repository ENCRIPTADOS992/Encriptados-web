"use client";

import type { FormType } from "../types/simFormTypes";
import type { ModalProduct, Variant } from "../types/modalSimTypes";

export type DataPlan = {
  id: string | number;
  label: string;
  value: number;
  gb?: number;
};

type Params = {
  formType: FormType;
  variants: Variant[];
  product: ModalProduct | undefined;
};

export function buildDataPlans({ formType, variants, product }: Params): DataPlan[] {
  if (formType !== "tim_data") return [];

  const parseNum = (v: unknown): number | undefined => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = parseInt(v, 10);
      return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
  };

  const parseGbFromText = (text: unknown): number | undefined => {
    const s = String(text ?? "");
    const m = s.match(/(\d+)\s*gb/i);
    if (!m) return undefined;
    const n = parseInt(m[1], 10);
    return Number.isFinite(n) ? n : undefined;
  };

  const deriveGb = (v: Variant): number | undefined => {
    const fromField =
      parseNum((v as any).gb) ??
      parseNum((v as any).gigas) ??
      parseNum((v as any).data_gb) ??
      parseNum((v as any).dataGb) ??
      parseNum((v as any).code);
    if (fromField && fromField > 0) return fromField;

    const fromLabel =
      parseGbFromText((v as any).label) ??
      parseGbFromText((v as any).name) ??
      parseGbFromText((v as any).sku);
    if (fromLabel && fromLabel > 0) return fromLabel;

    return undefined;
  };

  const toNumber = (v: unknown): number => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const fromVariants = (variants ?? [])
    .map((v, i) => {
      const rawPrice =
        (v as any).cost ??
        (v as any).price ??
        (v as any).regular_price ??
        (v as any).sale_price ??
        0;
      const value = toNumber(rawPrice);
      const gb = deriveGb(v);

      const label =
        typeof gb === "number" && gb > 0
          ? `${gb} GB`
          : String((v as any).label || (v as any).name || `${value} USD`);

      const plan: DataPlan = {
        id: (v as any).id ?? i,
        label,
        value,
        gb,
      };

      return plan;
    })
    .filter((p) => p.value > 0);

  if (fromVariants.length) return fromVariants;

  const cfg = (product as any)?.config_sim?.[0];
  const cfgItems = (cfg?.config ?? []) as any[];

  return cfgItems
    .map((c, i) => {
      const gb = parseNum(c.code);
      const value = toNumber(c.price);
      const label =
        typeof gb === "number" && gb > 0 ? `${gb} GB` : String(c.name || c.sku || `${value} USD`);
      return {
        id: c.sku || c.code || i,
        label,
        value,
        gb,
      } satisfies DataPlan;
    })
    .filter((p) => p.value > 0);
}

