"use client";
import { useTranslations } from "next-intl";

import SectionWrapper from "@/shared/components/SectionWrapper";
import OurObjetive from "../../encrypted-sim/components/OurObjetive";
import BannerSecure from "../../encrypted-sim/components/BannerSecure";
import PayForUse from "../../encrypted-sim/components/PayForUse";
import WhyCallSim from "../../encrypted-sim/components/WhyCallSim/WhyCallSim";
import BannerCoverage from "@/shared/BannerCoverage";
import FeaturesListBlack from "../../encrypted-sim/components/FeaturesListBlack";
import FixedSimProductDetail from "../../encrypted-sim/components/FixedSimProductDetail";
import { SimMoreInfoHeroDesktop } from "./SimMoreInfoHeroDesktop";

const SimMoreInfo = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <>
      {/* Hero desktop */}
      <SimMoreInfoHeroDesktop />

      {/* Resto de la página */}
      <div className="pt-16 pb-6 bg-[linear-gradient(to_right,_#EAF5FF_10%,_white_20%,_#C1F0FF_100%)]">
        <FixedSimProductDetail />
      </div>

      <SectionWrapper className="mt-10 mb-16">
        <h2 className="text-2xl mb-10 font-bold text-black">
          {t("characteristics.title")}
        </h2>
      </SectionWrapper>

      <FeaturesListBlack />

      <div className="bg-[#f4f8fa] py-[8vh]">
        <SectionWrapper>
          <OurObjetive />
        </SectionWrapper>
      </div>

      <div className="bg-[#E7F4F8] py-[8vh] w-full">
        <SectionWrapper>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            {t("comunicationTitle")}
          </h2>
          <BannerSecure />
        </SectionWrapper>
      </div>

      <div className="bg-white py-[8vh]">
        <SectionWrapper>
          <PayForUse />
        </SectionWrapper>
      </div>

      <div className="bg-white w-full py-[8vh]">
        <SectionWrapper>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mt-16 mb-16">
            {t("whyCallWithEncryptedSIM.title")}
          </h2>
          <WhyCallSim />
        </SectionWrapper>
      </div>

      <div className="mt-16">
        <BannerCoverage />
      </div>
    </>
  );
};

export default SimMoreInfo;
