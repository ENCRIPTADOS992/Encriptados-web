// src/shared/components/ModalPayment/ModalPayment.tsx
"use client";

import React, { useEffect } from "react";

type Props = {
  onClose?: () => void;
  visible?: boolean;
  children?: React.ReactNode;
  theme?: "light" | "dark";
  panelClassName?: string;
  overlayClassName?: string;
};

function useIsMobile(maxWidth = 744) {
  const getMatch = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width:${maxWidth - 1}px)`).matches;
  };

  const [isMobile, setIsMobile] = React.useState(getMatch);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width:${maxWidth - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // set inicial por si cambió antes
    setIsMobile(mq.matches);

    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler); // legacy

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler); // legacy
    };
  }, [maxWidth]);

  return isMobile;
}

const ModalPayment: React.FC<Props> = ({
  onClose = () => {},
  visible = false,
  children,
  theme = "light",
  panelClassName,
  overlayClassName,
}) => {
  // Cerrar con ESC y bloquear scroll del body
  // ✅ Llama SIEMPRE los hooks
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

const isDark = theme === "dark";
const isMobile = useIsMobile(744);  

if (!visible) return null;         


  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        isMobile ? "items-end" : "items-center"
      } justify-center
      ${isDark ? "bg-black/70" : "bg-black/50"} backdrop-blur-sm ${overlayClassName ?? ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full h-full flex ${isMobile ? "items-end" : "items-center"} justify-center px-2 sm:px-3 ipad:px-4`}>
        {/* ======= MOBILE: Bottom Sheet ======= */}
        {isMobile ? (
          <div
            className={[
              "relative w-full h-[60vh] max-h-[75vh] rounded-t-2xl rounded-b-none overflow-hidden p-3 shadow-2xl",
              isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900",
              "translate-y-2 opacity-0 animate-[fadeInUp_160ms_ease-out_forwards]",
              panelClassName ?? "",
            ].join(" ")}
          >
            {/* Handle visual */}
            <div aria-hidden="true" className="mx-auto mt-1 mb-2 h-1.5 w-10 rounded-full bg-black/20" />

            {/* Botón cerrar (ligeramente hacia dentro) */}
            <button
              onClick={onClose}
              className="absolute top-0.5 right-1 w-8 h-8 grid place-items-center rounded-full hover:bg-black/10"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Área scrolleable interna */}
            <div className="max-h-full overflow-auto [scrollbar-gutter:stable]">
              {children}
            </div>
          </div>
        ) : (
          /* ======= IPAD / DESKTOP: SIN TOCAR tu layout ======= */
          <div
            className={[
              "relative w-full h-full max-h-screen overflow-auto rounded-none p-3",
              isDark ? "bg-white/0 text-zinc-100" : "bg-white text-zinc-900", // respeta tema
              "ipad:rounded-2xl ipad:h-auto ipad:p-4 ipad:max-w-[560px]",
              "lg:max-w-[820px] lg:p-6",
              "translate-y-2 opacity-0 animate-[fadeInUp_160ms_ease-out_forwards]",
              panelClassName ?? "",
            ].join(" ")}
          >
            <button
              onClick={onClose}
              className="absolute top-0.5 right-0.5 w-8 h-8 grid place-items-center rounded-full hover:bg-black/10"
              aria-label="Cerrar"
            >
              ✕
            </button>
            {children}
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ModalPayment;
