"use client";
import { InputFormContext } from "@/shared/components/InputFormContext";
import OnlyKeyLoginIconSvg from "@/shared/svgs/OnlyKeyLoginIconSvg";
import ProfileSvg from "@/shared/svgs/ProfileSvg";
import React from "react";
import { useTranslations } from "next-intl";

const Credentials = () => {
  const t = useTranslations("DashboardPage.configAccount.credentials");
  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <div className="mb-4">
        <ProfileSvg width={40} height={40} color="black" />
      </div>

      <div className="flex flex-col w-full max-w-md">
        <div className="flex flex-col px-6">
          <p className="text-[#888888] text-base">{t("accessId")}</p>
          <InputFormContext
            rounded="lg"
            icon={<OnlyKeyLoginIconSvg color="#1C1B1F" />}
            light
            name={"input1"} // Cambiar el nombre para evitar duplicados
          />
        </div>

        <div className="flex flex-col px-6">
          <p className="text-[#888888] text-base">{t("lastAccessDate")}</p>
          <InputFormContext
            rounded="lg"
            icon={<OnlyKeyLoginIconSvg color="#1C1B1F" />}
            light
            name={"input2"} // Cambiar el nombre para evitar duplicados
          />
        </div>
      </div>
    </div>
  );
};

export default Credentials;
