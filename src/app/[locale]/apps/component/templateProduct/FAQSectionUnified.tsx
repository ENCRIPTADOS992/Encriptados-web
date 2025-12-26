"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

/**
 * FAQSection - Componente unificado y responsive
 * Acordeón accesible con animación
 */
const FAQSectionUnified: React.FC<FAQSectionProps> = ({
  title = "Preguntas frecuentes",
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8 lg:mb-12">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left p-5 lg:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-base lg:text-lg font-medium text-gray-800 pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  
                  <svg
                    width={18}
                    height={12}
                    viewBox="0 0 18 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1.5L9 10.5L17 1.5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 lg:px-6 lg:pb-6 text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSectionUnified;
