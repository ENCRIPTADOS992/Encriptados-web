// src/app/[locale]/tim-sim/components/TimSimFaq.tsx
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import FAQSection, { FAQItem } from "@/shared/components/FAQ/FAQSection";

const TimSimFaq: React.FC = () => {
  const t = useTranslations('BneSimPage.faqs');

  const faqs: FAQItem[] = [
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

  const title = t('title');
  const highlightWord = title.split(' ').slice(1).join(' '); // "frecuentes"

  return (
    <FAQSection
      title={title}
      faqs={faqs}
      highlightWord={highlightWord}
      layout="double"
      bgColor="bg-[#F4F8FA]"
    />
  );
};

export default TimSimFaq;
export { TimSimFaq as FaqsBne };
