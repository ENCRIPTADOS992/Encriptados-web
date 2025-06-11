"use client";

import React, { useEffect } from "react";

interface Props {
  productId: string;
  closeModal: () => void;
  languageCode: string;
  email?: string;
}

const PayWithCrypto: React.FC<Props> = ({
  productId,
  closeModal,
  languageCode,
  email,
}) => {
  useEffect(() => {
    const startCryptoPayment = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_CRYPTO_MUS ||
          `${window.location.origin}/api/cripto/cryptomus-process`;

        const payload = {
          product_id: productId,
          email: email || "",
          lang: languageCode,
          crypto_currency: "USDT", // fija la cripto deseada, o parametrízala si quieres
        };

        console.log("→ Payload:", payload);

        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (!json.status || !json.url) {
          throw new Error(json.message || "Error al generar pago cripto");
        }

        window.location.href = json.url; // redirección automática
      } catch (err) {
        console.error("Error en redirección cripto:", err);
        alert("Hubo un error al procesar el pago con criptomonedas.");
        closeModal();
      }
    };

    startCryptoPayment();
  }, [productId, languageCode, email, closeModal]);

  return null; // no renderizamos nada
};

export default PayWithCrypto;
