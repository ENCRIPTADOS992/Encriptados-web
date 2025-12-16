// src/app/[locale]/tim-sim/components/TimSimFaq.tsx
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const TimSimFaq: React.FC = () => {
  const t = useTranslations('BneSimPage.faqs');
  const [openId, setOpenId] = useState<string | null>("q1");

  const leftColumn: FaqItem[] = [
    {
      id: "q1",
      question: t('q1.question'),
      answer: t('q1.answer'),
    },
    {
      id: "q2",
      question: t('q2.question'),
      answer: t('q2.answer'),
    },
    {
      id: "q3",
      question: t('q3.question'),
      answer: t('q3.answer'),
    },
  ];

  const rightColumn: FaqItem[] = [
    {
      id: "q4",
      question: t('q4.question'),
      answer: t('q4.answer'),
    },
    {
      id: "q5",
      question: t('q5.question'),
      answer: t('q5.answer'),
    },
    {
      id: "q6",
      question: t('q6.question'),
      answer: t('q6.answer'),
    },
  ];

  const renderItem = (item: FaqItem) => {
    const isOpen = openId === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setOpenId(isOpen ? null : item.id)}
        aria-expanded={isOpen}
        aria-label={`Pregunta: ${item.question}`}
        className="
          w-full text-left
          bg-white
          rounded-[16px]
          shadow-sm
          px-4 md:px-5
          py-3 md:py-4
          transition
          hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-[#19BBFF] focus:ring-offset-2
        "
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm md:text-[15px] font-medium text-[#111827]">
            {item.question}
          </span>
          <span className="text-lg text-[#9CA3AF]">
            {isOpen ? "▲" : "▼"}
          </span>
        </div>

        {isOpen && (
          <p className="mt-3 text-xs md:text-sm text-[#4B5563] leading-relaxed">
            {item.answer}
          </p>
        )}
      </button>
    );
  };

  return (
    <section className="py-12 lg:py-16 bg-[#F4F8FA]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-center text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] mb-8 md:mb-10 text-[#333333]">
          {t('title').split(' ')[0]}{" "}
          <span className="text-[#19BBFF]">{t('title').split(' ').slice(1).join(' ')}</span>
        </h2>

        {/* Grid de FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="space-y-3">{leftColumn.map(renderItem)}</div>
          <div className="space-y-3">{rightColumn.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
};

export default TimSimFaq;
export { TimSimFaq as FaqsBne };
