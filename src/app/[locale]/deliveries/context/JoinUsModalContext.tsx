import React, { createContext, useContext, useState, ReactNode } from "react";

// Definir la interfaz para el contexto
interface JoinUsModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Crear el contexto con un valor inicial
const JoinUsModalContext = createContext<JoinUsModalContextType | undefined>(
  undefined
);

// Definir la interfaz para las propiedades del proveedor
interface JoinUsModalProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const JoinUsModalProvider: React.FC<JoinUsModalProviderProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <JoinUsModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </JoinUsModalContext.Provider>
  );
};

// Hook para usar el contexto
export const useJoinUsModal = (): JoinUsModalContextType => {
  const context = useContext(JoinUsModalContext);
  if (!context) {
    throw new Error(
      "useJoinUsModal debe ser usado dentro de un JoinUsModalProvider"
    );
  }
  return context;
};
