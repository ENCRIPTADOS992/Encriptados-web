"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "@/shared/components/SectionWrapper";


const SecureMdmFaq = () => {
  const t = useTranslations("SecureCryptPage.faq");
  const faqs = t.raw("questions") as { question: string; answer: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper className="mt-14 py-10 px-5 bg-white">
      <b className="block mx-auto mb-11 text-center text-2xl md:text-[34px]">
        {t("title")}
      </b>

      <div className="flex flex-col gap-4 md:w-3/4 md:mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#F9F9F9] rounded-xl px-6 py-4 cursor-pointer"
            onClick={() => toggleFaq(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-black font-medium text-base">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-black transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === index && (
              <p className="text-gray-600 text-sm mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SecureMdmFaq;
