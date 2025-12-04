"use client";
import React from "react";
import WhereToFindUsBanner from "./WhereToFindUsBanner";
import WhereListOfCards from "./WhereListOfCards";
import FormWhereToFind from "./FormWhereToFind";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import HowToBuy from "./HowToBuy";
import DownloadBanner from "../../ambassadors/components/DownloadBanner";
import DownloadBannerMobile from "../../ambassadors/components/DownloadBannerMobile";
import HowToBuyMobile from "./HowToBuyMobile";

const WhereToFindUsPage = () => {
  return (
    <div className="bg-gradient-to-b from-[#041A20] via-[#041A20] to-black">
      <WhereToFindUsBanner />

      <WhereListOfCards />

      <BasicFormProvider values={{ country: "Colombia" }}>
        <FormWhereToFind />
      </BasicFormProvider>

      <div className="block md:hidden">
        <HowToBuyMobile />
      </div>

      <div className="hidden md:block">
        <HowToBuy />
      </div>

      <div className="hidden lg:block z-10">
        <DownloadBanner />
      </div>
      <div className="block lg:hidden z-10">
        <DownloadBannerMobile />
      </div>
    </div>
  );
};

export default WhereToFindUsPage;
