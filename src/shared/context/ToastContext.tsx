// ToastContext.tsx
"use client";
import React, { createContext, useCallback, useContext, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";

// Creamos el contexto
const ToastContext = createContext<{
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}>({
  success: () => {},
  error: () => {},
  info: () => {},
});

// Creamos un provider que envuelve a la app
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Funciones memoizadas para evitar re-renders en consumidores
  const success = useCallback((message: string) => toast.success(message), []);
  const error = useCallback((message: string) => toast.error(message), []);
  const info = useCallback(
    (message: string) => toast.success(message, { icon: "\u{1F4CC}", duration: 5000 }),
    []
  );

  const value = useMemo(() => ({ success, error, info }), [success, error, info]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

// Crear un hook para usar el toast
export const useToast = () => useContext(ToastContext);
