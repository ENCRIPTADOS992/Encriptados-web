// src/providers/ModalPaymentProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Mode = "new_user" | "roning_code" | "recharge" | "sim";

export interface ProductVariant {
  id: number;
  price: number;
  sku: string;
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
  /** URL de origen para compartir (se captura automáticamente al abrir el modal) */
  sourceUrl?: string;
  /** Variantes disponibles para productos con múltiples precios */
  variants?: ProductVariant[];
  /** ID de la variante seleccionada (para productos con múltiples licencias) */
  variantId?: number;
  /** Tipo de producto del backend (Fisico/Digital) para derivar URL correcta */
  typeProduct?: string;
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

  useEffect(() => {
    console.log("💠 [Provider] isModalOpen cambió a:", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    console.log("💠 [Provider] params son ahora:", params);
  }, [params]);


  const openModal = (newParams?: ModalPaymentParams) => {
        console.log("💠 [Provider] openModal() llamado con:", newParams);
    // Capturar la URL de origen si no se proporciona
    const sourceUrl = newParams?.sourceUrl || (typeof window !== 'undefined' ? window.location.href : '');
    setParams(prev => ({ ...prev, ...(newParams ?? {}), sourceUrl }));
    setIsModalOpen(true);
  };
  const closeModal = () => {
        console.log("💠 [Provider] closeModal() llamado");
    setIsModalOpen(false);
    setParams({});
  };

  return (
    <ModalPaymentContext.Provider value={{ isModalOpen, openModal, closeModal, params }}>
      {children}
    </ModalPaymentContext.Provider>
  );
};

export const useModalPayment = (): ModalPaymentContextProps => {
  const context = useContext(ModalPaymentContext);
  if (!context) throw new Error("useModalPayment debe usarse dentro de ModalPaymentProvider");
  return context;
};
