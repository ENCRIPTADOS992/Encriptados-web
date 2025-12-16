// src/shared/components/TelegramButton.tsx
import React from "react";
import TelegramIcon from "@/shared/svgs/TelegramIcon";

interface TelegramButtonProps {
  className?: string;
}

const TelegramButton: React.FC<TelegramButtonProps> = ({ className = "" }) => {
  const telegramUrl = "https://t.me/encriptados";

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 bg-[#12b4e7] hover:bg-[#0da8d8] text-white py-3 px-6 rounded-full transition-all duration-200 whitespace-nowrap min-w-[220px] justify-center text-base font-bold
        ${className}
      `}
    >
      <TelegramIcon className="w-5 h-5 text-white" />
      Chatear Telegram
    </a>
  );
};

export default TelegramButton;
