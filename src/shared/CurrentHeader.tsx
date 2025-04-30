"use client";
import React from "react";
import EncryptedHeader from "./components/EncryptedHeader";
import DashboardHeader from "./components/DashboardHeader";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const CurrentHeader = () => {
  const currentPathName = usePathname();
  const currentLanguage = useLocale();

  const onDashboard = currentPathName.includes(
    `/${currentLanguage}/dashboard/`
  );

  return <>{onDashboard ? <DashboardHeader /> : <EncryptedHeader />}</>;
};

export default CurrentHeader;
