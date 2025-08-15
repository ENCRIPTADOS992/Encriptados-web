// src/shared/components/ModalPayment/ModalPayment.tsx
"use client";

import React, { useEffect } from "react";

type Props = {
  onClose?: () => void;
  visible?: boolean;
  children?: React.ReactNode;
  theme?: "light" | "dark";
  /** Clases extra para el panel (card) */
  panelClassName?: string;
  /** Clases extra para el overlay */
  overlayClassName?: string;
};

const ModalPayment: React.FC<Props> = ({
  onClose = () => {},
  visible = false,
  children,
  theme = "light",
  panelClassName,
  overlayClassName,
}) => {
  // Cerrar con ESC y bloquear scroll del body
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
                  ${isDark ? "bg-black/70" : "bg-black/50"} 
                  backdrop-blur-sm ${overlayClassName ?? ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full h-full flex items-center justify-center px-2 sm:px-3 ipad:px-4">
        <div
          className={
            [
              // MOBILE: estilo hoja (full height), sin bordes
              "relative w-full h-full max-h-screen overflow-auto rounded-none p-3",
              // Tema
              isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900",
              // iPad (744px): card compacta
              "ipad:rounded-2xl ipad:h-auto ipad:p-4 ipad:max-w-[560px]",
              // Desktop: card más ancha
              "lg:max-w-[820px] lg:p-6",
              // Animación de entrada
              "translate-y-2 opacity-0 animate-[fadeInUp_160ms_ease-out_forwards]",
              // Permite sobreescribir desde fuera
              panelClassName ?? "",
            ].join(" ")
          }
        >
          {/* botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 w-8 h-8 grid place-items-center rounded-full hover:bg-black/10"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {children}
        </div>
      </div>

      {/* keyframes inline para asegurar disponibilidad */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ModalPayment;
