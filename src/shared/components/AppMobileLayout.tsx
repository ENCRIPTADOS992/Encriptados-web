"use client";
import React, { ReactNode } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";
import { usePathname } from "next/navigation";

interface AppMobileLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}

export default function AppMobileLayout({
  children,
  header,
  footer,
}: AppMobileLayoutProps) {
  const { isFromAppMobile } = useAppMobile();
  const pathname = usePathname();

  // Ocultar header/footer si viene de la app O si estamos en la ruta de términos para app
  const shouldHideLayout = isFromAppMobile || pathname?.includes("terms-app");

  return (
    <>
      {!shouldHideLayout && header}
      {children}
      {!shouldHideLayout && footer}
    </>
  );
}
