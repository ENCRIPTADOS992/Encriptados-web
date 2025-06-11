// src/shared/components/ModalPayment/PaymentMethodsView/PayWithCrypto.tsx
"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
  if (!selectedCrypto) {
    setError("Selecciona una criptomoneda");
    return;
  }
  setError(null);
  setLoading(true);

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_CRYPTO_MUS ||
      `${window.location.origin}/api/cripto/cryptomus-process`;

    const payload = {
      product_id: productId,
      email: email || "",
      lang: languageCode,
      crypto_currency: selectedCrypto,
    };
    console.log("→ Payload:", payload);

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("→ Fetch status:", res.status, res.statusText);

    const json = await res.json();
    console.log("→ JSON response:", json);

    if (!json.status) {
      throw new Error(json.message || "Error al generar pedido cripto");
    }
    if (json.url) {
      window.location.href = json.url;
      return;
    }
    throw new Error("No se recibió URL de pago");
  } catch (err: any) {
    console.error("Error in handleGenerate:", err);
    setError(err.message);
    setLoading(false);
  }
};


  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Pagar con Criptomonedas</h3>
        <button onClick={closeModal}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <label className="flex flex-col text-sm">
        Seleccionar Criptomoneda:
        <select
          value={selectedCrypto}
          onChange={e => setSelectedCrypto(e.target.value)}
          className="mt-1 rounded-md border py-2 px-3"
        >
          <option value="">— Elige Cripto —</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USDC">USDC</option>
          <option value="USDT">USDT</option>
        </select>
      </label>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="rounded-md bg-primary px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Procesando..." : "Pagar con Cripto"}
      </button>

      <button onClick={closeModal} className="text-sm underline">
        Volver
      </button>
    </div>
  );
};

export default PayWithCrypto;
