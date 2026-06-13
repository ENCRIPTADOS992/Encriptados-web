"use client";
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface AppMobileContextType {
  isFromAppMobile: boolean;
  appMode: "app_mobile" | "user" | "guest" | null;
}

const AppMobileContext = createContext<AppMobileContextType>({
  isFromAppMobile: false,
  appMode: null,
});

export function AppMobileProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [isFromAppMobile, setIsFromAppMobile] = useState(false);
  const [appMode, setAppMode] = useState<"app_mobile" | "user" | "guest" | null>(null);

  // Extraer el valor primitivo para evitar re-renders por referencia de searchParams
  const fromParam = searchParams.get("from");

  useEffect(() => {
    if (fromParam === "app_mobile" || fromParam === "user" || fromParam === "guest") {
      setIsFromAppMobile(true);
      setAppMode(fromParam as any);
      // Guardar en sessionStorage para persistir durante la navegación
      sessionStorage.setItem("app_mode", fromParam);
      sessionStorage.setItem("from_app_mobile", "true");
    } else {
      // Verificar si ya estaba guardado en sessionStorage
      const storedAppMode = sessionStorage.getItem("app_mode");
      if (storedAppMode === "app_mobile" || storedAppMode === "user" || storedAppMode === "guest") {
        setAppMode(storedAppMode as any);
        setIsFromAppMobile(true);
      } else {
        const stored = sessionStorage.getItem("from_app_mobile");
        if (stored === "true") {
          setIsFromAppMobile(true);
          setAppMode("app_mobile");
        }
      }
    }
  }, [fromParam]);

  // Memoizar el value para evitar re-renders en todos los consumidores
  const value = useMemo(() => ({ isFromAppMobile, appMode }), [isFromAppMobile, appMode]);

  return (
    <AppMobileContext.Provider value={value}>
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
