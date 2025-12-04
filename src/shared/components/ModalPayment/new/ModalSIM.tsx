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
  name: string;
  ussd?:string;        
  gb?: string;         
  cost: number;
  days?:number      
  minutes?:number 
  minute_price?:number;
  currency: string;    
  label: string;       
  purchase_url: string;
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
  cardPostal?: string
};

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

  const [selectedPlanId, setSelectedPlanId] =
    React.useState<string | number | null>(null);

  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants: Variant[] = (product?.variants ?? []) as Variant[];

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);

    React.useEffect(() => {
      setSelectedVariant(variants[0] ?? null);
    }, [product, variants]);

  const minutesPlans = React.useMemo(() => {
  console.log("[ModalSIM] minutesPlans → start", {
    formType,
    variants,
    configSim: product?.config_sim,
  });

  if (formType !== "encrypted_minutes") {
    console.log("[ModalSIM] minutesPlans → formType NO es encrypted_minutes");
    return [];
  }

  const fromVariants =
    (variants ?? [])
      .map((v, i) => {
        const minutes = typeof v.minutes === "number" ? v.minutes : undefined;
        const cost = Number(v.cost ?? v.price ?? 0);

        const plan = {
          id: v.id ?? i,
          label:
            typeof minutes === "number" && minutes > 0
              ? `${minutes} Min`
              : v.label || v.name || "Plan",
          value: !Number.isNaN(cost) ? cost : 0, // 👈 precio correcto
        };

        console.log("[ModalSIM] minutesPlans → fromVariants item", {
          rawVariant: v,
          plan,
        });

        return plan;
      })
      .filter((p) => p.value > 0);

  console.log("[ModalSIM] minutesPlans → fromVariants result", fromVariants);

  if (fromVariants.length > 0) {
    console.log(
      "[ModalSIM] minutesPlans → usando fromVariants (NO config_sim)"
    );
    return fromVariants;
  }

  // ⚠️ Solo fallback si NO hay variants
  const items = product?.config_sim ?? [];
  console.log("[ModalSIM] minutesPlans → from config_sim fallback", items);

  const fromConfigSim = items
    .map((c, i) => {
      const numMinutes = c.code ? Number(c.code) : 0;
      const price = Number(product?.price ?? 0); // 👈 AQUÍ EL CAMBIO

      const plan = {
        id: c.sku || c.code || i,
        label: numMinutes > 0 ? `${numMinutes} Min` : c.sku || "Plan",
        value: price, // 👈 usamos el price del producto (10), NO 1000
      };

      console.log("[ModalSIM] minutesPlans → fromConfigSim item", {
        rawConfig: c,
        plan,
      });

      return plan;
    })
    .filter((p) => p.value > 0);

  console.log(
    "[ModalSIM] minutesPlans → fromConfigSim result (fallback)",
    fromConfigSim
  );

  return fromConfigSim;
}, [formType, variants, product]);


  React.useEffect(() => {
  console.log("[ModalSIM] useEffect minutesPlans → setSelectedPlanId", {
    minutesPlans,
    firstId: minutesPlans[0]?.id ?? null,
  });
  setSelectedPlanId(minutesPlans[0]?.id ?? null);
}, [minutesPlans]);


  const unitPrice = React.useMemo(() => {
  // Caso minutos
  if (formType === "encrypted_minutes" && minutesPlans.length) {
    const selected =
      minutesPlans.find((p) => p.id === selectedPlanId) ?? minutesPlans[0];

    const valueNumber = Number(selected.value || 0);

    console.log("[ModalSIM] unitPrice → MINUTES", {
      formType,
      selectedPlanId,
      selected,
      minutesPlans,
      unitPrice: valueNumber,
    });

    return valueNumber;
  }

  // Caso data
  if (formType === "encrypted_data" && selectedPlanId != null) {
    const valueNumber = Number(selectedPlanId) || 0;

    console.log("[ModalSIM] unitPrice → DATA", {
      formType,
      selectedPlanId,
      unitPrice: valueNumber,
    });

    return valueNumber;
  }

  // Caso con variants
  if (variants.length) {
    const v = selectedVariant ?? variants[0];
    const valueNumber = Number(v.price ?? v.cost ?? product?.price ?? 0);

    console.log("[ModalSIM] unitPrice → VARIANT", {
      formType,
      selectedVariant,
      fallbackVariant: variants[0],
      productPrice: product?.price,
      unitPrice: valueNumber,
    });

    return valueNumber;
  }

  // Caso genérico
  const valueNumber = Number(product?.price ?? 0);

  console.log("[ModalSIM] unitPrice → PRODUCT PRICE", {
    formType,
    productPrice: product?.price,
    unitPrice: valueNumber,
  });

  return valueNumber;
}, [
  formType,
  minutesPlans,
  selectedPlanId,
  variants,
  selectedVariant,
  product,
]);

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
    console.log("[ModalSIM] respuesta tottoli", res);

    if (tottoliMethod === "card") {
      const clientSecret = (res as any).client_secret as string | undefined;

      console.log("[ModalSIM] Stripe PaymentIntent creado (Tottoli)", {
        provider: res.provider,
        provider_ref: (res as any).provider_ref,
        client_secret: clientSecret,
        stripeConfirmCurrent: stripeConfirm,
        stripeConfirmType: typeof stripeConfirm,
      });

      if (!clientSecret) {
        alert("Pedido creado, pero no se recibió client_secret para Stripe.");
        return;
      }

      if (!stripeConfirm) {
        console.warn("[ModalSIM] stripeConfirm todavía no está listo");
        alert(
          "Stripe todavía se está inicializando. Espera un momento y vuelve a intentar."
        );
        return;
      }

      const billing = {
        name: data.fullName || undefined,
        email: data.email,
        postal_code: data.cardPostal || data.postalCode || undefined,
      };

      try {
        const confirmRes = await stripeConfirm(clientSecret, billing);

        console.log("[ModalSIM] resultado confirmCardPayment", confirmRes);

        if (confirmRes?.status === "succeeded") {
          alert("Pago realizado correctamente 🎉");
          return;
        }

        if (confirmRes?.error) {
          alert(confirmRes.error);
          return;
        }

        alert("No se pudo completar el pago con la tarjeta.");
      } catch (err: any) {
        console.error("[ModalSIM] error confirmando pago Stripe", err);
        alert(err?.message || "Error confirmando el pago con Stripe.");
      }

      return;
    }


    if (tottoliMethod === "cryptomus") {
      if ((res as any).provider === "cryptomus" && (res as any).payment_url) {
        window.location.href = (res as any).payment_url;
      } else {
        console.warn(
          "[ModalSIM] provider cryptomus pero sin payment_url en respuesta",
          res
        );
        alert("Pedido creado, pero no se recibió URL de pago.");
      }
      return;
    }

    console.error("[ModalSIM] método Tottoli inesperado", {
      tottoliMethod,
      res,
    });
    alert("Método de pago Tottoli desconocido.");
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
      minutesPlans={minutesPlans}
      selectedPlanId={selectedPlanId}
      onChangePlan={setSelectedPlanId}
      showEsimAddon={
        formType === "encrypted_data" || formType === "encrypted_minutes"
      }
      esimAddonPrice={7.5}
      esimAddonLabel="Lleva E-SIM por 7.50 USD"
      onChangeEsimAddon={(checked) => setHideSimField(checked)}
    >
    <SimForm 
      onSubmit={handleSubmit} 
      formType={formType} 
      hideSimField={hideSimField} 
      onStripeConfirmReady={handleStripeConfirmReady}
    />
    </PurchaseScaffold>
  );
}