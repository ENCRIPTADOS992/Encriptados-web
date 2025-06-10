// src/shared/components/ModalPayment/PaymentMethodsView/PayWithCrypto.tsx
"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  productId: string;
  closeModal: () => void;
  languageCode: string;
  email: string;
}

interface CryptoResponse {
  status: boolean;
  order_id: string;
  return_url: string;
  address: string;
  qrcode_url: string;
  currency: string;
  amount: number;
  timeout: number; // seconds
  message?: string;
}

const PayWithCrypto: React.FC<Props> = ({ productId, closeModal, languageCode, email }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [data, setData] = useState<CryptoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Polling interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (data && data.order_id) {
      interval = window.setInterval(async () => {
        try {
          const res = await fetch('/api/cripto/check-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pedidoId: data.order_id }),
          });
          const json = await res.json();
          if (json.status) {
            window.clearInterval(interval);
            window.location.href = data.return_url;
          }
        } catch (err) {
          console.error(err);
        }
      }, 5000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [data]);

  const handleGenerate = async () => {
    if (!selectedCrypto) {
      setError('Selecciona una criptomoneda');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const form = new FormData();
      form.append('productId', productId);
      form.append('email', email);
      form.append('lang', languageCode);
      form.append('crypto', selectedCrypto);
      // añade más campos si los necesitas (cantidad, cupón...)

      const res = await fetch('/api/cripto/cryptomus-process', {
        method: 'POST',
        body: form,
      });
      const json: CryptoResponse = await res.json();
      if (json.status) {
        setData(json);
      } else {
        setError(json.message || 'Error al generar pedido cripto');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error de red');
    } finally {
      setLoading(false);
    }
  };

  // If we have data, show the QR and address
  if (data) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Escanea para pagar</h3>
        <div className="my-4 flex flex-col items-center gap-4">
          <img src={data.qrcode_url} alt="QR Cripto" className="w-48 h-48" />
          <p className="text-sm">Dirección: <code className="bg-gray-100 p-1 rounded">{data.address}</code></p>
          <p className="text-sm">Monto: {data.amount} {data.currency}</p>
          <p className="text-xs text-gray-500">Expira en: {data.timeout}s</p>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button onClick={closeModal} className="mt-4 text-sm underline">Volver</button>
      </div>
    );
  }

  // Initial selection view
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
        {loading ? 'Procesando...' : 'Generar QR'}
      </button>
      <button onClick={closeModal} className="text-sm underline">Volver</button>
    </div>
  );
};

export default PayWithCrypto;
