"use client";

import React from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import { usePathname } from "next/navigation";
import TelegramIcon from "@/shared/svgs/TelegramIcon";

/**
 * TelegramFloatingButton
 * 
 * Botón flotante premium para soporte vía Telegram.
 * Estilizado completamente con Tailwind CSS para máxima velocidad y compatibilidad.
 * Se oculta automáticamente si la web se abre dentro de la App Móvil.
 */
export default function TelegramFloatingButton() {
  const { isFromAppMobile } = useAppMobile();
  const pathname = usePathname();

  // Ocultar si viene de la app móvil o estamos en la página de términos de la app
  const shouldHide = isFromAppMobile || pathname?.includes("terms-app");

  if (shouldHide) return null;

  return (
    <a
      href="https://t.me/encriptados"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-4 md:right-6 z-[999999] flex items-center justify-start bg-[#24a1de] hover:bg-[#1f8ec4] text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out p-3 w-12 h-12 hover:w-36 overflow-hidden select-none cursor-pointer font-sans"
      aria-label="Telegram Support"
    >
      {/* Icono de Telegram */}
      <div className="flex items-center justify-center w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <TelegramIcon className="w-6 h-6 text-white" />
      </div>
      
      {/* Texto expansivo al hacer Hover */}
      <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2.5 transition-all duration-300 ease-in-out font-bold text-sm tracking-wide uppercase whitespace-nowrap overflow-hidden text-white font-sans">
        Telegram
      </span>
    </a>

  );
}
