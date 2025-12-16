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
    <section className="w-full bg-white py-16 px-4 hidden flex-col items-center sm:flex lg:hidden">
      <h2 className="text-[38px] leading-[1.3] font-bold text-[#333333] text-center mb-8">
        {title}
      </h2>
      <div className="w-full max-w-[713px] flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#F9F9F9] rounded-xl flex flex-col p-6 min-h-[84px]">
            <button
              className="w-full flex items-center justify-between text-left focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              aria-label={`Pregunta: ${faq.question}`}
            >
              <span className="block flex-1 text-[22px] leading-[1.5] font-medium text-[#333333]">
                {faq.question}
              </span>
              <span className={`transform transition-transform duration-200 text-[#333333] ml-4 ${openIndex === idx ? "rotate-180" : ""}`}>
                <svg
                  width={18}
                  height={12}
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ minWidth: 18, minHeight: 12 }}
                  aria-hidden="true"
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
              <div id={`faq-answer-${idx}`} className="mt-4 text-base leading-relaxed text-[#555555]">
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
