"use client";
import React, { useState } from "react";

const ModalJoinUsDeliveries = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Regístrate</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="border rounded-lg px-4 py-2 w-full"
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="border rounded-lg px-4 py-2 w-full"
              />
              <textarea
                placeholder="Mensaje (opcional)"
                className="border rounded-lg px-4 py-2 w-full"
              />
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Enviar
              </button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-gray-600 hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalJoinUsDeliveries;
