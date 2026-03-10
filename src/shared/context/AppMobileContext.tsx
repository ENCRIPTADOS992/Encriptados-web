"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
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

  useEffect(() => {
    const fromParam = searchParams.get("from");
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
  }, [searchParams]);

  return (
    <AppMobileContext.Provider value={{ isFromAppMobile, appMode }}>
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
