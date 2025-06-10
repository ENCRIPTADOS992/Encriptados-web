// src/shared/components/ModalPayment/PaymentMethodsView/PayWithCreditCard.tsx
"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  productId: string;
  closeModal: () => void;
  languageCode: string;
  email: string;
}

const PayWithCreditCard: React.FC<Props> = ({ productId, closeModal, languageCode, email }) => {
  return (
    <div className="mt-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Pagar con Tarjeta
        </h3>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Texto explicativo */}
      <p className="text-gray-700 dark:text-gray-300 text-sm">
        Usuario: <span className="font-medium">{email}</span>. Ingresa los datos de tu tarjeta y completa el proceso de pago. Producto:{" "}
        <span className="font-medium">{productId}</span> (idioma: <span className="font-medium">{languageCode}</span>).
      </p>

      {/* Ejemplo de formulario de tarjeta (placeholder) */}
      <form className="flex flex-col gap-4">
        <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
          Número de Tarjeta:
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
            Fecha Expiración:
            <input
              type="text"
              placeholder="MM/AA"
              className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </label>
          <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
            CVV:
            <input
              type="password"
              placeholder="●●●"
              className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </label>
        </div>

        <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
          Nombre en la Tarjeta:
          <input
            type="text"
            placeholder="Juan Pérez"
            className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-md bg-primary px-4 py-2 text-white transition hover:bg-blue-600 focus:outline-none"
        >
          Pagar Ahora
        </button>
      </form>

      {/* Botón para regresar */}
      <button
        onClick={closeModal}
        className="mt-4 self-start text-sm text-gray-600 dark:text-gray-400 hover:underline"
      >
        Volver
      </button>
    </div>
  );
};

export default PayWithCreditCard;
