"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import FormPaymentInput from "../FormPaymentInput";

interface Props {
  closeModal: () => void;
  email?: string;
  productId: string;
  languageCode: string;
}

const PayWithCreditCard: React.FC<Props> = ({
  closeModal,
  email,
  productId,
  languageCode,
}) => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postalCode, setPostalCode] = useState("");

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
        <FormPaymentInput
          placeholder="1234 1234 1234 1234"
          handleChange={handleCardNumberChange}
          handleBlur={() => {}}
          value={formatCardNumber(cardNumber)}
          width="100%"
          type="text"
        />

        <div className="grid grid-cols-3 gap-1">
          <FormPaymentInput
            placeholder="MM / AA"
            handleChange={handleExpiryChange}
            handleBlur={() => {}}
            value={formatExpiry(expiry)}
            width="100%"
            type="text"
          />

          <FormPaymentInput
            placeholder="CVC"
            handleChange={handleNumericChange(setCvc, 3)}
            handleBlur={() => {}}
            value={cvc}
            width="100%"
            type="password"
          />
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
