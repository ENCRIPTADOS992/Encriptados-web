// src/shared/components/TelegramButton.tsx
"use client";

import React from "react";
import { useLocale } from "next-intl";
import TelegramIcon from "@/shared/svgs/TelegramIcon";

const TelegramButton = () => {
  const locale = useLocale();

  const urls = {
    en: "https://t.me/encriptados_english",
    es: "https://t.me/Encriptadosio",
    fr: "https://t.me/encriptados_francais",
  };

  const telegramUrl = urls[locale as keyof typeof urls] || urls.en;

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#12b4e7] hover:bg-[#0da8d8] text-white py-2 px-6 rounded-full transition-all duration-200 whitespace-nowrap min-w-[220px] justify-center"
    >
      <TelegramIcon className="w-5 h-5 text-white" />
      Chatear Telegram
    </a>
  );
};

export default TelegramButton;
