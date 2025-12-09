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
} from "../types/modalSimTypes";
import { tottoliCheckout } from "@/features/products/payments/tottoliCheckout";

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

    const isTottoliSim =
      isEncryptedProvider &&
      (formType === "encrypted_esim" ||
        formType === "encrypted_data" ||
        formType === "encrypted_minutes" ||
        formType === "encrypted_physical" ||
        formType === "encrypted_esimData");

    console.log("[createSimSubmitHandler] provider / flags", {
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
          alert(
            "Pedido creado, pero no se recibió client_secret para Stripe."
          );
          return;
        }

        if (!stripeConfirm) {
          console.warn(
            "[createSimSubmitHandler] stripeConfirm todavía no está listo"
          );
          alert(
            "Stripe todavía se está inicializando. Espera un momento y vuelve a intentar."
          );
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
            alert("Pago realizado correctamente 🎉");
            return;
          }

          if (confirmRes?.error) {
            alert(confirmRes.error);
            return;
          }

          alert("No se pudo completar el pago con la tarjeta.");
        } catch (err: any) {
          console.error(
            "[createSimSubmitHandler] error confirmando pago Stripe",
            err
          );
          alert(
            err?.message ||
              "Error confirmando el pago con Stripe."
          );
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
          alert("Pedido creado, pero no se recibió URL de pago.");
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
}
