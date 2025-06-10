"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const ThreemaFAQ = () => {
  const t = useTranslations("ThreemaPage.faq");

  const faqs = t.raw("questions") as {
    question: string;
    answer: string;
  }[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-10 px-4 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-black font-bold text-2xl mb-8">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-4">
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
      </div>
    </section>
  );
};

export default ThreemaFAQ;
