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
    <section className="w-full bg-white py-8 px-0 hidden flex-col items-center sm:flex lg:hidden mt-[50px]">
      <h2 className="text-[26px] font-bold text-[#101010] text-center mb-7 leading-[100%]">
        {title}
      </h2>
      <div className="w-full max-w-[713px] flex flex-col gap-[14px] mt-[20px]">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#F9F9F9] border border-[#F1F1F1] rounded-[14px] flex flex-col"
            style={{
              padding: "10px 16px",
              minHeight: 84,
            }}
          >
            <button
              className="w-full h-[48px] flex items-center justify-between text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span
                className="block max-w-[458px] text-[16px] font-normal text-black leading-[100%]"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
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
                className="mt-2 text-[14px] text-[#101010] opacity-80"
                style={{
                  lineHeight: "20px",
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

export default FAQSectionTablet;
