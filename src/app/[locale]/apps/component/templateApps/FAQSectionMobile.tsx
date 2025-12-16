import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionMobileProps {
  title?: string;
  faqs: FAQItem[];
}

const FAQSectionMobile: React.FC<FAQSectionMobileProps> = ({
  title = "Preguntas frecuentes",
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white flex flex-col items-center py-12 px-4 sm:hidden">
      <h2 className="text-[30px] leading-[1.4] font-bold text-[#333333] text-center mb-6">
        {title}
      </h2>
      <div className="flex flex-col gap-4 w-full max-w-[430px] mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="w-full">
            <button
              className={`flex justify-between items-center w-full bg-[#F9F9F9] border border-[#F1F1F1] rounded-xl px-6 py-4 min-h-[84px] transition-shadow duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${openIndex === idx ? "shadow-lg" : ""}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-mobile-${idx}`}
              aria-label={`Pregunta: ${faq.question}`}
            >
              <span className="text-[22px] leading-[1.5] font-medium text-[#333333] text-left pr-3">
                {faq.question}
              </span>
              <span className="transition-transform duration-200 text-[#333333] flex items-center" style={{ transform: openIndex === idx ? "rotate(180deg)" : "none" }}>
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
              <div id={`faq-answer-mobile-${idx}`} className="px-6 pb-4 pt-3 text-base leading-relaxed text-[#555555] bg-[#F9F9F9] rounded-b-xl">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSectionMobile;
