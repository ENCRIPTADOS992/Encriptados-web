"use client";
import Button from "@/shared/components/Button";
import { InputFormContext } from "@/shared/components/InputFormContext";

import React from "react";
import { useTranslations } from "next-intl";

const Email = () => {
  const t = useTranslations("DashboardPage.configAccount.email");
  return (
    <div className="mb-4 w-full mt-4 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center ">
          <div className="w-[250px] ">
            <Button size="small" intent="primary">
              {t("activeEmail")}
            </Button>
          </div>
          <p className="text-[#2372E9] cursor-pointer">{t("deactivate")}</p>
        </div>

        <p className="text-[#5D5D5D] mb-4 bg-[#FAFAFA] p-4 rounded-2xl text-left mt-4">
          {t("description")}
        </p>

        <div className="flex flex-col w-7/12 mb-auto">
          <p className="text-black text-base">{t("emailPrompt")}</p>
          <InputFormContext rounded="lg" light name={"input2"} />
        </div>
      </div>
      <div className="w-[150px] mt-auto mb-4">
        <Button intent="black">{t("save")}</Button>
      </div>
    </div>
  );
};

export default Email;
