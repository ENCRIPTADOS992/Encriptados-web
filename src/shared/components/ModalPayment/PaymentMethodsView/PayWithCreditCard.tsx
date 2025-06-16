"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import FormPaymentInput from "../FormPaymentInput";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

interface Props {
  closeModal: () => void;
  email?: string;
  productId: string;
  languageCode: string;
  product: {
    name: string;
    licensetime?: string;
    price: string;
    sale_price: string;
    on_sale: boolean;
    images?: { src: string }[];
  };
}

const PayWithCreditCard: React.FC<Props> = ({
  closeModal,
  email,
  productId,
  languageCode,
  product,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    const { token, error } = await stripe.createToken(card, {
      name: cardholderName,
      address_zip: postalCode,
    });

    if (error || !token) {
      console.error("Error generando token:", error);
      alert("Error al procesar tarjeta.");
      setLoading(false);
      return;
    }

    const price = product.on_sale ? product.sale_price : product.price;
    const amount = Number(price) * 100;

    const payload = {
      sim_number: "",
      email: email || "",
      telegramid: "",
      name: product.name,
      product_type: "app",
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
      titular: cardholderName,
      paymethod_id: "stripe",
      postal_code: postalCode,
      stripeToken: token.id,
    };

    const res = await fetch("https://app.encriptados.io/api/chargetype", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (json.status === "success") {
      alert("✅ Pago exitoso");
    } else {
      console.error("❌ Error del servidor:", json);
      alert("Error al procesar el pago");
    }

    setLoading(false);
    closeModal();
  };

  const normalizeCardNumber = (value: string) => value.replace(/\D/g, "");

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 16) {
      setCardNumber(raw);
    }
  };

  const currentYear = new Date().getFullYear() % 100;

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 4) return;

    const mm = raw.slice(0, 2);
    const yy = raw.slice(2, 4);

    if (mm.length === 2 && (parseInt(mm, 10) < 1 || parseInt(mm, 10) > 12)) {
      return;
    }

    if (yy && raw.length === 4 && parseInt(yy, 10) < currentYear) {
      return;
    }

    setExpiry(raw);
  };

  const formatExpiry = (value: string) => {
    const mm = value.slice(0, 2);
    const yy = value.slice(2, 4);
    return yy ? `${mm} / ${yy}` : mm;
  };

  const maskCvc = (value: string) => "•".repeat(value.length);

  const handleCardholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardholderName(value);
    }
  };

  const handleNumericChange =
    (setter: (value: string) => void, maxLength = Infinity) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numeric = e.target.value.replace(/\D/g, "");
      if (numeric.length <= maxLength) {
        setter(numeric);
      }
    };

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        Pagar con Tarjeta
      </h3>

      {/* Bloque método */}
      <div className="flex items-center gap-2 bg-[#f6f9fb] rounded-lg p-3">
        <CreditCardIcon className="h-6 w-6 text-gray-600" />
        <span className="text-xs font-medium text-gray-700">
          Tarjeta de crédito / débito / prepago
        </span>
      </div>

      {/* Formulario */}
      <form className="flex flex-col gap-3">
        {/* Titular */}
        <label className="flex flex-col text-xs text-gray-600">
          Titular de la tarjeta
          <FormPaymentInput
            placeholder="Juan Pérez"
            handleChange={handleCardholderChange}
            handleBlur={() => {}}
            value={cardholderName}
            width="100%"
            type="text"
          />
        </label>

        <p className="text-xs font-medium text-gray-700">Datos de tarjeta</p>
        <label className="flex flex-col text-xs text-gray-600">
  Número de tarjeta
  <div className="p-2 border rounded bg-white">
    <CardNumberElement className="w-full" />
  </div>
</label>

{/* Fecha y CVC */}
<div className="grid grid-cols-2 gap-2">
  <label className="flex flex-col text-xs text-gray-600">
    Vencimiento
    <div className="p-2 border rounded bg-white">
      <CardExpiryElement className="w-full" />
    </div>
  </label>

  <label className="flex flex-col text-xs text-gray-600">
    CVC
    <div className="p-2 border rounded bg-white">
      <CardCvcElement className="w-full" />
    </div>
  </label>
</div>

        <FormPaymentInput
          placeholder="Código Postal"
          handleChange={handleNumericChange(setPostalCode)}
          handleBlur={() => {}}
          value={postalCode}
          width="100%"
          type="text"
        />

        {/* Botón Comprar */}
        <button
          type="submit"
          className="w-full rounded-md bg-[#10b4e7] py-2 text-xs font-medium text-white hover:bg-blue-500 transition"
        >
          Comprar
        </button>
      </form>
    </div>
  );
};

export default PayWithCreditCard;
