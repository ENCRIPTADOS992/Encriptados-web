// src/shared/components/ModalPayment/PaymentMethodsView/PayWithAtm.tsx
"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  productId: string;
  closeModal: () => void;
  languageCode: string;
}

const PayWithAtm: React.FC<Props> = ({ productId, closeModal, languageCode }) => {
  return (
    <div className="mt-4 flex flex-col gap-6">
      {/* Título y subtítulo */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Pagar con ATM
        </h3>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Instrucciones genéricas */}
      <p className="text-gray-700 dark:text-gray-300 text-sm">
        Selecciona tu banco, avanza con la referencia y completa el pago vía cajero electrónico. Productos:{" "}
        <span className="font-medium">{productId}</span> (idioma: <span className="font-medium">{languageCode}</span>).
      </p>

      {/* Ejemplo de formulario simplificado */}
      <form className="flex flex-col gap-4">
        <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
          Banco:
          <select className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <option value="">— Selecciona tu banco —</option>
            <option value="banco1">Banco 1</option>
            <option value="banco2">Banco 2</option>
            <option value="banco3">Banco 3</option>
          </select>
        </label>

        <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
          Número de Referencia:
          <input
            type="text"
            placeholder="1234 5678 9012"
            className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500"
          />
        </label>

        <button
          type="submit"
          className="mt-2 self-start rounded-md bg-primary px-4 py-2 text-white transition hover:bg-blue-600 focus:outline-none"
        >
          Generar Referencia
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

export default PayWithAtm;