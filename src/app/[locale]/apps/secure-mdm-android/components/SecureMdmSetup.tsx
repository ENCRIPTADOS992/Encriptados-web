"use client";

import { useTranslations } from "next-intl";

const SecureMdmSetup = () => {
  const t = useTranslations("SecureMdmPage.setup");

  return (
    <section className="relative overflow-hidden py-[10rem] px-4 bg-[#F4F8FA] flex flex-col items-center">
      {/* Background Glow Effect on both sides */}
      <div className="absolute top-0 left-[-20%] lg:w-[300px] w-[25px] h-[300px] bg-[#01FFC2] blur-[120px] opacity-30 z-0" />
      <div className="absolute top-0 right-[-20%] lg:w-[300px] w-[25px] h-[300px] bg-[#01FFC2] blur-[120px] opacity-30 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full">
        {/* Gradient Tag */}
        <button
          type="button"
          className="w-[305px] h-[54px] text-[20px] bg-gradient-to-b from-[#00DFFC] to-[#B6F3FF] text-black font-bold px-6 py-2 rounded-full mb-6"
        >
          {t("tag")}
        </button>

        {/* Steps */}
        <ul className="text-[#0F172A] flex flex-col gap-5 w-full">
          <li className="text-[20px] lg:text-[38px] font-normal lg:font-semibold leading-tight">
            {t("step1")}
          </li>
          <li className="text-[20px] lg:text-[38px] font-normal lg:font-semibold leading-tight">
            {t("step2")}
          </li>
          <li className="text-[20px] lg:text-[38px] font-normal lg:font-semibold leading-tight">
            {t("step3")}
          </li>
          <li className="text-[20px] lg:text-[38px] font-normal lg:font-semibold leading-tight">
            {t("step4")}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SecureMdmSetup;