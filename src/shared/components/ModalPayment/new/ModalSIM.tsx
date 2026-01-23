// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById, getAllProducts } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";

import SimFormUnified from "./sims/SimFormUnified";
import type { FormType } from "./sims/types/simFormTypes";
import { resolveSimFormType } from "./sims/utils/resolveSimFormType";
import {
  type ModalProduct,
  type Variant,
  type SuccessPaymentData,
} from "./sims/types/modalSimTypes";
import { buildMinutesPlans } from "./sims/utils/buildMinutesPlans";
import { calcSimUnitPrice } from "./sims/utils/calcSimUnitPrice";
import { buildDataPlans } from "./sims/utils/buildDataPlans";

export default function ModalSIM() {
  const { params } = useModalPayment();
  const { productid, initialPrice, initialGb, initialRegion, provider: paramProvider, typeProduct: paramTypeProduct, variantId: paramVariantId } = (params || {}) as {
    productid?: string;
    initialPrice?: number;
    initialGb?: string;
    initialRegion?: string;
    provider?: string;
    typeProduct?: string;
    variantId?: number;
    variants?: any[];
  };
  const [hideSimField, setHideSimField] = React.useState(false);

  // Estados para el modal de éxito de pago
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successData, setSuccessData] = React.useState<SuccessPaymentData | null>(null);

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });
  console.log("[ModalSIM] product crudo =>", product);

  // Fetch regional products when initialRegion is provided (landing page scenario)
  // This gives us correct regional pricing for ALL GB variants
  const hasParamsVariants = (params as any)?.variants?.length > 0;
  const { data: regionalProducts } = useQuery({
    queryKey: ["regionalProducts", initialRegion],
    queryFn: () => getAllProducts(40, "es", { simRegion: initialRegion }),
    enabled: !!initialRegion && !hasParamsVariants && !!productid,
  });

  // Find the matching product from regional products to get regional variants
  const regionalProduct = React.useMemo(() => {
    if (!regionalProducts || !productid) return null;
    return regionalProducts.find((p: any) => String(p.id) === String(productid)) ?? null;
  }, [regionalProducts, productid]);

  console.log("[ModalSIM] regional pricing =>", { initialRegion, hasParamsVariants, regionalProduct });

  // Usar valores de params con prioridad sobre los de la API
  // Esto asegura que el botón "Compartir" use los mismos valores que "Más información"
  const effectiveProvider = paramProvider || (product as any)?.provider || (product as any)?.brand;
  const effectiveTypeProduct = paramTypeProduct || (product as any)?.type_product;

  console.log("[ModalSIM] effective values =>", {
    paramProvider,
    paramTypeProduct,
    apiProvider: (product as any)?.provider,
    apiTypeProduct: (product as any)?.type_product,
    effectiveProvider,
    effectiveTypeProduct
  });

  const formType: FormType = React.useMemo(
    () => resolveSimFormType(product),
    [product]
  );

  const isEsimDataCombo = formType === "encrypted_esimData";

  React.useEffect(() => {
    if (isEsimDataCombo) {
      setHideSimField(true);
    }
  }, [isEsimDataCombo]);

  const [selectedPlanId, setSelectedPlanId] = React.useState<
    string | number | null
  >(null);

  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  // Priority: 1) params.variants (home page), 2) regionalProduct.variants (landing with region), 3) product.variants (fallback)
  const variants: Variant[] = React.useMemo(() => {
    if ((params as any)?.variants?.length > 0) {
      console.log("[ModalSIM] Using params.variants (from home card)");
      return (params as any).variants as Variant[];
    }
    if (regionalProduct && (regionalProduct as any).variants?.length > 0) {
      console.log("[ModalSIM] Using regionalProduct.variants (regional pricing)");
      return (regionalProduct as any).variants as Variant[];
    }
    console.log("[ModalSIM] Using product.variants (fallback)");
    return (product?.variants ?? []) as Variant[];
  }, [params, regionalProduct, product]);

  // Ref to track if user has manually changed the plan (doesn't reset on re-renders)
  const userChangedPlanRef = React.useRef(false);

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(
    null
  );

  React.useEffect(() => {
    if (paramVariantId != null) {
      const match = variants.find((v) => v.id === paramVariantId) ?? null;
      if (match) {
        setSelectedVariant(match);
        return;
      }
    }
    setSelectedVariant(variants[0] ?? null);
  }, [product, variants, paramVariantId]);

  const minutesPlans = React.useMemo(
    () =>
      buildMinutesPlans({
        formType,
        variants,
        product,
      }),
    [formType, variants, product]
  );

  const dataPlans = React.useMemo(
    () =>
      buildDataPlans({
        formType,
        variants,
        product,
      }),
    [formType, variants, product]
  );

  const dataAmounts = React.useMemo(() => {
    const toNumber = (v: unknown): number => {
      const n = typeof v === "string" ? parseFloat(v) : Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    const amounts = (variants ?? [])
      .map((v: any) => toNumber(v.price ?? v.cost ?? v.regular_price ?? v.sale_price))
      .filter((n) => n > 0);
    return Array.from(new Set(amounts)).sort((a, b) => a - b);
  }, [variants]);

  React.useEffect(() => {
    if (formType !== "encrypted_minutes") return;
    // Si hay un initialPrice, buscar la variante que coincida con ese precio
    if (initialPrice != null && initialPrice > 0 && minutesPlans.length > 0) {
      const matchingPlan = minutesPlans.find((p) => p.value === initialPrice);
      if (matchingPlan) {
        console.log("[ModalSIM] Seleccionando plan que coincide con initialPrice:", {
          initialPrice,
          matchingPlan,
        });
        setSelectedPlanId(matchingPlan.id);
        return;
      }
    }

    // Si no hay match o no hay initialPrice, usar el primero
    console.log("[ModalSIM] useEffect minutesPlans → setSelectedPlanId", {
      minutesPlans,
      firstId: minutesPlans[0]?.id ?? null,
    });
    setSelectedPlanId(minutesPlans[0]?.id ?? null);
  }, [formType, minutesPlans, initialPrice]);

  React.useEffect(() => {
    if (formType !== "encrypted_esimData" && formType !== "encrypted_data") return;
    if (selectedPlanId != null) return;
    if (!dataAmounts.length) return;
    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    const isEsimPlusDatos =
      titleNorm.includes("esim + datos") || titleNorm.includes("esim + recarga datos");
    const base = 12;

    if (formType === "encrypted_esimData" && isEsimPlusDatos && initialPrice != null && initialPrice > 0) {
      const totals = dataAmounts;
      const rechargeCandidates = totals.map((t) => Math.max(t - base, 0));
      if (totals.includes(initialPrice)) {
        setSelectedPlanId(Math.max(initialPrice - base, 0));
        return;
      }
      if (rechargeCandidates.includes(initialPrice)) {
        setSelectedPlanId(initialPrice);
        return;
      }
      setSelectedPlanId(Math.max(initialPrice - base, 0));
      return;
    }

    if (formType === "encrypted_esimData" && isEsimPlusDatos) {
      setSelectedPlanId(Math.max(dataAmounts[0] - base, 0));
      return;
    }

    setSelectedPlanId(dataAmounts[0]);
  }, [formType, selectedPlanId, dataAmounts, product, initialPrice]);

  React.useEffect(() => {
    const titleNorm = String((product as any)?.name ?? "").toLowerCase();
    const isTimEsimData =
      formType === "tim_esim" &&
      titleNorm.includes("esim") &&
      (titleNorm.includes("datos") || titleNorm.includes("data"));
    const isTimDataLike = formType === "tim_data" || isTimEsimData;
    if (!isTimDataLike) return;
    if (!dataPlans.length) return;

    const syncVariant = (planId: string | number) => {
      setSelectedVariant(
        variants.find((v) => String(v.id) === String(planId)) ?? null
      );
    };

    // If user has manually changed the plan, respect their selection
    if (userChangedPlanRef.current && selectedPlanId != null) {
      syncVariant(selectedPlanId);
      return;
    }

    // Only skip if we already have the correct plan selected
    if (selectedPlanId != null && !initialGb) {
      syncVariant(selectedPlanId);
      return;
    }

    // If initialGb is set, always try to match it (for landing pages)
    if (selectedPlanId != null && initialGb) {
      const currentPlan = dataPlans.find((p) => String(p.id) === String(selectedPlanId));
      if (currentPlan?.label === initialGb) {
        // Already selected correctly
        syncVariant(selectedPlanId);
        return;
      }
      // Current selection doesn't match initialGb, need to re-select
    }

    let initPlanId: string | number | null = null;

    // Priority 1: Match by GB label from URL (most reliable for TIM data plans)
    if (initPlanId == null && initialGb && dataPlans.length > 0) {
      const matchingByLabel = dataPlans.find((p) => p.label === initialGb);
      if (matchingByLabel) {
        console.log("[ModalSIM] Matched plan by GB label:", { initialGb, matchingPlan: matchingByLabel });
        initPlanId = matchingByLabel.id;
      }
    }

    // Priority 2: Match by variantId from params
    if (initPlanId == null && paramVariantId != null) {
      const match = dataPlans.find((p) => String(p.id) === String(paramVariantId));
      if (match) initPlanId = match.id;
    }

    // Priority 3: Match by price (less reliable due to regional variations)
    if (initPlanId == null && initialPrice != null && initialPrice > 0) {
      const matching = dataPlans.find((p) => Number(p.value) === Number(initialPrice));
      if (matching) initPlanId = matching.id;
    }

    // Fallback: Use first plan
    if (initPlanId == null) initPlanId = dataPlans[0].id;

    setSelectedPlanId(initPlanId);
    syncVariant(initPlanId);
  }, [formType, dataPlans, variants, selectedPlanId, initialPrice, initialGb, product, paramVariantId]);

  // Track si el usuario ha cambiado manualmente el plan
  const [userChangedPlan, setUserChangedPlan] = React.useState(false);

  // Handler para cuando el usuario cambia el plan manualmente
  const handlePlanChange = React.useCallback((planId: string | number) => {
    setSelectedPlanId(planId);
    const nextVariant = variants.find((v) => String(v.id) === String(planId));
    if (nextVariant) setSelectedVariant(nextVariant);
    userChangedPlanRef.current = true; // Mark that user manually changed the plan
    setUserChangedPlan(true);
  }, [variants]);

  const unitPrice = React.useMemo(
    () => {
      const titleNorm = String((product as any)?.name ?? "").toLowerCase();
      const isTimEsimData =
        formType === "tim_esim" &&
        titleNorm.includes("esim") &&
        (titleNorm.includes("datos") || titleNorm.includes("data"));
      const isEncryptedEsimPlusData =
        formType === "encrypted_esimData" &&
        (titleNorm.includes("esim + datos") || titleNorm.includes("esim + recarga datos"));

      // Para productos de minutos, siempre usar el precio del plan seleccionado
      if (formType === "encrypted_minutes" && minutesPlans.length > 0) {
        const selectedPlan = minutesPlans.find((p) => p.id === selectedPlanId) ?? minutesPlans[0];
        console.log("[ModalSIM] Usando precio del plan seleccionado:", selectedPlan.value);
        return selectedPlan.value;
      }

      if (formType === "tim_data" || isTimEsimData) {
        const selected =
          dataPlans.find((p) => String(p.id) === String(selectedPlanId ?? "__none__")) ??
          dataPlans[0];

        // If user hasn't changed the plan and the selected plan matches the initial GB,
        // use initialPrice (which includes regional pricing from the card)
        if (!userChangedPlan && initialPrice != null && initialPrice > 0 && initialGb) {
          if (selected?.label === initialGb) {
            console.log("[ModalSIM] Using initialPrice for TIM data (matches initialGb):", { initialPrice, initialGb });
            return initialPrice;
          }
        }

        // Otherwise use the plan's backend price
        const value = Number(selected?.value ?? 0);
        if (value > 0) return value;
      }

      if (isEncryptedEsimPlusData) {
        return calcSimUnitPrice({
          formType,
          minutesPlans,
          selectedPlanId,
          variants,
          selectedVariant,
          product,
        });
      }

      // Si se pasó un precio inicial desde la card y el usuario no ha cambiado nada, usarlo
      if (initialPrice != null && initialPrice > 0 && !userChangedPlan) {
        console.log("[ModalSIM] Usando initialPrice del params:", initialPrice);
        return initialPrice;
      }

      return calcSimUnitPrice({
        formType,
        minutesPlans,
        selectedPlanId,
        variants,
        selectedVariant,
        product,
      });
    },
    [formType, minutesPlans, selectedPlanId, variants, selectedVariant, product, initialPrice, userChangedPlan]
  );

  const onApplyCoupon = () =>
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const handlePaymentSuccess = React.useCallback((data: SuccessPaymentData) => {
    setSuccessData(data);
    setShowSuccess(true);
  }, []);

  // Crear producto enriquecido con valores efectivos de provider/typeProduct
  // Esto asegura que PurchaseHeader use los mismos valores que CardProduct "Más información"
  const enrichedProduct = React.useMemo(() => {
    if (!product) return product;
    return {
      ...product,
      provider: effectiveProvider,
      type_product: effectiveTypeProduct,
    };
  }, [product, effectiveProvider, effectiveTypeProduct]);

  return (
    <PurchaseScaffold
      mode="sim"
      enableTabSwitch={false}
      showRechargeCTA={false}
      product={enrichedProduct}
      selectedVariantId={selectedVariant?.id ?? null}
      onChangeVariant={(id) =>
        setSelectedVariant(variants.find((v) => v.id === id) ?? null)
      }
      quantity={quantity}
      setQuantity={setQuantity}
      coupon={coupon}
      setCoupon={setCoupon}
      onApplyCoupon={onApplyCoupon}
      unitPrice={unitPrice}
      showLicense={false}
      shipping={
        formType === "encrypted_data" ||
          formType === "encrypted_minutes" ||
          formType === "encrypted_esim" ||
          formType === "encrypted_esimData" ||
          formType === "tim_esim" ||
          formType === "tim_data" ||
          formType === "tim_minutes"
          ? undefined
          : 75
      }
      minutesPlans={minutesPlans}
      dataPlans={dataPlans}
      selectedPlanId={selectedPlanId}
      onChangePlan={handlePlanChange}
      showEsimAddon={
        formType === "encrypted_data" ||
        (formType === "encrypted_minutes" && !isEsimDataCombo)
      }
      esimAddonPrice={7.5}
      esimAddonLabel="Lleva E-SIM por 7.50 USD"
      onChangeEsimAddon={(checked) => setHideSimField(checked)}
      sourceUrl={params.sourceUrl}
    >
      <SimFormUnified
        formType={formType}
        productid={productid}
        product={product}
        unitPrice={unitPrice}
        quantity={quantity}
        discount={discount}
        hideSimField={hideSimField || isEsimDataCombo}
        selectedPlanId={selectedPlanId}
        selectedVariantId={selectedVariant?.id ?? null}
        sourceUrl={params.sourceUrl}
        onSuccess={handlePaymentSuccess}
      />

      <PaymentSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        intent={successData?.intent ?? null}
        orderId={successData?.orderId}
      />
    </PurchaseScaffold>
  );
}
