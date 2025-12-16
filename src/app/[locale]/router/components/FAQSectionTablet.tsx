import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionTabletProps {
  title?: string;
  faqs: FAQItem[];
}

const FAQSectionTablet: React.FC<FAQSectionTabletProps> = ({
  title = "Preguntas frecuentes",
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-16 px-0 hidden flex-col items-center sm:flex lg:hidden">
      <h2 className="text-[38px] font-bold text-[#333333] text-center mb-12 leading-[1.3]">
        {title}
      </h2>
      <div className="w-full max-w-[713px] flex flex-col gap-4 px-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#F9F9F9] rounded-xl px-6 py-5 flex flex-col"
          >
            <button
              className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              aria-label={`Toggle answer for: ${faq.question}`}
            >
              <span
                className="text-[22px] font-medium text-[#333333] leading-[1.5] pr-4"
              >
                {faq.question}
              </span>
              <span
                className={`transform transition-transform duration-200 text-[#333333] flex-shrink-0 ${
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
                    stroke="#333333"
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
                className="mt-4 text-base text-[#555555] leading-relaxed"
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

export default FAQSectionTablet;
