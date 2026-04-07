// ../../encrypted-sim/components/FaqSims.tsx
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItem: React.FC<AccordionProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="rounded-[16px] bg-white px-5 py-4 md:px-6 md:py-5 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4"
      >
        <span className="text-left text-[14px] md:text-[15px] font-medium text-[#111827]">
          {item.question}
        </span>
        <span
          className={`
            inline-flex h-6 w-6 items-center justify-center
            rounded-full bg-[#F3F4F6]
            transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <svg
            viewBox="0 0 20 20"
            className="h-3 w-3 text-[#4B5563]"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 text-[13px] md:text-[14px] leading-relaxed text-[#4B5563]">
          {item.answer}
        </div>
      )}
    </div>
  );
};

const FaqSims: React.FC = () => {
  const t = useTranslations("EncryptedSimPage.FaqSims");
  const [openId, setOpenId] = useState<string | null>("devices");

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const leftColumn: FaqItem[] = [
    { id: "devices", question: t("leftColumn.devices.question"), answer: t("leftColumn.devices.answer") },
    { id: "places", question: t("leftColumn.places.question"), answer: t("leftColumn.places.answer") },
    { id: "topup", question: t("leftColumn.topup.question"), answer: t("leftColumn.topup.answer") },
    { id: "compatible", question: t("leftColumn.compatible.question"), answer: t("leftColumn.compatible.answer") },
  ];

  const rightColumn: FaqItem[] = [
    { id: "how-works", question: t("rightColumn.howWorks.question"), answer: t("rightColumn.howWorks.answer") },
    { id: "multi-country", question: t("rightColumn.multiCountry.question"), answer: t("rightColumn.multiCountry.answer") },
    { id: "secure", question: t("rightColumn.secure.question"), answer: t("rightColumn.secure.answer") },
    { id: "help", question: t("rightColumn.help.question"), answer: t("rightColumn.help.answer") },
  ];

  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto w-[1276px] max-w-full px-4 md:px-8">
        {/* Título */}
        <h2
          className="
            mb-10
            text-center
            text-[26px] md:text-[32px]
            font-semibold
            bg-gradient-to-r from-[#35CDFB] to-[#000000]
            bg-clip-text text-transparent
          "
        >
          {t("title")}
        </h2>

        {/* Grid FAQ */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          <div className="space-y-4 md:space-y-5">
            {leftColumn.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>

          <div className="space-y-4 md:space-y-5">
            {rightColumn.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSims;
