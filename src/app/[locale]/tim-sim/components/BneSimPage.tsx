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

const BneSimPage = () => {
  return (
    <>
      <div className="w-full bg-[#f4f8fa]">
        <div>
          <BannerConnectBne />
        </div>

        <div id="use-your-sim" className="mb-36">
          <div className="flex items-center flex-col px-4">
            <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl  mb-4 mt-4">
              ¿Donde vas a usar tu SIM?
            </h1>
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-[350px] md:w-[400px] lg:w-[700px]">
              Conéctate a Internet con tu SIM o eSIM en más de 200 países.
              Disfruta de internet seguro y con total anonimato.
            </p>
          </div>
          <BasicFormProvider
            defaultValue={{
              selectedcardvalue: "esim_recharge",
              selectedregion: "region",
            }}
            submit={(data) => {
              console.log(data);
            }}
          >
            <StepperBuy optionType="timsim" />
          </BasicFormProvider>
        </div>
        <div className="mb-20 px-6">
          <OurSim />
        </div>
        <div className="bg-custom-gradient-plans py-20 p-4">
          <PromoBanner />
        </div>
        <div className="relative py-20 z-10">
          <BannerAnonymous />
        </div>
        <div className="relative -translate-y-[400px] -mb-[400px] z-0">
          <CustomShapeDivider />
        </div>
        <div className="bg-custom-gradient-our-sim-black py-32 p-4">
          <OurBne />
        </div>
        <div className="max-w-[1100px] py-20 m-auto">
          <h1 className="sm:text-xl text-center md:text-base lg:text-lg xl:text-4xl mb-5  font-bold text-[#333333]">
            Preguntas frecuentes
          </h1>
          <div className="p-4">
            <FaqsBne />
          </div>
        </div>
        <div className="max-w-[1100px] m-auto pb-20">
          <QRBanner title="Descarga la App para iOS & Android" />
        </div>
      </div>
    </>
  );
};

export default BneSimPage;
