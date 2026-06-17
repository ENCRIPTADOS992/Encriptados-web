// src/providers/ModalPaymentProvider.tsx
"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";

export type Mode = "new_user" | "roning_code" | "recharge" | "sim";

export interface ProductVariant {
  id: number;
  price?: number;
  cost?: number;
  sku?: string;
  name?: string;
  label?: string;
  gb?: string;
  ussd?: string;
  image?: string;
  days?: number;
  minutes?: number;
  minute_price?: number;
  licensetime?: string | number | null;
  currency?: string;
  purchase_url?: string;
  regular_price?: string | number | null;
  sale_price?: string | number | null;
  scope?: { type?: string; code?: string };
  on_sale?: boolean;
  attributes?: { name: string; option: string }[];
}

interface ModalPaymentParams {
  languageCode?: string;
  productid?: string;
  theme?: string;
  mode?: Mode;
  layout?: "default" | "compact";
  selectedOption?: number;
  categoryId?: number | string;
  categoryName?: string;
  provider?: string;
  brand?: string;
  initialPrice?: number;
  /** GB label from URL to pre-select correct data plan (e.g., "5 GB") */
  initialGb?: string;
  /** Region/country for fetching regional pricing (e.g., "Emiratos Árabes Unidos") */
  initialRegion?: string;
  /** URL de origen para compartir (se captura automáticamente al abrir el modal) */
  sourceUrl?: string;
  /** Variantes disponibles para productos con múltiples precios */
  variants?: ProductVariant[];
  /** ID de la variante seleccionada (para productos con múltiples licencias) */
  variantId?: number;
  /** Tipo de producto del backend (Fisico/Digital) para derivar URL correcta */
  typeProduct?: string;
  flagUrl?: string;
  initialRegionCode?: string;
  /** URL del icono/logo del producto para mostrar en el modal de éxito */
  iconUrl?: string;
  /** Detalle de activaciones para Activar Apps, ej: "1 Nro. temporal" */
  initialActivationDetail?: string;
}

interface ModalPaymentContextProps {
  isModalOpen: boolean;
  openModal: (params?: Partial<ModalPaymentParams>) => void;
  closeModal: () => void;
  setMode: (mode: Mode) => void;
  params: ModalPaymentParams;
}

const ModalPaymentContext = createContext<ModalPaymentContextProps | undefined>(undefined);

export const ModalPaymentProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<ModalPaymentParams>({});
  const { appMode } = useAppMobile();

  const openModal = useCallback((newParams?: ModalPaymentParams) => {
    // Interceptar la apertura del checkout si estamos dentro de la App (WebView de React Native)
    // Solo para "user" — "guest" usa el checkout web normal
    if (appMode === "user" && typeof window !== "undefined" && (window as any).ReactNativeWebView) {
      const payload = {
        action: "OPEN_CHECKOUT",
        data: newParams
      };
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(payload));
      return; // Evitar abrir el modal de la web
    }
    const sourceUrl = newParams?.sourceUrl || (typeof window !== 'undefined' ? window.location.href : '');
    setParams(prev => ({ ...prev, ...(newParams ?? {}), sourceUrl }));
    setIsModalOpen(true);
  }, [appMode]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setParams({});
  }, []);

  const setMode = useCallback((mode: Mode) => {
    setParams(prev => {
      if (prev.mode === mode) return prev;
      return { ...prev, mode };
    });
  }, []);

  const value = useMemo(
    () => ({ isModalOpen, openModal, closeModal, setMode, params }),
    [isModalOpen, openModal, closeModal, setMode, params]
  );

  return (
    <ModalPaymentContext.Provider value={value}>
      {children}
    </ModalPaymentContext.Provider>
  );
};

export const useModalPayment = (): ModalPaymentContextProps => {
  const context = useContext(ModalPaymentContext);
  if (!context) throw new Error("useModalPayment debe usarse dentro de ModalPaymentProvider");
  return context;
};
