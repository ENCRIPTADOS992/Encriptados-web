import React from "react";
import AmbassadorBanner from "./AmbassadorBanner";
import { useTranslations } from "next-intl";
import AmbassadorCards from "./AmbassadorCards";
import SectionWrapper from "@/shared/components/SectionWrapper";
import DownloadBanner from "./DownloadBanner";
import DownloadBannerMobile from "./DownloadBannerMobile";

const AmbassadorsPage = () => {
  const t = useTranslations();
  return (
    <div className="w-full bg-gradient-to-b from-[#005340] via-[#073A4B] to-black relative py-9">
      <AmbassadorBanner />
      <SectionWrapper className="mt-8 mb-20">
        <div className="flex items-center justify-center mb-5">
          <h1 className="text-white font-bold text-xl sm:text-3xl lg:text-4xl text-center">
            {t("AmbassadorsPage.partnerCards.title")}
          </h1>
        </div>
        <AmbassadorCards />
      </SectionWrapper>
      {/* Desktop only */}
      <div className="hidden lg:block">
        <DownloadBanner />
      </div>

      {/* Mobile & tablet only */}
      <div className="block lg:hidden">
        <DownloadBannerMobile />
      </div>
    </div>
  );
};

export default AmbassadorsPage;
