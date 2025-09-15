// src/providers/ModalPaymentProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Mode = "new_user" | "roning_code" | "recharge" | "sim";

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
    setParams(prev => ({ ...prev, ...(newParams ?? {}) }));
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
