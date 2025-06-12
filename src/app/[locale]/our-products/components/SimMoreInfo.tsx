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

const SimMoreInfo = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <>
      <div>
        {/* <SimProductsPage /> */}
        <FixedSimProducts />
      </div>

      <div>
        <div className="w-4/12 justify-center mx-auto mt-16 items-center p-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mt-16 mb-16">
            {t("improveYourSecurity.titleImproveYourSecurity")}
          </h2>
        </div>

        {/* ¡NO ENCIERRES TODO EN w-9/12! */}
        <FeaturesListBlack />
      </div>

      <div className="bg-[#f4f8fa] py-[8vh]">
        <div className="max-w-[1100px] m-auto justify-center items-center p-4 ">
          <OurObjetive />
        </div>
      </div>

      <div className="bg-[#E7F4F8] py-[8vh]">
        <div className="flex justify-center pt-[8vh] ">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#333333] max-w-[1100px]">
            {t("comunicationTitle")}
          </h2>
        </div>
        <div className="flex justify-center items-center py-[8vh] bg-[#E7F4F8] m-auto max-w-[1100px] p-4">
          <BannerSecure />
        </div>
      </div>

      <div className="items-center p-4 w-full py-[8vh] max-w-[1100px] m-auto">
        <div className="w-full m-auto">
          <PayForUse />
        </div>
      </div>

      <div className="max-w-[1100px] m-auto p-4">
        <div>
          <h2 className=" text-3xl sm:text-4xl font-bold text-center text-[#333333] mt-16 mb-16">
            {t("whyCallWithEncryptedSIM.title")}
          </h2>
        </div>
        <div className=" flex justify-center">
          <div>
            <WhyCallSim />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <BannerCoverage />
      </div>
    </>
  );
};

export default SimMoreInfo;
