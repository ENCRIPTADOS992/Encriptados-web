"use client";
import { useTranslations } from "next-intl";
import BannerConnect from "./BannerConnect";
import EncryptedSimBanner from "./EncryptedSimBanner";
import FeaturesList from "./FeaturesList";
import OurObjetive from "./OurObjetive";
import BannerSecure from "./BannerSecure";
import PayForUse from "./PayForUse";
import WhyCallSim from "./WhyCallSim/WhyCallSim";
// import SimProductsPage from "./SimProducts";
import CustomShapeDivider from "./CustomShapeDivider";
import BannerCoverage from "@/shared/BannerCoverage";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import ListOfPlans from "./ListOfPlans";
import { ListOfProductsData } from "../constants/ListOfProductsData";
import SearchInput from "@/shared/components/SearchInput";
import StorePage from "../../dashboard/store/components/StorePage";
import FixedSimProducts from "./FixedSimProducts";

const EncryptedSim = () => {
  const t = useTranslations("EncryptedSimPage");

  return (
    <>
      <div className="bg-[#f4f8fa]">
        <div className="bg-black h-[200px] sm:h-[240px] md:h-[300px]">
          <CustomShapeDivider />
        </div>

        <div className="flex justify-center items-center max-w-[1100px] m-auto p-4 translate-y-[-180px] md:translate-y-[-250px] mb-[-180px] md:mb-[-250px] ">
          <BannerConnect />
        </div>

        <div className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <BasicFormProvider>
              <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] text-center font-bold leading-[1.3] mb-6">
                <span className="bg-gradient-to-r from-[#33CDFB] via-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">
                  {t("coverageTitle")}
                </span>
              </h2>
              <div className="max-w-3xl mx-auto text-center mb-6">
                <p className="text-base sm:text-lg leading-relaxed text-[#012029]">
                  {t("coverageDescription")}
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <SearchInput
                  inputClassName="border-4 border-[#DCF2F8] focus:outline-none focus:border-[#DCF2F8]"
                  iconPosition="left"
                  name="searchinputcountry"
                  placeholder={t("searchPlaceholder")}
                />
              </div>
              <div className="max-w-3xl mx-auto mt-4">
                <ListOfPlans data={ListOfProductsData} />
              </div>
            </BasicFormProvider>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto p-4 ">
          {/* <SimProductsPage /> */}
          <FixedSimProducts />
        </div>

        <div className="justify-center flex bg-cyan-gradient flex-col items-center mt-6">
          <div>
            <EncryptedSimBanner />
          </div>
        </div>

        <div className="py-16 md:py-20">
          <div className="w-full lg:w-10/12 items-center flex justify-center mx-auto">
            <FeaturesList />
          </div>
        </div>

        <div className="bg-[#f4f8fa] py-[8vh]">
          <div className="max-w-[1100px] m-auto justify-center items-center p-4 ">
            <OurObjetive />
          </div>
        </div>
      </div>

      <div className="bg-[#E7F4F8] py-12 md:py-16 lg:py-20">
        <div className="flex justify-center px-4 mb-12 md:mb-16">
          <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-center text-[#333333] max-w-[1100px]">
            {t("comunicationTitle")}
          </h2>
        </div>
        <div className="max-w-[1100px] mx-auto px-4">
          <BannerSecure />
        </div>
      </div>

      <div className="w-full py-12 md:py-16 lg:py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <PayForUse />
        </div>
      </div>

      <div className="max-w-[1100px] m-auto px-4 py-16 md:py-20">
        <div>
          <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-center text-[#333333] mb-12 md:mb-16">
            {t("whyCallWithEncryptedSIM.title")}
          </h2>
        </div>
        <div className="flex justify-center">
          <div>
            <WhyCallSim />
          </div>
        </div>
      </div>

      <div className="pt-12 md:pt-16">
        <BannerCoverage />
      </div>
    </>
  );
};

export default EncryptedSim;
