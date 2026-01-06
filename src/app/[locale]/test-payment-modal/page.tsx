"use client";

import React, { useState } from "react";
import PaymentSuccessModal from "@/payments/PaymentSuccessModal";

export default function TestPaymentModalPage() {
  const [open, setOpen] = useState(true);

  // Datos de ejemplo para el modal
  const mockIntent = {
    id: "pi_32235NhuOPPSMD220jV",
    amount: 22000, // $220 en centavos
    currency: "usd",
    created: Math.floor(Date.now() / 1000), // timestamp actual
    receipt_email: "test@example.com",
    description: null,
    status: "succeeded",
  };

  const mockOrderId = 91;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Test - PaymentSuccessModal
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Abrir Modal de Pago Exitoso
        </button>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Datos del mock:</h2>
          <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
            {JSON.stringify({ intent: mockIntent, orderId: mockOrderId }, null, 2)}
          </pre>
        </div>
      </div>

      <PaymentSuccessModal
        open={open}
        onClose={() => setOpen(false)}
        intent={mockIntent}
        orderId={mockOrderId}
      />
    </div>
  );
}
