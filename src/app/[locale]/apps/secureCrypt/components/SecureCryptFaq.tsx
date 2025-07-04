"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const SecureMdmFaq = () => {
  const t = useTranslations("SecureCryptPage.faq");

  const faqs = t.raw("questions") as { question: string; answer: string }[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full flex justify-center py-16 bg-white">
      <div className="w-[1058px] flex flex-col items-center">
        <h2 className="font-inter font-bold text-[34px] leading-[100%] text-black mb-[40px] w-[361px] h-[41px] text-center">
          {t("title")}
        </h2>
        <div className="flex flex-col gap-[14px] w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-[1058px] min-h-[84px] bg-[#F9F9F9] rounded-[8px] border border-[#F1F1F1] cursor-pointer transition-all"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center justify-between w-full h-[84px] px-[34px]">
                <h3
                  className={`font-inter text-black transition-all duration-200
        ${
          openIndex === index
            ? "font-normal text-[24px] leading-[100%] max-w-[703px]"
            : "font-bold text-[24px]"
        }`}
                >
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-black transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openIndex === index && (
                <div className="w-full px-[34px] pb-4">
                  <p className="font-inter text-[16px] text-black opacity-60 pt-2">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecureMdmFaq;
