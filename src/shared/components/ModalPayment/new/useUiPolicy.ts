// src/shared/components/ModalPayment/new/useUiPolicy.ts
"use client";
import { usePurchaseKind } from "../PurchaseKindContext";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getUiPolicyForProduct } from "@/shared/utils/productUiPolicy";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/services";

export function useUiPolicy() {
  const kind = usePurchaseKind();
  const { params } = useModalPayment();
  const productid = (params as any)?.productid as string | undefined;
  const selectedOption = Number((params as any)?.selectedOption ?? NaN);

  const { data: product } = useQuery({
    queryKey: ["productForUiPolicy", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  if (!product) {
    // Defaults seguros mientras carga
    return {
      showTabs: kind === "SIM",
      allowedModes: ["new_user", "roning_code", "recharge"] as const,
      policyBase: null,
      routeItem: null,
    };
  }

  const merged = getUiPolicyForProduct({ product, kind, selectedOption });

  return {
    showTabs: merged.showTabs,
    allowedModes: merged.allowedModes,
    policyBase: merged,   
    routeItem: merged.routeItem,
  };
}
