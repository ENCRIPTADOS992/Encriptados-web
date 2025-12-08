"use client";
import BannerConnectBne from "./BannerConnectBne";
import OurSim from "./OurSim";
import PromoBanner from "./PromoBanner";
import BannerAnonymous from "./BannerAnonymous";
import CustomShapeDivider from "./CustomShapeDivider";
import OurBne from "./OurBne";
import FaqsBne from "./FaqsBne";
import QRBanner from "../../fast-delivery/components/QRBanner";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import StepperBuy from "@/shared/components/StepperBuy/StepperBuy";
import WhereUseSimSection from "./WhereUseSimSection";

const BneSimPage = () => {
  return (
    <>
      <div className="w-full bg-[#f4f8fa]">
        <div>
          <BannerConnectBne />
        </div>
        <BasicFormProvider
          defaultValue={{
            selectedcardvalue: "esim_datos",
            selectedregion: "region",
          }}
          submit={() => {}}
        >
          <WhereUseSimSection />
        </BasicFormProvider>
        <div className="mb-20 px-6">
          <OurSim />
        </div>
        <div
          className="
            bg-gradient-to-r
            from-[#009DFF]
            via-[#009DFF]
            to-[#7ECDFD]
            py-20
            px-4
          "
        >
          <PromoBanner />
        </div>
        <div className="relative py-20 z-10">
          <BannerAnonymous />
        </div>
        <div className="relative -translate-y-[400px] -mb-[400px] z-0">
          <CustomShapeDivider />
        </div>
        <div
          className="
            bg-gradient-to-b
            from-[#020202]    
            via-[#020202]   
            to-[#009DFF]     
            py-32
            px-4
          "
        >
          <OurBne />
        </div>

        <div className="p-4">
          <FaqsBne />
        </div>
        {/* <div className="max-w-[1100px] m-auto pb-20">
          <QRBanner title="Descarga la App para iOS & Android" />
        </div> */}
      </div>
    </>
  );
};

export default BneSimPage;
