"use client";

import React, { useState, useEffect } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import { usePathname } from "next/navigation";
import TelegramIcon from "@/shared/svgs/TelegramIcon";

/**
 * TelegramFloatingButton
 * 
 * Botón flotante premium para soporte vía Telegram.
 * Estilizado completamente con Tailwind CSS para máxima velocidad y compatibilidad.
 * Se oculta automáticamente si la web se abre dentro de la App Móvil.
 * Cambia dinámicamente de posición en móvil si el menú inferior flotante está activo.
 */
export default function TelegramFloatingButton() {
  const { isFromAppMobile } = useAppMobile();
  const pathname = usePathname();
  const [hasFloatingMenu, setHasFloatingMenu] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Ocultar si viene de la app móvil o estamos en la página de términos de la app
  const shouldHide = isFromAppMobile || pathname?.includes("terms-app");

  useEffect(() => {
    // Verificar si el usuario ya lo cerró en esta sesión
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("telegram-button-dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (shouldHide || isDismissed) return;

    const checkFloatingMenu = () => {
      const exists = !!document.getElementById("floating-nav-menu");
      setHasFloatingMenu(exists);
    };

    // Verificación inicial
    checkFloatingMenu();

    // Listener para eventos que pueden alterar la visibilidad del menú
    window.addEventListener("scroll", checkFloatingMenu, { passive: true });
    
    // Intervalo de seguridad para capturar cambios reactivos de estado
    const interval = setInterval(checkFloatingMenu, 300);

    return () => {
      window.removeEventListener("scroll", checkFloatingMenu);
      clearInterval(interval);
    };
  }, [shouldHide, isDismissed]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("telegram-button-dismissed", "true");
    }
  };

  if (shouldHide || isDismissed) return null;

  return (
    <a
      href="https://t.me/encriptados"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${
        hasFloatingMenu ? "bottom-36 md:bottom-24" : "bottom-24 md:bottom-20"
      } right-4 md:right-6 z-[999999] flex items-center justify-center gap-2.5 bg-[#24a1de] hover:bg-[#1f8ec4] text-white rounded-full shadow-[0_8px_25px_rgba(36,161,222,0.35)] hover:shadow-[0_10px_30px_rgba(36,161,222,0.5)] transition-all duration-300 ease-in-out pl-5 pr-3 h-14 md:h-16 select-none cursor-pointer font-sans hover:scale-105 active:scale-95`}
      aria-label="Telegram Support"
    >
      {/* Icono de Telegram */}
      <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 flex-shrink-0 transition-transform duration-300">
        <TelegramIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>
      
      {/* Texto CHATEAR siempre visible */}
      <span className="font-extrabold text-base md:text-lg tracking-wider uppercase text-white font-sans">
        Chatear
      </span>

      {/* Botón de Cerrar (X) */}
      <button
        onClick={handleClose}
        className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/15 hover:bg-white/30 text-white/90 hover:text-white transition-all ml-1 flex-shrink-0"
        aria-label="Close telegram button"
      >
        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </a>
  );
}
