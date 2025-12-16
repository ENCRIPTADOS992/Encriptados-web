"use client";
import React from "react";
import SecurityTestSection from "./SecurityTestSection";
import { useTranslations } from "next-intl";

const InitTestMobile = () => {
  const t = useTranslations("EncryptedTestPage");
  return (
    <div className="w-full flex flex-col py-12 md:py-16">
      <SecurityTestSection
        variant="mobile"
        title={t("tryOurPhoneSecure.title")}
        description={t("tryOurPhoneSecure.description")}
        href="encrypted-test/phone"
        iconSrc="/icons/icono-grande.svg"
      />
      <SecurityTestSection
        variant="mobile"
        title={t("tryPassowordSecure.title")}
        description={t("tryPassowordSecure.description")}
        href="encrypted-test/password"
        iconSrc="/icons/key_vertical.svg"
      />
    </div>
  );
};

export default InitTestMobile;
