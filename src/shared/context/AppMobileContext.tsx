"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface AppMobileContextType {
  isFromAppMobile: boolean;
}

const AppMobileContext = createContext<AppMobileContextType>({
  isFromAppMobile: false,
});

export function AppMobileProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isFromAppMobile, setIsFromAppMobile] = useState(false);

  useEffect(() => {
    const fromParam = searchParams.get("from");
    if (fromParam === "app_mobile") {
      setIsFromAppMobile(true);
      // Guardar en sessionStorage para persistir durante la navegación
      sessionStorage.setItem("from_app_mobile", "true");
    } else {
      // Verificar si ya estaba guardado en sessionStorage
      const stored = sessionStorage.getItem("from_app_mobile");
      if (stored === "true") {
        setIsFromAppMobile(true);
      }
    }
  }, [searchParams]);

  return (
    <AppMobileContext.Provider value={{ isFromAppMobile }}>
      {children}
    </AppMobileContext.Provider>
  );
}

export function useAppMobile() {
  const context = useContext(AppMobileContext);
  if (!context) {
    throw new Error("useAppMobile must be used within AppMobileProvider");
  }
  return context;
}
