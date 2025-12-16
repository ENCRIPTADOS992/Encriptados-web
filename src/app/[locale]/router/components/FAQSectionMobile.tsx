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
      <h2 className="text-[30px] font-bold text-[#333333] text-center mb-8 leading-[1.3]">
        {title}
      </h2>
      <div className="flex flex-col gap-3 w-full max-w-[430px]">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#F9F9F9] rounded-xl px-6 py-5 w-full"
          >
            <button
              className="flex justify-between items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-mobile-${idx}`}
              aria-label={`Toggle answer for: ${faq.question}`}
            >
              <span className="text-[22px] font-medium text-[#333333] text-left pr-4 leading-[1.5]">
                {faq.question}
              </span>
              <span
                className={`transition-transform duration-200 text-[#333333] flex-shrink-0`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  transform: openIndex === idx ? "rotate(180deg)" : "none",
                }}
              >
                <svg
                  width={18}
                  height={12}
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                id={`faq-answer-mobile-${idx}`}
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

export default FAQSectionMobile;
