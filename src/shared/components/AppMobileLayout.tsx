"use client";
import React, { ReactNode } from "react";
import { useAppMobile } from "@/shared/context/AppMobileContext";

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

  return (
    <>
      {!isFromAppMobile && header}
      {children}
      {!isFromAppMobile && footer}
    </>
  );
}
