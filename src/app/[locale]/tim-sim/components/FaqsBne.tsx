// src/app/[locale]/tim-sim/components/TimSimFaq.tsx
"use client";

import React, { useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const leftColumn: FaqItem[] = [
  {
    id: "q1",
    question: "¿Qué dispositivos son compatibles con la SIM?",
    answer:
      "La SIM funciona con la mayoría de teléfonos y tablets desbloqueados. Solo necesitas que tu dispositivo admita la banda de tu operador local.",
  },
  {
    id: "q2",
    question: "¿Cómo activo mi SIM después de comprarla?",
    answer:
      "Recibirás instrucciones paso a paso por correo y dentro de la app. Generalmente solo debes escanear un código o seguir una guía rápida.",
  },
  {
    id: "q3",
    question: "¿Puedo usarla en varios países?",
    answer:
      "Sí. Dependiendo del plan contratado, podrás usar la SIM en diferentes países sin cambiar de número ni perder tu saldo de datos.",
  },
];

const rightColumn: FaqItem[] = [
  {
    id: "q4",
    question: "¿Mi información personal queda registrada?",
    answer:
      "No pedimos información sensible innecesaria. Nuestro enfoque está en mantener tu navegación lo más privada posible.",
  },
  {
    id: "q5",
    question: "¿Qué pasa si agoto mis datos?",
    answer:
      "Puedes recargar tu plan desde la app o desde la web en cualquier momento, sin perder tu SIM ni necesidad de volver a activarla.",
  },
  {
    id: "q6",
    question: "¿Hay soporte si tengo problemas con la activación?",
    answer:
      "Sí. Contamos con soporte vía chat y correo para ayudarte con la instalación, activación y uso de tu SIM.",
  },
];

const TimSimFaq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(leftColumn[0].id);

  const renderItem = (item: FaqItem) => {
    const isOpen = openId === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setOpenId(isOpen ? null : item.id)}
        aria-expanded={isOpen}
        aria-label={`Pregunta: ${item.question}`}
        className="
          w-full text-left
          bg-white
          rounded-[16px]
          shadow-sm
          px-4 md:px-5
          py-3 md:py-4
          transition
          hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-[#19BBFF] focus:ring-offset-2
        "
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm md:text-[15px] font-medium text-[#111827]">
            {item.question}
          </span>
          <span className="text-lg text-[#9CA3AF]">
            {isOpen ? "▲" : "▼"}
          </span>
        </div>

        {isOpen && (
          <p className="mt-3 text-xs md:text-sm text-[#4B5563] leading-relaxed">
            {item.answer}
          </p>
        )}
      </button>
    );
  };

  return (
    <section className="py-12 lg:py-16 bg-[#F4F8FA]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-center text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] mb-8 md:mb-10 text-[#333333]">
          Preguntas{" "}
          <span className="text-[#19BBFF]">frecuentes</span>
        </h2>

        {/* Grid de FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="space-y-3">{leftColumn.map(renderItem)}</div>
          <div className="space-y-3">{rightColumn.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
};

export default TimSimFaq;
