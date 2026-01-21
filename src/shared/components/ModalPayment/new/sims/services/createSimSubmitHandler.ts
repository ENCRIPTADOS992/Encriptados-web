// src/shared/components/ModalPayment/new/sims/services/createSimSubmitHandler.ts
"use client";

import {
  type ModalProduct,
  type Shipping,
  type StripeConfirmFn,
  type PayProvider,
  type FormType,
  type TottoliCheckoutPayload,
  type TottoliMethod,
  type SuccessPaymentData,
} from "../types/modalSimTypes";
import { tottoliCheckout } from "@/features/products/payments/tottoliCheckout";
import {
  deriveProductFamily,
  deriveProductFormat,
  deriveProductSlug,
  hydrateCanonicalPath,
} from "@/app/[locale]/sim/[slug]/simProductConfig";
import toast from "react-hot-toast";

type Params = {
  formType: FormType;
  isPhysical: boolean;
  unitPrice: number;
  quantity: number;
  discount: number;
  productid?: string;
  product: ModalProduct | undefined;
  selectedPlanId: string | number | null;
  stripeConfirm: StripeConfirmFn | null;
  payUserId: (args: {
    productId: number;
    email: string;
    provider: PayProvider;
    amount: number;
    currency: string;
    metadata?: Record<string, any>;
  }) => Promise<any>;
  onSuccess?: (data: SuccessPaymentData) => void;
};

export function createSimSubmitHandler({
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
  onSuccess,
}: Params) {
  return async function handleSubmit(data: Shipping) {
    console.log("[createSimSubmitHandler] submit 👉", {
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

    console.log("[createSimSubmitHandler] montos calculados", {
      shippingFee,
      baseAmount,
      amountUsd,
    });

    const providerName = (
      product?.provider || product?.brand || ""
    ).toLowerCase();
    const isEncryptedProvider = providerName.includes("encript");
    const isTimProvider = providerName.includes("tim");

    // Productos que van por Tottoli (Encrypted)
    const isTottoliSim =
      isEncryptedProvider &&
      (formType === "encrypted_esim" ||
        formType === "encrypted_data" ||
        formType === "encrypted_minutes" ||
        formType === "encrypted_physical" ||
        formType === "encrypted_esimData");

    // Productos TIM (física o eSIM)
    const isTimSim =
      isTimProvider &&
      (formType === "tim_physical" || formType === "tim_esim");

    console.log("[createSimSubmitHandler] provider / flags", {
      providerName,
      isEncryptedProvider,
      isTimProvider,
      isTottoliSim,
      isTimSim,
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

      if (formType === "encrypted_esim" || formType === "encrypted_esimData") {
        payload = {
          ...common,
          product: "esim",
          qty: quantity,
        };
      } else if (formType === "encrypted_data") {
        const nums = (quantity > 1 ? (data.simNumbers ?? []) : [data.simNumber])
          .map((x) => String(x ?? "").trim())
          .filter((x) => x.length > 0);
        payload = {
          ...common,
          product: "data",
          sim_number: nums.join(","),
        };
      } else if (formType === "encrypted_minutes") {
        const nums = (quantity > 1 ? (data.simNumbers ?? []) : [data.simNumber])
          .map((x) => String(x ?? "").trim())
          .filter((x) => x.length > 0);
        payload = {
          ...common,
          product: "minutes",
          sim_number: nums.join(","),
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
      console.log("[createSimSubmitHandler] respuesta tottoli", res);

      if (tottoliMethod === "card") {
        const clientSecret = (res as any).client_secret as
          | string
          | undefined;

        console.log(
          "[createSimSubmitHandler] Stripe PaymentIntent creado (Tottoli)",
          {
            provider: (res as any).provider,
            provider_ref: (res as any).provider_ref,
            client_secret: clientSecret,
            stripeConfirmCurrent: stripeConfirm,
            stripeConfirmType: typeof stripeConfirm,
          }
        );

        if (!clientSecret) {
          toast.error("Pedido creado, pero no se recibió client_secret para Stripe.");
          return;
        }

        if (!stripeConfirm) {
          console.warn(
            "[createSimSubmitHandler] stripeConfirm todavía no está listo"
          );
          toast.error("Stripe todavía se está inicializando. Espera un momento y vuelve a intentar.");
          return;
        }

        const billing = {
          name: data.fullName || undefined,
          email: data.email,
          postal_code:
            data.cardPostal || data.postalCode || undefined,
        };

        try {
          const confirmRes = await stripeConfirm(
            clientSecret,
            billing
          );

          console.log(
            "[createSimSubmitHandler] resultado confirmCardPayment",
            confirmRes
          );

          if (confirmRes?.status === "succeeded") {
            const paymentIntent = confirmRes.intent || confirmRes.paymentIntent;
            onSuccess?.({
              intent: {
                id: paymentIntent?.id || (res as any).provider_ref || "unknown",
                amount: amountUsd * 100, // convertir a centavos
                currency: "usd",
                created: Math.floor(Date.now() / 1000),
              },
              orderId: (res as any).order_id || null,
            });
            return;
          }

          if (confirmRes?.error) {
            toast.error(String(confirmRes.error));
            return;
          }

          toast.error("No se pudo completar el pago con la tarjeta.");
        } catch (err: any) {
          console.error(
            "[createSimSubmitHandler] error confirmando pago Stripe",
            err
          );
          toast.error(err?.message || "Error confirmando el pago con Stripe.");
        }

        return;
      }

      if (tottoliMethod === "cryptomus") {
        if (
          (res as any).provider === "cryptomus" &&
          (res as any).payment_url
        ) {
          window.location.href = (res as any).payment_url;
        } else {
          console.warn(
            "[createSimSubmitHandler] provider cryptomus pero sin payment_url en respuesta",
            res
          );
          toast.error("Pedido creado, pero no se recibió URL de pago.");
        }
        return;
      }

      console.error(
        "[createSimSubmitHandler] método Tottoli inesperado",
        {
          tottoliMethod,
          res,
        }
      );
      toast.error("Método de pago Tottoli desconocido.");
      return;
    }

    try {
      const productIdNum = Number(productid);
      const provider: PayProvider =
        data.method === "card" ? "stripe" : "kriptomus";

      // Derivar valores para metadata
      const productFamily = deriveProductFamily(product?.provider || product?.brand);
      const productFormat = deriveProductFormat(product?.type_product);
      const slug = deriveProductSlug(productFamily, productFormat);
      const canonicalPath = hydrateCanonicalPath(slug);

      await payUserId({
        productId: productIdNum,
        email: data.email,
        provider,
        amount: amountUsd,
        currency: "USD",
        metadata: {
          type: formType,
          productFamily,
          productFormat,
          slug,
          sourcePage: canonicalPath,
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
        toast.error("Stock insuficiente");
      } else {
        toast.error(e?.message || "Error procesando el pago");
      }
    }
  };
}
