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
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Ocultar si viene de la app móvil o estamos en las páginas de la app
  const shouldHide =
    isFromAppMobile ||
    pathname?.includes("terms-app") ||
    pathname?.includes("privacy-app") ||
    pathname?.includes("cookies-app");

  // Siempre inicia expandido al cargar la página
  useEffect(() => {
    setIsCollapsed(false);
  }, []);

  useEffect(() => {
    if (shouldHide) return;

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
  }, [shouldHide]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCollapsed(true);
  };

  if (shouldHide) return null;

  return (
    <a
      href="https://t.me/encriptados"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${
        hasFloatingMenu ? "bottom-36 md:bottom-24" : "bottom-24 md:bottom-20"
      } right-4 md:right-6 z-[999999] flex items-center justify-center bg-[#10b4e7] hover:bg-[#0e9bc9] text-white rounded-full shadow-[0_8px_25px_rgba(16,180,231,0.35)] hover:shadow-[0_10px_30px_rgba(16,180,231,0.5)] transition-all duration-500 ease-in-out select-none cursor-pointer font-sans hover:scale-105 active:scale-95 ${
        isCollapsed 
          ? "w-14 h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 p-0" 
          : "w-44 h-14 md:w-52 md:h-16 lg:w-44 lg:h-14 px-4"
      }`}
      aria-label="Telegram Support"
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* Icono de Telegram (siempre a la izquierda si está abierto, centrado si está cerrado) */}
        <div className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-7 lg:h-7 flex-shrink-0 transition-all duration-500`}>
          <TelegramIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-7 lg:h-7 text-white" />
        </div>
        
        {/* Texto CHATEAR */}
        <span className={`font-extrabold text-base md:text-lg lg:text-base tracking-wider text-white font-sans transition-all duration-500 overflow-hidden whitespace-nowrap ${
          isCollapsed ? "w-0 opacity-0 m-0" : "w-auto opacity-100 ml-2"
        }`}>
          Chatear
        </span>

        {/* Botón de Cerrar (X) */}
        <button
          onClick={handleClose}
          className={`flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white/90 hover:text-white flex-shrink-0 transition-all duration-500 ${
            isCollapsed 
              ? "w-0 h-0 opacity-0 p-0 pointer-events-none ml-0" 
              : "w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 opacity-100 ml-2.5"
          }`}
          aria-label="Close telegram button"
        >
          <svg className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </a>
  );
}
