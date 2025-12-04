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
    <section className="w-full bg-white flex flex-col items-center py-8 px-0 block sm:hidden mt-[40px]">
      <h2 className="text-[20px] font-bold text-[#101010] text-center mb-6">
        {title}
      </h2>
      <div className="flex flex-col gap-[6px] w-full items-center mt-[20px]" style={{ maxWidth: 374 }}>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="w-full"
            style={{ maxWidth: 374 }}
          >
            <button
              className={`
                flex justify-between items-center w-full
                bg-[#F9F9F9] border border-[#F1F1F1]
                rounded-[14px] px-[16px] py-[10px]
                min-h-[84px] transition-shadow duration-200
                ${openIndex === idx ? "shadow-lg" : ""}
              `}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-mobile-${idx}`}
              style={{
                height: 84,
              }}
            >
              <span className="text-[16px] font-medium text-[#101010] text-left pr-3">
                {faq.question}
              </span>
              <span
                className={`transition-transform duration-200 text-[#101010]`}
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
                id={`faq-answer-mobile-${idx}`}
                className="px-5 pb-3 pt-2 text-[14px] text-[#101010] opacity-80"
                style={{
                  background: "#F9F9F9",
                  borderBottomLeftRadius: 14,
                  borderBottomRightRadius: 14,
                  maxWidth: 374,
                }}
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
