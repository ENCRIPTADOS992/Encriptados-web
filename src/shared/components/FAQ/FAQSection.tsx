"use client";

import React, { useState } from "react";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  highlightWord?: string; // Palabra del título que se resalta en color
  layout?: "single" | "double"; // Layout de una o dos columnas
  bgColor?: string;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Preguntas frecuentes",
  faqs,
  highlightWord,
  layout = "single",
  bgColor = "bg-white",
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const renderTitle = () => {
    if (!title) return null;
    
    if (!highlightWord) {
      return <span>{title}</span>;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#19BBFF]">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  const renderFAQItem = (faq: FAQItem, idx: number) => {
    const isOpen = openIndex === idx;

    return (
      <div
        key={idx}
        className="bg-[#F9F9F9] rounded-xl px-6 py-5 flex flex-col"
      >
        <button
          className="w-full flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
          onClick={() => setOpenIndex(isOpen ? null : idx)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${idx}`}
          aria-label={`Pregunta: ${faq.question}`}
        >
          <span className="text-[22px] font-medium text-[#333333] leading-[1.5]">
            {faq.question}
          </span>
          <span className="transform transition-transform duration-200 text-[#101010] text-2xl">
            <svg
              width={18}
              height={12}
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              style={{ minWidth: 18, minHeight: 12 }}
            >
              <path
                d="M1 1.5L9 10.5L17 1.5"
                stroke="#283A06"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {isOpen && (
          <div
            id={`faq-answer-${idx}`}
            className="mt-4 text-base text-[#555555] leading-relaxed"
          >
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  const renderSingleColumn = () => (
    <div className="w-full max-w-[1060px] flex flex-col gap-4 px-4 mx-auto">
      {faqs.map(renderFAQItem)}
    </div>
  );

  const renderDoubleColumn = () => {
    const midPoint = Math.ceil(faqs.length / 2);
    const leftColumn = faqs.slice(0, midPoint);
    const rightColumn = faqs.slice(midPoint);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="space-y-3">
          {leftColumn.map((faq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-label={`Pregunta: ${faq.question}`}
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
                  {faq.question}
                </span>
                <span className="text-lg text-[#9CA3AF]">
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </div>
              {openIndex === idx && (
                <p className="mt-3 text-xs md:text-sm text-[#4B5563] leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {rightColumn.map((faq, idx) => {
            const actualIdx = idx + midPoint;
            return (
              <button
                key={actualIdx}
                type="button"
                onClick={() => setOpenIndex(openIndex === actualIdx ? null : actualIdx)}
                aria-expanded={openIndex === actualIdx}
                aria-label={`Pregunta: ${faq.question}`}
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
                    {faq.question}
                  </span>
                  <span className="text-lg text-[#9CA3AF]">
                    {openIndex === actualIdx ? "▲" : "▼"}
                  </span>
                </div>
                {openIndex === actualIdx && (
                  <p className="mt-3 text-xs md:text-sm text-[#4B5563] leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className={`w-full flex flex-col items-center ${bgColor} py-16 md:py-20 lg:py-24 ${className}`}>
      {title && (
        <h2 className="text-[38px] font-bold text-[#333333] text-center mb-12 leading-[1.3]">
          {renderTitle()}
        </h2>
      )}
      {layout === "double" ? (
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 w-full">
          {renderDoubleColumn()}
        </div>
      ) : (
        renderSingleColumn()
      )}
    </section>
  );
};

export default FAQSection;
