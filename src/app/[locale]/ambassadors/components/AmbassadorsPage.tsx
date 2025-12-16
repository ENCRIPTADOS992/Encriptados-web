import React from "react";
import AmbassadorBanner from "./AmbassadorBanner";
import { useTranslations } from "next-intl";
import AmbassadorCards from "./AmbassadorCards";
import SectionWrapper from "@/shared/components/SectionWrapper";
import DownloadBanner from "./DownloadBanner";
import DownloadBannerMobile from "./DownloadBannerMobile";
import Typography from "@/shared/components/Typography";

const AmbassadorsPage = () => {
  const t = useTranslations();
  return (
    <div className="w-full bg-gradient-to-b from-[#005340] via-[#073A4B] to-black relative py-9 overflow-x-hidden">
      <AmbassadorBanner />
      <SectionWrapper className="mt-12 mb-10">
        <div className="flex items-center justify-center mb-2">
          <Typography 
            variant="h2" 
            as="h2" 
            className="text-white font-bold text-xl sm:text-3xl lg:text-[38px] text-center"
          >
            {t("AmbassadorsPage.partnerCards.title")}
          </Typography>
        </div>
        <AmbassadorCards />
      </SectionWrapper>
      {/* Desktop only */}
      <div className="hidden lg:block ">
        <div className="w-full bg-custom-gradient-qr-black-y-grey">
          <DownloadBanner />
        </div>
      </div>

      {/* Mobile & tablet only */}
      <div className="block lg:hidden">
        <DownloadBannerMobile />
      </div>
    </div>
  );
};

export default AmbassadorsPage;
