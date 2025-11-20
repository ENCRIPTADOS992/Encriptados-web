// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import { useCheckout } from "@/shared/hooks/useCheckout";
import {
  tottoliCheckout,
  type TottoliCheckoutPayload,
  type TottoliMethod,
} from "@/features/products/payments/tottoliCheckout";
import type { Provider as PayProvider } from "@/services/checkout";

import SimForm from "./SimForm";

type ProductFromAPI = Awaited<ReturnType<typeof getProductById>>;

type Variant = {
  id: number;
  licensetime: number;
  price: number;
  sku?: string;
  image?: string;
};

type ConfigSim = {
  type: string;
  sku?: string;
  code?: string;
};

type ModalProduct = ProductFromAPI & {
  variants?: Variant[];
  images?: { src: string }[];
  price?: number | string;
  name?: string;
  licensetime?: number | string;
  config_sim?: ConfigSim[];
  provider?: string;
  brand?: string;
  shipping?: string;
  type_product?: string;
  category?: { id?: number | string; name?: string };
};

type FormType =
  | "encrypted_physical"
  | "encrypted_esim"
  | "encrypted_data"
  | "encrypted_minutes"
  | "encrypted_generic";

type Shipping = {
  email: string;
  telegram?: string;
  fullName: string;
  address: string;
  country: string;
  postalCode: string;
  phone: string;
  method: "card" | "crypto";
  simNumber?: string;
};

export default function ModalSIM() {
  const { params } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { payUserId } = useCheckout();

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });

  const formType: FormType = React.useMemo(() => {
    const prov = (product?.provider || product?.brand || "").toLowerCase();
    const cfg = (product?.config_sim?.[0]?.type || "").toLowerCase();
    const ship = (product?.shipping || "").toLowerCase();
    const phys = (product?.type_product || "").toLowerCase();

    if (!prov.includes("encript")) return "encrypted_generic";
    if (cfg === "esim") return "encrypted_esim";
    if (cfg === "data") return "encrypted_data";
    if (cfg === "minutes") return "encrypted_minutes";
    if (ship === "si" || phys === "fisico") return "encrypted_physical";
    return "encrypted_generic";
  }, [product]);

  const isPhysical = formType === "encrypted_physical";

  const minutesPlans = React.useMemo(() => {
    if (formType !== "encrypted_minutes") return [];
    const items = product?.config_sim ?? [];
    return items.map((c, i) => ({
      id: c.sku || c.code || i,
      label: c.code ? `${c.code} Minutos` : c.sku || "Plan",
      value: Number(c.code) || 0,
    }));
  }, [formType, product]);

  const [selectedPlanId, setSelectedPlanId] =
    React.useState<string | number | null>(null);

  React.useEffect(() => {
    setSelectedPlanId(minutesPlans[0]?.id ?? null);
  }, [minutesPlans]);

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(
    null
  );
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];

  React.useEffect(() => {
    setSelectedVariant(variants[0] ?? null);
  }, [product]);

  const unitPrice =
    (variants.length
      ? selectedVariant?.price ?? variants[0]?.price
      : Number(product?.price)) || 0;

  const onApplyCoupon = () =>
    setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

  const handleSubmit = async (data: Shipping) => {
    console.log("[ModalSIM] submit 👉", {
    formType,
    data,
    unitPrice,
    quantity,
    discount,
    isPhysical,
    productid,
  });
  const shippingFee = isPhysical ? 75 : 0;
  const baseAmount = Number(unitPrice) * quantity - discount;
  const amountUsd = Math.max(baseAmount + shippingFee, 0);

  console.log("[ModalSIM] montos calculados", {
    shippingFee,
    baseAmount,
    amountUsd,
  });

  const providerName = (product?.provider || product?.brand || "").toLowerCase();
  const isEncryptedProvider = providerName.includes("encript");

  const isTottoliSim =
    isEncryptedProvider &&
    (
      formType === "encrypted_esim" ||
      formType === "encrypted_data" ||
      formType === "encrypted_minutes" ||
      formType === "encrypted_physical"
    );

  console.log("[ModalSIM] provider / flags", {
    providerName,
    isEncryptedProvider,
    isTottoliSim,
    formType,
  });

  if (isTottoliSim) {
    const tottoliMethod: TottoliMethod =
      data.method === "card" ? "card" : "cryptomus";

    const common = {
      email: data.email,
      method: tottoliMethod,
      amount: amountUsd,
      currency: "USD",
    } as const;

    let payload: TottoliCheckoutPayload;

    if (formType === "encrypted_esim") {
      payload = {
        ...common,
        product: "esim",
        qty: quantity,
      };
    } else if (formType === "encrypted_data") {
      payload = {
        ...common,
        product: "data",
        sim_number: data.simNumber,
      };
    } else if (formType === "encrypted_minutes") {
      payload = {
        ...common,
        product: "minutes",
        sim_number: data.simNumber,
      };
    } else {
      payload = {
        ...common,
        product: "sim_physical",
        shipping_payload: {
          shipping_name: data.fullName,
          country: data.country,
          postal_code: data.postalCode,
          phone: data.phone,
          telegram_id: data.telegram,
        },
      };
    }

    console.log("➡️ Tottoli checkout payload", payload);
    const res = await tottoliCheckout(payload);

    if (res.payment.method === "stripe") {
      window.location.href = res.payment.stripe.checkoutUrl;
    } else if (res.payment.method === "cryptomus") {
      window.location.href = res.payment.cryptomus.url;
    } else {
      console.error("[ModalSIM] método de pago inesperado", res.payment);
    }
    return;
  }

  try {
    const productIdNum = Number(productid);
    const provider: PayProvider =
      data.method === "card" ? "stripe" : "kriptomus";

    await payUserId({
      productId: productIdNum,
      email: data.email,
      provider,
      amount: amountUsd,
      currency: "USD",
      // @ts-expect-error metadata depende de tu implementación
      metadata: {
        type: "SIM_GENERIC",
        telegram: data.telegram,
        fullName: data.fullName,
        address: data.address,
        country: data.country,
        postalCode: data.postalCode,
        phone: data.phone,
        quantity,
        simNumber: data.simNumber,
        planId: selectedPlanId,
      },
    });
  } catch (e: any) {
    if (e?.code === "out_of_stock") {
      alert("Stock insuficiente");
    } else {
      alert(e?.message || "Error procesando el pago");
    }
  }
};



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
        formType === "encrypted_esim"
          ? undefined
          : 75
      }
      selectedPlanId={selectedPlanId}
      onChangePlan={setSelectedPlanId}
      showEsimAddon={
        formType === "encrypted_data" || formType === "encrypted_minutes"
      }
      esimAddonPrice={7.5}
      esimAddonLabel="Lleva E-SIM por 7.50 USD"
    >
      <SimForm onSubmit={handleSubmit} formType={formType} />
    </PurchaseScaffold>
  );
}
