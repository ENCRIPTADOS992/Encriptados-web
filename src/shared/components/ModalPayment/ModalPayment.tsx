"use client";

import React, { useEffect, useRef } from "react";

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
  const panelRef = useRef<HTMLDivElement | null>(null);

  console.log("[ModalPayment] render", {
    visible,
    theme,
    hasChildren: !!children,
  });

  useEffect(() => {
    if (!visible) return;

    console.log("[ModalPayment] useEffect(visible) ON");

    const onKey = (e: KeyboardEvent) => {
      console.log("[ModalPayment] keydown", e.key);
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    console.log("[ModalPayment] body overflow cambiado", {
      prev,
      now: document.body.style.overflow,
    });

    return () => {
      console.log("[ModalPayment] cleanup visible OFF");
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible) return;
    if (typeof window === "undefined") return;

    const logLayout = (label: string) => {
      if (!panelRef.current) {
        console.log(`[ModalPayment] ${label} → panelRef NULL`);
        return;
      }

      const rect = panelRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
      const scrollHeight = panelRef.current.scrollHeight;
      const clientHeight = panelRef.current.clientHeight;

      console.log(`[ModalPayment] layout (${label})`, {
        viewportW,
        viewportH,
        rect: {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
        },
        panel: {
          scrollHeight,
          clientHeight,
          offsetHeight: panelRef.current.offsetHeight,
        },
      });
    };

    logLayout("mount");
    const t = setTimeout(() => logLayout("after-timeout-150ms"), 150);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) {
    console.log("[ModalPayment] visible = false → no render");
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
        "fixed inset-0 z-50",
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
            console.log("[ModalPayment] botón cerrar clic");
            onClose();
          }}
          className="absolute top-2 right-2 w-8 h-8 grid place-items-center rounded-full hover:bg-black/10 transition-colors z-10"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {children}
      </div>

    </div>
  );
};

export default ModalPayment;
