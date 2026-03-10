// src/shared/components/TelegramButton.tsx
import React from "react";
import TelegramIcon from "@/shared/svgs/TelegramIcon";
import { useAppMobile } from "@/shared/context/AppMobileContext";

interface TelegramButtonProps {
  className?: string;
}

const TelegramButton: React.FC<TelegramButtonProps> = ({ className = "" }) => {
  const { appMode } = useAppMobile();
  const telegramUrl = "https://t.me/encriptados";

  const isUserMode = appMode === "user";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si estamos en la app y somos "user", enviamos el evento al ReactNativeWebView
    if (isUserMode && typeof window !== "undefined" && (window as any).ReactNativeWebView) {
      e.preventDefault();
      const payload = { action: "OPEN_CHAT" };
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(payload));
    }
  };

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 bg-[#12b4e7] hover:bg-[#0da8d8] text-white py-3 px-4 sm:px-6 rounded-full transition-all duration-200 whitespace-nowrap justify-center text-sm sm:text-base font-bold
        ${className}
      `}
    >
      {!isUserMode && <TelegramIcon className="w-5 h-5 text-white flex-shrink-0" />}
      <span className="hidden sm:inline">{isUserMode ? "Chatear ahora" : "Chatear Telegram"}</span>
      <span className="sm:hidden">{isUserMode ? "Chatear ahora" : "Chat soporte"}</span>
    </a>
  );
};

export default TelegramButton;
