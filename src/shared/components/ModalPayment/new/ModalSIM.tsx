// src/shared/components/ModalPayment/new/ModalSIM.tsx
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { getProductById } from "@/features/products/services";
import PurchaseScaffold from "./PurchaseScaffold";
import { useCheckout } from "@/shared/hooks/useCheckout";
import SimForm from "./SimForm";

type ProductFromAPI = Awaited<ReturnType<typeof getProductById>>;
type Variant = { id: number; licensetime: number; price: number; sku?: string; image?: string };
type ConfigSim = { type: string; sku?: string; code?: string };
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
export default function ModalSIM() {
  const { params } = useModalPayment();
  const { productid } = (params || {}) as { productid?: string };
  const { payUserId } = useCheckout();

  const { data: product } = useQuery<ModalProduct>({
    queryKey: ["productById", productid],
    queryFn: () => getProductById(productid!),
    enabled: !!productid,
  });
  type FormType =
    | "encrypted_physical"
    | "encrypted_esim"
    | "encrypted_data"
    | "encrypted_minutes"
    | "encrypted_generic";

  const formType: FormType = React.useMemo(() => {
    const prov = (product?.provider || product?.brand || "").toLowerCase();
    const cfg  = (product?.config_sim?.[0]?.type || "").toLowerCase();
    const ship = (product?.shipping || "").toLowerCase();
    const phys = (product?.type_product || "").toLowerCase();
    if (!prov.includes("encript")) return "encrypted_generic";
    if (cfg === "esim")    return "encrypted_esim";
    if (cfg === "data")    return "encrypted_data";
    if (cfg === "minutes") return "encrypted_minutes";
    if (ship === "si" || phys === "fisico") return "encrypted_physical";
    return "encrypted_generic";
  }, [product]);

  const minutesPlans = React.useMemo(() => {
    if (formType !== "encrypted_minutes") return [];
    const items = product?.config_sim ?? [];
    return items.map((c, i) => ({
      id: c.sku || c.code || i,
      label: c.code ? `${c.code} Minutos` : (c.sku || "Plan"),
      value: Number(c.code) || 0,
    }));
  }, [formType, product]);


  const [selectedPlanId, setSelectedPlanId] = React.useState<string | number | null>(null);
  React.useEffect(() => {
    setSelectedPlanId(minutesPlans[0]?.id ?? null);
  }, [minutesPlans]);

  const [selectedVariant, setSelectedVariant] = React.useState<Variant | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [coupon, setCoupon] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const variants = product?.variants ?? [];
  React.useEffect(() => { setSelectedVariant(variants[0] ?? null); }, [product]);

  const unitPrice =
    (variants.length ? selectedVariant?.price ?? variants[0]?.price : Number(product?.price)) || 0;

  const onApplyCoupon = () => setDiscount(coupon.trim().toUpperCase() === "DESCUENTO5" ? 5 : 0);

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

  const handleSubmit = async (data: Shipping) => {
    const amount = Math.max(unitPrice * quantity - discount, 0);
    const provider = data.method === "card" ? "stripe" : "kriptomus" as const;

    await payUserId({
      productId: Number(productid),
      email: data.email,
      provider,
      amount,
      currency: "USD",
      // si tu SDK acepta metadata, envía los datos de envío:
      // @ts-expect-error metadata opcional según implementación
      metadata: {
        type:
          formType === "encrypted_esim" ? "ESIM"
          : formType === "encrypted_data" ? "RECHARGE_DATA"
          : formType === "encrypted_minutes" ? "RECHARGE_MINUTES"
          : formType === "encrypted_physical" ? "SIM_PHYSICAL"
          : "SIM_GENERIC",
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
  };

  return (
    <PurchaseScaffold
    mode="sim"
    enableTabSwitch={false}
    showRechargeCTA={false}
    product={product}
    selectedVariantId={selectedVariant?.id ?? null}
    onChangeVariant={(id) => setSelectedVariant(variants.find(v => v.id === id) ?? null)}
    quantity={quantity}
    setQuantity={setQuantity}
    coupon={coupon}
    setCoupon={setCoupon}
    onApplyCoupon={onApplyCoupon}
    unitPrice={unitPrice}

    showLicense={false}  
    // Ocultar envío en physical/data/minutes → no pases shipping
    shipping={
      formType === "encrypted_physical" || formType === "encrypted_data" || formType === "encrypted_minutes" || formType === "encrypted_esim"
        ? undefined
        : 75
    }
    // minutesPlans={minutesPlans}
    selectedPlanId={selectedPlanId}
    onChangePlan={setSelectedPlanId}
    showEsimAddon={formType === "encrypted_data" || formType === "encrypted_minutes"}
    esimAddonPrice={7.5}
    esimAddonLabel="Lleva E-SIM por 7.50 USD"         
  >
    <SimForm onSubmit={handleSubmit} formType={formType} />
  </PurchaseScaffold>
  );
}
