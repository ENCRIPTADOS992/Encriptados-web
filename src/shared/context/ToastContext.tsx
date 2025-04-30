// ToastContext.tsx
"use client";
import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

// Creamos el contexto
const ToastContext = createContext<{
  success: (message: string) => void;
  error: (message: string) => void;
}>({
  success: () => {},
  error: () => {},
});

// Creamos un provider que envuelve a la app
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Funciones que muestran los toasts
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

// Crear un hook para usar el toast
export const useToast = () => useContext(ToastContext);
