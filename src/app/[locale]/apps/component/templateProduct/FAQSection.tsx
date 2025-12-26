import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Preguntas frecuentes",
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
<section className="w-full hidden lg:flex flex-col items-center bg-white py-16 md:py-20 lg:py-24">
      <h2 className="text-h2 text-[#333333] text-center mb-12">
        {title}
      </h2>
      <div className="w-full max-w-[1060px] flex flex-col gap-4 px-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#F9F9F9] rounded-xl px-6 py-5 flex flex-col"
          >
            <button
              className="w-full flex justify-between items-center text-left focus:outline-none rounded-lg p-2"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              aria-label={`Pregunta: ${faq.question}`}
            >
              <span className="text-h5 text-[#333333]">
                {faq.question}
              </span>
              <span
                className={`transform transition-transform duration-200 text-[#101010] text-2xl ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              >
                <svg
                  width={18}
                  height={12}
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
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
            {openIndex === idx && (
              <div
                id={`faq-answer-${idx}`}
                className="mt-4 text-base leading-relaxed text-[#555555]"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
