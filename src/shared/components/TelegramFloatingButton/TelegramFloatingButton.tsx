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

  // Ocultar si viene de la app móvil o estamos en la página de términos de la app
  const shouldHide = isFromAppMobile || pathname?.includes("terms-app");

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

  if (shouldHide) return null;

  return (
    <a
      href="https://t.me/encriptados"
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed ${
        hasFloatingMenu ? "bottom-20 md:bottom-6" : "bottom-6"
      } right-4 md:right-6 z-[999999] flex items-center justify-start bg-[#24a1de] hover:bg-[#1f8ec4] text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out p-3 w-12 h-12 hover:w-36 overflow-hidden select-none cursor-pointer font-sans`}
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
