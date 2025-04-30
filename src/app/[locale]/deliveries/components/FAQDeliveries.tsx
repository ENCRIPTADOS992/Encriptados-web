"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "¿Cómo encuentro un distribuidor?",
    answer: "Puedes usar nuestro mapa interactivo para localizar el distribuidor más cercano.",
  },
  {
    question: "¿Cuánto tarda la entrega?",
    answer: "El tiempo de entrega depende de tu ubicación y del distribuidor seleccionado.",
  },
  {
    question: "¿Puedo cambiar mi pedido después de confirmarlo?",
    answer: "Depende del distribuidor. Te recomendamos contactarlo directamente.",
  },
];

const FAQDeliveries = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4 text-left">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full font-semibold text-lg"
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQDeliveries;
