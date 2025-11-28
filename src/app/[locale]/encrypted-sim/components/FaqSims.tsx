// ../../encrypted-sim/components/FaqSims.tsx
"use client";

import React, { useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const leftColumn: FaqItem[] = [
  {
    id: "devices",
    question: "¿Con qué dispositivos es compatible la eSIM?",
    answer:
      "La SIM Encriptados funciona con todos los teléfonos y tablets desbloqueados que soporten eSIM. Es compatible con las principales marcas del mercado como Android y iOS.",
  },
  {
    id: "places",
    question: "¿En qué lugares puedo usar la eSIM?",
    answer:
      "Puedes usarla en nuestros destinos disponibles. Solo debes elegir el país o región antes de la compra y tu eSIM funcionará en esa zona de cobertura.",
  },
  {
    id: "topup",
    question: "¿Cada cuánto debo recargar mi eSIM?",
    answer:
      "Puedes recargar cuando lo necesites. Mientras tengas datos disponibles y el plan esté activo, no es obligatorio recargar en una fecha fija.",
  },
  {
    id: "compatible",
    question: "¿Cómo saber si tu móvil es compatible con la eSIM?",
    answer:
      "Revisa en los ajustes de tu teléfono si aparece la opción de añadir eSIM o plan móvil digital. También puedes consultar el modelo en la web del fabricante.",
  },
];

const rightColumn: FaqItem[] = [
  {
    id: "how-works",
    question: "¿Cómo funciona ENCRYPTADOS eSIM?",
    answer:
      "Compras tu plan, recibes un código QR, lo activas desde los ajustes de tu teléfono y empiezas a usar tus datos móviles de forma segura y encriptada.",
  },
  {
    id: "multi-country",
    question: "¿Puedo usar ENCRYPTADOS eSIM en varios países?",
    answer:
      "Sí, según el plan contratado podrás usar la eSIM en uno o varios países. Verifica siempre la lista de destinos incluidos antes de comprar.",
  },
  {
    id: "secure",
    question: "¿Es seguro usar ENCRYPTADOS eSIM?",
    answer:
      "Sí. Nuestra eSIM encripta tu tráfico y protege tu identidad, ofreciendo conexiones privadas y anónimas en redes móviles.",
  },
  {
    id: "help",
    question: "¿Qué debo hacer si necesito ayuda con mi eSIM?",
    answer:
      "Puedes contactar a nuestro equipo de soporte desde la app o el chat del sitio web. Te ayudaremos con la activación, configuración y uso de tu eSIM.",
  },
];

type AccordionProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItem: React.FC<AccordionProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="rounded-[16px] bg-white px-5 py-4 md:px-6 md:py-5 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4"
      >
        <span className="text-left text-[14px] md:text-[15px] font-medium text-[#111827]">
          {item.question}
        </span>
        <span
          className={`
            inline-flex h-6 w-6 items-center justify-center
            rounded-full bg-[#F3F4F6]
            transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <svg
            viewBox="0 0 20 20"
            className="h-3 w-3 text-[#4B5563]"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 text-[13px] md:text-[14px] leading-relaxed text-[#4B5563]">
          {item.answer}
        </div>
      )}
    </div>
  );
};

const FaqSims: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("devices");

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto w-[1276px] max-w-full px-4 md:px-8">
        {/* Título */}
        <h2
          className="
            mb-10
            text-center
            text-[26px] md:text-[32px]
            font-semibold
            bg-gradient-to-r from-[#35CDFB] to-[#000000]
            bg-clip-text text-transparent
          "
        >
          Preguntas frecuentes
        </h2>

        {/* Grid FAQ */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <div className="space-y-4 md:space-y-5">
            {leftColumn.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>

          <div className="space-y-4 md:space-y-5">
            {rightColumn.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSims;
