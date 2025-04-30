import React from "react";
import AmbassadorBanner from "./AmbassadorBanner";
import { useTranslations } from "next-intl";
import AmbassadorCards from "./AmbassadorCards";

const AmbassadorsPage = () => {
  const t = useTranslations();
  return (
    <div className="w-full bg-gradient-to-b from-[#005340] via-[#073A4B] to-black relative py-9">
      <AmbassadorBanner />
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-white font-bold text-xl sm:text-3xl lg:text-4xl text-center">
          {t("AmbassadorsPage.partnerCards.title")}
        </h1>
      </div>
      <AmbassadorCards />
    </div>
  );
};

export default AmbassadorsPage;
