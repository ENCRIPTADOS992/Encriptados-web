"use client";
import { useTranslations } from "next-intl";

// import ListOfPlans from "./ListOfPlans";
// import { ListOfProductsData } from "../constants/ListOfProductsData";
import FixedSimProducts from "../../encrypted-sim/components/FixedSimProducts";
import OurObjetive from "../../encrypted-sim/components/OurObjetive";
import BannerSecure from "../../encrypted-sim/components/BannerSecure";
import PayForUse from "../../encrypted-sim/components/PayForUse";
import WhyCallSim from "../../encrypted-sim/components/WhyCallSim/WhyCallSim";
import BannerCoverage from "@/shared/BannerCoverage";
import FeaturesListBlack from "../../encrypted-sim/components/FeaturesListBlack";
import FixedSimProductDetail from "../../encrypted-sim/components/FixedSimProductDetail";

const SimMoreInfo = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <>
      <div className="pt-16 pb-6 bg-[linear-gradient(to_right,_#EAF5FF_10%,_white_20%,_#C1F0FF_100%)]">
        <div>
          <FixedSimProductDetail />
        </div>
      </div>

      <div>
        <div className="max-w-[1100px] m-auto px-4 mt-10 mb-10">
          <h2 className="text-[24px] font-bold text-black text-left">
            {t("characteristics.title")}
          </h2>
        </div>
        <FeaturesListBlack />
      </div>

      <div className="bg-[#f4f8fa] py-[8vh]">
        <div className="max-w-[1100px] m-auto px-4">
          <OurObjetive />
        </div>
      </div>

      <div className="bg-[#E7F4F8] py-[8vh]">
        <div className="max-w-[1100px] m-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#000] mb-8">
            {t("comunicationTitle")}
          </h2>
          <BannerSecure />
        </div>
      </div>

      <div className="bg-white py-[8vh]">
        <div className="max-w-[1100px] m-auto px-4">
          <PayForUse />
        </div>
      </div>

      <div className="bg-white py-[8vh]">
        <div className="max-w-[1100px] m-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#000] mt-16 mb-16">
            {t("whyCallWithEncryptedSIM.title")}
          </h2>
          <WhyCallSim />
        </div>
      </div>

      <div className="mt-16">
        <BannerCoverage />
      </div>
    </>
  );
};

export default SimMoreInfo;
