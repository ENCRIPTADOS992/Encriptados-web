"use client";

import React, { useState, useEffect } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import { usePathname } from "next/navigation";
import TelegramIcon from "@/shared/svgs/TelegramIcon";

type StickyBannerAnchor = {
  bottom: number;
  right: number;
  width: number;
  height: number;
};

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
  const [hasStickyBanner, setHasStickyBanner] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stickyBannerAnchor, setStickyBannerAnchor] = useState<StickyBannerAnchor | null>(null);

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
      const existsMenu = !!document.getElementById("floating-nav-menu");
      setHasFloatingMenu(existsMenu);

      const existsBanner = !!document.getElementById("sticky-price-banner");
      setHasStickyBanner(existsBanner);
    };

    // Verificación inicial
    checkFloatingMenu();

    // Listener para eventos que pueden alterar la visibilidad del menú
    window.addEventListener("scroll", checkFloatingMenu, { passive: true });

    // Usar MutationObserver en vez de setInterval para detectar cambios en el DOM
    const observer = new MutationObserver(checkFloatingMenu);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", checkFloatingMenu);
      observer.disconnect();
    };
  }, [shouldHide]);

  useEffect(() => {
    if (shouldHide) return;

    const updateStickyBannerAnchor = () => {
      if (typeof window === "undefined") return;

      if (window.innerWidth < 1024) {
        setStickyBannerAnchor(null);
        return;
      }

      const banner = document.getElementById("sticky-price-banner");
      const ctaButton = banner?.querySelector("button");

      if (!banner || !(ctaButton instanceof HTMLElement)) {
        setStickyBannerAnchor(null);
        return;
      }

      const bannerRect = banner.getBoundingClientRect();
      const rect = ctaButton.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0 || bannerRect.height <= 0) {
        setStickyBannerAnchor(null);
        return;
      }

      const gap = 14;
      setStickyBannerAnchor({
        bottom: Math.max(window.innerHeight - bannerRect.top + gap, 24),
        right: Math.max(window.innerWidth - bannerRect.right, 24),
        width: rect.width,
        height: rect.height,
      });
    };

    updateStickyBannerAnchor();

    window.addEventListener("resize", updateStickyBannerAnchor);
    window.addEventListener("scroll", updateStickyBannerAnchor, { passive: true });

    const observer = new MutationObserver(updateStickyBannerAnchor);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener("resize", updateStickyBannerAnchor);
      window.removeEventListener("scroll", updateStickyBannerAnchor);
      observer.disconnect();
    };
  }, [hasStickyBanner, shouldHide]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCollapsed(true);
  };

  if (shouldHide) return null;

  const useDesktopBannerAnchor = !!stickyBannerAnchor;
  const floatingStyle = useDesktopBannerAnchor
    ? {
        bottom: `${stickyBannerAnchor.bottom}px`,
        right: `${stickyBannerAnchor.right}px`,
        width: `${stickyBannerAnchor.width}px`,
        height: `${stickyBannerAnchor.height}px`,
      }
    : undefined;

  return (
    <a
      href="https://t.me/encriptados"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${
        useDesktopBannerAnchor
          ? "bottom-0"
          : hasStickyBanner 
          ? "bottom-[185px]" 
          : hasFloatingMenu 
            ? "bottom-36" 
            : "bottom-24"
      } ${
        useDesktopBannerAnchor
          ? "md:bottom-0"
          : hasFloatingMenu ? "md:bottom-24" : "md:bottom-20"
      } ${useDesktopBannerAnchor ? "right-0 md:right-0" : "right-4 md:right-6"} z-[999999] flex items-center justify-center bg-[#10b4e7] hover:bg-[#0e9bc9] text-white rounded-full shadow-[0_8px_25px_rgba(16,180,231,0.35)] hover:shadow-[0_10px_30px_rgba(16,180,231,0.5)] transition-all duration-500 ease-in-out select-none cursor-pointer font-sans hover:scale-105 active:scale-95 ${
        isCollapsed 
          ? "w-[44px] h-[44px] md:w-16 md:h-16 lg:w-14 lg:h-14 p-0" 
          : useDesktopBannerAnchor
            ? "px-4 md:px-5"
            : "w-[144px] h-[44px] md:w-52 md:h-16 lg:w-44 lg:h-14 px-4"
      }`}
      style={floatingStyle}
      aria-label="Telegram Support"
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* Icono de Telegram (siempre a la izquierda si está abierto, centrado si está cerrado) */}
        <div className={`flex items-center justify-center w-5 h-5 md:w-8 md:h-8 lg:w-7 lg:h-7 flex-shrink-0 transition-all duration-500`}>
          <TelegramIcon className="w-5 h-5 md:w-8 md:h-8 lg:w-7 lg:h-7 text-white" />
        </div>
        
        {/* Texto CHATEAR */}
        <span className={`font-semibold text-sm md:font-semibold md:text-base lg:text-base text-white font-sans transition-all duration-500 overflow-hidden whitespace-nowrap ${
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
              : "w-4 h-4 md:w-6 md:h-6 lg:w-5 lg:h-5 opacity-100 ml-2.5"
          }`}
          aria-label="Close telegram button"
        >
          <svg className="w-2 h-2 md:w-3 md:h-3 lg:w-2.5 lg:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </a>
  );
}
