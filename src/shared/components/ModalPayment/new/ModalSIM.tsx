// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
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

export default function ModalSIM() {
  const { params } = useModalPayment();
  const { productid, initialPrice, provider: paramProvider, typeProduct: paramTypeProduct } = (params || {}) as { 
    productid?: string; 
    initialPrice?: number;
    provider?: string;
    typeProduct?: string;
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

  const variants: Variant[] = (product?.variants ?? []) as Variant[];

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(
    null
  );

  React.useEffect(() => {
    setSelectedVariant(variants[0] ?? null);
  }, [product, variants]);

  const minutesPlans = React.useMemo(
    () =>
      buildMinutesPlans({
        formType,
        variants,
        product,
      }),
    [formType, variants, product]
  );

  React.useEffect(() => {
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
  }, [minutesPlans, initialPrice]);

  // Track si el usuario ha cambiado manualmente el plan
  const [userChangedPlan, setUserChangedPlan] = React.useState(false);

  // Handler para cuando el usuario cambia el plan manualmente
  const handlePlanChange = React.useCallback((planId: string | number) => {
    setSelectedPlanId(planId);
    setUserChangedPlan(true);
  }, []);

  const unitPrice = React.useMemo(
    () => {
      // Para productos de minutos, siempre usar el precio del plan seleccionado
      if (formType === "encrypted_minutes" && minutesPlans.length > 0) {
        const selectedPlan = minutesPlans.find((p) => p.id === selectedPlanId) ?? minutesPlans[0];
        console.log("[ModalSIM] Usando precio del plan seleccionado:", selectedPlan.value);
        return selectedPlan.value;
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
        formType === "encrypted_esimData"
          ? undefined
          : 75
      }
      minutesPlans={minutesPlans}
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
