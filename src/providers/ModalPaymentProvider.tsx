// src/providers/ModalPaymentProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Mode = "new_user" | "roning_code" | "recharge" | "sim";

export interface ProductVariant {
  id: number;
  price?: number;
  cost?: number;
  sku?: string;
  name?: string;
  label?: string;
  gb?: string;
  currency?: string;
  purchase_url?: string;
  regular_price?: string | number;
  sale_price?: string | number;
  scope?: { type?: string; code?: string };
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
}

interface ModalPaymentContextProps {
  isModalOpen: boolean;
  openModal: (params?: Partial<ModalPaymentParams>) => void;
  closeModal: () => void;
  params: ModalPaymentParams;
}

const ModalPaymentContext = createContext<ModalPaymentContextProps | undefined>(undefined);

export const ModalPaymentProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<ModalPaymentParams>({});

  // Debug: Generate a random ID to check for duplicate providers
  const [providerId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    console.log(`💠 [Provider ${providerId}] Mounted`);
    // Expose on window for easy checking
    (window as any).__modalProviderId = providerId;
  }, []);

  useEffect(() => {
    console.log(`💠 [Provider ${providerId}] params updated:`, params);
  }, [params]);

  const openModal = (newParams?: ModalPaymentParams) => {
    console.log(`💠 [Provider ${providerId}] openModal called with:`, newParams);
    const sourceUrl = newParams?.sourceUrl || (typeof window !== 'undefined' ? window.location.href : '');
    setParams(prev => ({ ...prev, ...(newParams ?? {}), sourceUrl }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log(`💠 [Provider ${providerId}] closeModal() called`);
    setIsModalOpen(false);
    setParams({});
  };

  return (
    <ModalPaymentContext.Provider value={{ isModalOpen, openModal, closeModal, params, providerId } as any}>
      {children}
    </ModalPaymentContext.Provider>
  );
};

export const useModalPayment = (): ModalPaymentContextProps => {
  const context = useContext(ModalPaymentContext);
  if (!context) throw new Error("useModalPayment debe usarse dentro de ModalPaymentProvider");
  return context;
};
