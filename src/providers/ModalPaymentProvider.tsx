// src/shared/context/ModalPaymentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalPaymentParams {
  languageCode?: string;
  productid?: string;
  theme?: string;
}

interface ModalPaymentContextProps {
  isModalOpen: boolean;
  openModal: (params?: ModalPaymentParams) => void;
  closeModal: () => void;
  params: ModalPaymentParams;
}

const ModalPaymentContext = createContext<ModalPaymentContextProps | undefined>(undefined);

export const ModalPaymentProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<ModalPaymentParams>({});

  const openModal = (newParams?: ModalPaymentParams) => {
    setParams(newParams || {});
    setIsModalOpen(true);
  };
  const closeModal = () => {
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
