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

        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 py-12 md:py-16">
            <BasicFormProvider>
              <div className="p-4">
                <h2 className="bg-gradient-to-r text-[24px] sm:text-[30px] lg:text-[38px] text-center font-bold from-[#35CDFB] to-[#000000] bg-clip-text text-transparent leading-[1.3] mb-6">
                  Cobertura en más de 200 países
                </h2>
                <div className="flex justify-center text-center mb-6">
                  <p className="text-base sm:text-lg leading-relaxed text-[#012029]">
                    Consulta el costo del gigabyte según el país y el perfil
                    recomendado, así optimizas el consumo de tus datos al mejor
                    precio
                  </p>
                </div>

                <SearchInput
                  inputClassName="border-4 border-[#DCF2F8] focus:outline-none focus:border-[#DCF2F8]"
                  iconPosition="left"
                  name="searchinputcountry"
                  placeholder="Colombia"
                />
                <div className="mt-4 w-full">
                  <ListOfPlans data={ListOfProductsData} />
                </div>
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
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 justify-center mx-auto items-center px-4 text-center">
            <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold leading-[1.3] text-[#333333] mb-12 md:mb-16">
              {t("improveYourSecurity.titleImproveYourSecurity")}
            </h2>
          </div>
          <div className="w-full sm:w-10/12 md:w-9/12 items-center flex justify-center mx-auto">
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
