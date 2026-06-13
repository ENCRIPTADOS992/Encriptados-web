"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type Props = {
  onClose?: () => void;
  visible?: boolean;
  children?: React.ReactNode;
  theme?: "light" | "dark";
  panelClassName?: string;
  overlayClassName?: string;
};

const ModalPayment: React.FC<Props> = ({
  onClose = () => { },
  visible = false,
  children,
  theme = "light",
  panelClassName,
  overlayClassName,
}) => {
  const t = useTranslations("paymentModal");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!visible) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  const isDark = theme === "dark";

  const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Solo cerrar si el click fue directamente en el overlay (fuera del panel)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={[
        "fixed inset-0 z-[200]",
        "flex items-start sm:items-center justify-center",
        "overflow-y-auto overflow-x-hidden",
        "p-0 sm:py-6 sm:px-4",
        isDark ? "bg-black/70" : "bg-black/50",
        "backdrop-blur-sm",
        overlayClassName ?? "",
      ].join(" ")}
      ref={(el) => {
        if (el && visible) {
          // Pequeño timeout para asegurar que el render ocurrió y el foco entra
          setTimeout(() => el.focus(), 50);
        }
      }}
      tabIndex={-1}
      style={{ WebkitOverflowScrolling: "touch", outline: 'none' }}
      onMouseDown={(e) => {
        // Solo procesar si el click fue directamente en el overlay
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className={[
          "relative w-full max-w-[820px]",
          "sm:my-auto",
          isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900",
          "rounded-2xl",
          "shadow-2xl",
          "p-4 sm:p-5 lg:p-6",
          panelClassName ?? "",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-2 right-2 w-8 h-8 grid place-items-center rounded-full hover:bg-black/10 transition-colors z-10"
          aria-label={t("closeModal")}
        >
          ✕
        </button>

        {children}
      </div>

    </div>
  );
};

export default ModalPayment;
