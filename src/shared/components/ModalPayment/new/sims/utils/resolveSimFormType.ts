// src/shared/components/ModalPayment/new/sims/utils/resolveSimFormType.ts
"use client";

import type { FormType } from "../types/simFormTypes";

type ModalProduct = {
  id?: number | string;
  provider?: string;
  brand?: string;
  config_sim?: { type?: string; sku?: string; code?: string }[];
  shipping?: string;
  type_product?: string;
  name?: string;
  price?: number | string;
};
export function resolveSimFormType(product?: ModalProduct | null): FormType {
  if (!product) return "encrypted_generic";

  const provRaw = product.provider ?? product.brand ?? "";
  const cfgRaw = product.config_sim?.[0]?.type ?? "";
  const shipRaw = product.shipping ?? "";
  const physRaw = product.type_product ?? "";
  const nameRaw = product.name ?? "";

  const prov = provRaw.toLowerCase();
  const cfg = cfgRaw.toLowerCase();
  const ship = shipRaw.toLowerCase();
  const phys = physRaw.toLowerCase();
  const name = nameRaw.toLowerCase();

  const isPhysical = ship === "si" || phys === "fisico";
  const isEncrypted = prov.includes("encript");
  const isTim = prov.includes("tim");

  console.log("[resolveSimFormType] INPUTS", {
    id: product.id,
    provRaw,
    cfgRaw,
    shipRaw,
    physRaw,
    nameRaw,
    normalized: { prov, cfg, ship, phys, name },
    isPhysical,
    isEncrypted,
    isTim,
  });

  if (isEncrypted && name.includes("esim + recarga datos")) {
    console.log("[resolveSimFormType] override => encrypted_esimData por nombre");
    return "encrypted_esimData";
  }

  if (isEncrypted) {
    if (cfg === "esim") {
      return "encrypted_esim";
    }

    if (cfg === "data") {
      return "encrypted_data";
    }

    if (cfg === "minutes") {
      return "encrypted_minutes";
    }

    if (cfg.replace(/[^a-z]/g, "") === "esimdata") {
      return "encrypted_esimData";
    }

    if (isPhysical) {
      return "encrypted_physical";
    }

    return "encrypted_generic";
  }

  if (isTim && isPhysical) {
    console.log("[resolveSimFormType] TIM física => encrypted_physical");
    return "encrypted_physical";
  }

  return "encrypted_generic";
}
