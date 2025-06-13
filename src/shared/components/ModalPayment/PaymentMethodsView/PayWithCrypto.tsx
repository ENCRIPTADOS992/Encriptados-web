"use client";

import React, { useEffect } from "react";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

interface Props {
  product: ProductById;
  closeModal: () => void;
  languageCode: string;
  email?: string;
}

const PayWithCrypto: React.FC<Props> = ({
  product,
  closeModal,
  languageCode,
  email,
}) => {
  const getAmountForCrypto = (price: string) => {
    const parsed = Number(price);
    if (isNaN(parsed)) return 0;
    return parsed * 100;
  };

  const amount = product.on_sale
    ? getAmountForCrypto(product.sale_price)
    : getAmountForCrypto(product.price);

  useEffect(() => {
    const startCryptoPayment = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_CRYPTO_MUS ||
          `${window.location.origin}/api/cripto/cryptomus-process`;

        const payload = {
          sim_number: "",
          email: email || "",
          telegramid: "",
          name: product.name,
          product_type: product.type_product || "app",
          esim_select: "No",
          lang: languageCode,
          type: "5",
          cripto: "",
          description: `${product.name}\n${product.licensetime || "12 meses de servicio"}`,
          amount, 
          image: product.images?.[0]?.src || "",
          quantity: 1,
          planinfo: "",
          variant1: "",
          variant2: "",
          variant3: "",
          address: "",
          city: "",
          country: "",
          postal: "",
          phone: "",
          titular: "",
          postal_code: "",
        };

        console.log("→ Payload enviado a Cryptomus:", payload);

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (!json.status || !json.url) {
          throw new Error(json.message || "Error al generar pago cripto");
        }

        window.location.href = json.url;
      } catch (err) {
        console.error("Error en redirección cripto:", err);
        alert("Hubo un error al procesar el pago con criptomonedas.");
        closeModal();
      }
    };

    startCryptoPayment();
  }, [product, languageCode, email, closeModal, amount]);

  return null;
};

export default PayWithCrypto;
