"use client";

import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

const UltraxSystemFeatures = () => {
  const t = useTranslations("UltraxPage.systemFeatures") as any;;

  const features = [
    "wallet",
    "firewall",
    "imsiCatcher",
    "extremePrivacy",
    "secureCalls",
    "trust"
  ];

  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="absolute top-0 left-[-20%] lg:w-[300px] w-[25px] h-[300px] bg-[#01FFC2] blur-[120px] opacity-30 z-0" />
      <div className="absolute top-0 right-[-20%] lg:w-[300px] w-[25px] h-[300px] bg-[#01FFC2] blur-[120px] opacity-30 z-0" />

      <div className="max-w-7xl mx-auto text-center justify-items-center">
        <h2 className="text-[#0F172A] font-bold text-2xl lg:text-3xl mb-12">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-[740px] mx-auto">
          {features.map((key, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md px-6 py-5 text-left flex flex-col gap-2"
            >
              <div className="items-center gap-3">
                <CheckCircle className="text-[#6ADFFF] w-5 h-5 mb-5" />
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {t(`items.${key}.title`)}
                </h3>
              </div>
              <p className="text-sm text-[#101010]/70 text-start leading-snug">
                {t(`items.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UltraxSystemFeatures;
