"use client";
import React from "react";
import SecurityTestSection from "./SecurityTestSection";
import { useTranslations } from "next-intl";

const InitTestEncrypted = () => {
  const t = useTranslations("EncryptedTestPage");
  return (
    <div className="w-full flex flex-col gap-20">
      <SecurityTestSection
        variant="desktop"
        title={t("tryOurPhoneSecure.title")}
        description={t("tryOurPhoneSecure.description")}
        href="encrypted-test/phone"
        iconSrc="/icons/icono-grande.svg"
      />
      <SecurityTestSection
        variant="desktop"
        title={t("tryPassowordSecure.title")}
        description={t("tryPassowordSecure.description")}
        href="encrypted-test/password"
        iconSrc="/icons/key_vertical.svg"
      />
    </div>
  );
};

export default InitTestEncrypted;
