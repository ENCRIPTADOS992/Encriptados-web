"use client";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import StepperBuy from "@/shared/components/StepperBuy/StepperBuy";
import { useTranslations } from "next-intl";
import React from "react";

const WhereUseYourSim = () => {
  const t = useTranslations("MayaData");
  return (
    <>
      <div className="flex items-center flex-col px-4">
        <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl  mb-4 mt-7">
          {t("whereUseSim")}
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[350px] md:w-[400px] lg:w-[700px]">
          {t("connectInternet")}
        </p>
      </div>

      <BasicFormProvider
        defaultValue={{
          selectedcardvalue: "esim_recharge",
          selectedregion: "region",
        }}
        submit={(data) => {
          console.log(data);
        }}
      >
        <StepperBuy optionType="irasim" />
      </BasicFormProvider>
    </>
  );
};

export default WhereUseYourSim;
