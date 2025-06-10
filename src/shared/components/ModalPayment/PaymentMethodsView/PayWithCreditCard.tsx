"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import FormPaymentInput from "../FormPaymentInput";

interface Props {
  closeModal: () => void;
  email: string;
  productId: string;
  languageCode: string;
}

const PayWithCreditCard: React.FC<Props> = ({
  closeModal,
  email,
  productId,
  languageCode,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Pagar con Tarjeta</h3>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Explicación */}
      <p className="text-xs text-gray-700">
        Usuario: <span className="font-medium">{email}</span>. Producto:{" "}
        <span className="font-medium">{productId}</span> ({languageCode}).
      </p>

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
            handleChange={() => {}}
            handleBlur={() => {}}
            value=""
            width="100%"
            type="text"
          />
        </label>

        {/* Datos de tarjeta */}
        <p className="text-xs font-medium text-gray-700">Datos de tarjeta</p>
        <FormPaymentInput
          placeholder="1234 1234 1234 1234"
          handleChange={() => {}}
          handleBlur={() => {}}
          value=""
          width="100%"
          type="text"
        />

        <div className="grid grid-cols-3 gap-1">
          <FormPaymentInput
            placeholder="MM / AA"
            handleChange={() => {}}
            handleBlur={() => {}}
            value=""
            width="100%"
            type="text"
          />
          <FormPaymentInput
            placeholder="CVC"
            handleChange={() => {}}
            handleBlur={() => {}}
            value=""
            width="100%"
            type="text"
          />
        </div>

        <FormPaymentInput
          placeholder="Código Postal"
          handleChange={() => {}}
          handleBlur={() => {}}
          value=""
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
