// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import { useCheckout } from "@/shared/hooks/useCheckout";

import SimForm from "./SimForm";
import type { FormType } from "./sims/types/simFormTypes";
import { resolveSimFormType } from "./sims/utils/resolveSimFormType";
import {
  type ModalProduct,
  type Variant,
  type Shipping,
  type StripeConfirmFn,
} from "./sims/types/modalSimTypes";
import { buildMinutesPlans } from "./sims/utils/buildMinutesPlans";
import { calcSimUnitPrice } from "./sims/utils/calcSimUnitPrice";
import { createSimSubmitHandler } from "./sims/services/createSimSubmitHandler";

export default function ModalSIM() {
  const { params } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { payUserId } = useCheckout();
  const [hideSimField, setHideSimField] = React.useState(false);

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });
  console.log("[ModalSIM] product crudo =>", product);

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

  const isPhysical = formType === "encrypted_physical";

  type StripeConfirmFn = (
    clientSecret: string,
    billing?: { name?: string; email?: string; postal_code?: string }
  ) => Promise<any>;

  const [stripeConfirm, setStripeConfirm] =
    React.useState<StripeConfirmFn | null>(null);

  const handleStripeConfirmReady = React.useCallback(
    (fn: StripeConfirmFn | null) => {
      console.log("[ModalSIM] handleStripeConfirmReady called", {
        incomingType: typeof fn,
        incomingFn: fn,
      });

      if (!fn) {
        setStripeConfirm(null);
        return;
      }

      setStripeConfirm(() => fn);
    },
    []
  );

  React.useEffect(() => {
    console.log("[ModalSIM] stripeConfirm updated", {
      type: typeof stripeConfirm,
      stripeConfirm,
    });
  }, [stripeConfirm]);

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
    console.log("[ModalSIM] useEffect minutesPlans → setSelectedPlanId", {
      minutesPlans,
      firstId: minutesPlans[0]?.id ?? null,
    });
    setSelectedPlanId(minutesPlans[0]?.id ?? null);
  }, [minutesPlans]);

  const unitPrice = React.useMemo(
    () =>
      calcSimUnitPrice({
        formType,
        minutesPlans,
        selectedPlanId,
        variants,
        selectedVariant,
        product,
      }),
    [formType, minutesPlans, selectedPlanId, variants, selectedVariant, product]
  );

  const onApplyCoupon = () =>
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const handleSubmit = React.useMemo(
    () =>
      createSimSubmitHandler({
        formType,
        isPhysical,
        unitPrice,
        quantity,
        discount,
        productid,
        product,
        selectedPlanId,
        stripeConfirm,
        payUserId,
      }),
    [
      formType,
      isPhysical,
      unitPrice,
      quantity,
      discount,
      productid,
      product,
      selectedPlanId,
      stripeConfirm,
      payUserId,
    ]
  );

  const finalUnitPrice = React.useMemo(() => {
    const base = unitPrice;
    if (formType === "encrypted_esimData") {
      return base + 7.5;
    }
    return base;
  }, [unitPrice, formType]);

  const baseAmount = Number(finalUnitPrice) * quantity - discount;

  return (
    <PurchaseScaffold
      mode="sim"
      enableTabSwitch={false}
      showRechargeCTA={false}
      product={product}
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
      onChangePlan={setSelectedPlanId}
      showEsimAddon={
        formType === "encrypted_data" ||
        (formType === "encrypted_minutes" && !isEsimDataCombo)
      }
      esimAddonPrice={7.5}
      esimAddonLabel="Lleva E-SIM por 7.50 USD"
      onChangeEsimAddon={(checked) => setHideSimField(checked)}
    >
      <SimForm
        onSubmit={handleSubmit}
        formType={formType}
        hideSimField={hideSimField || isEsimDataCombo}
        onStripeConfirmReady={handleStripeConfirmReady}
      />
    </PurchaseScaffold>
  );
}
