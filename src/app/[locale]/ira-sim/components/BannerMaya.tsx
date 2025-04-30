import React from "react";
import Image from "next/image";

import Button from "@/shared/components/Button";
import CarSvg from "../svgs/CarSvg";
import ChatSvg from "../svgs/ChatSvg";
import MapSvg from "../svgs/MapSvg";
import ProcessSvg from "../svgs/ProcessSvg";
import PhoneSvg from "../svgs/PhoneSvg";
import CloudSvg from "../svgs/CloudSvg";
import LineUp from "../svgs/LineUp";
import { useTranslations } from "next-intl";

const BannerMaya = () => {
  const MayaMan = "/images/maya-data/mayamen.png";
  const MayaWomen = "/images/maya-data/mayawomen.png";

  const t = useTranslations("MayaData");

  return (
    <div className="bg-cyan-black-gradient">
      <div className="hidden lg:flex h-[450px] justify-center items-center">
        <div>
          <div className="translate-x-9 translate-y-[-20px]">
            <MapSvg width={50} height={50} />
          </div>
          <div className="translate-x-9">
            <ProcessSvg width={50} height={50} />
          </div>
        </div>

        <div className="w-full lg:w-auto h-[500px] min-w-[250px] lg:min-w-[350px] mt-6 lg:mt-0 relative rounded-3xl overflow-hidden">
          <Image
            quality={100}
            title="Image"
            src={MayaWomen}
            alt="Image"
            loading="eager"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Chat icono */}
        <ChatSvg width={70} height={70} />

        {/* Textos para pantallas grandes */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="  text-white text-center w-11/12">
            <span className="text-[#35CDFB]  font-bold md:text-3xl xl:text-5xl  ">
              {t("anonymSim")}
            </span>
            <span className="text-white font-bold md:text-3xl xl:text-5xl  ">
              , {t("monthPackage")}
            </span>
          </h1>
          <div className="mt-7">
            <Button
              size="large"
              rounded="full"
              iconPosition="right"
              icon={<CarSvg />}
              customStyles="border-cyan-500 text-cyan-500   "
              intent="ghost"
            >
              {t("viewAllSims")}
            </Button>
          </div>
          <h1 className=" text-center mt-4 md:text-3xl xl:text-5xl  text-[#35CDFB]">
            {t("payMore")}
          </h1>
        </div>

        <PhoneSvg width={70} height={70} />

        <div className="w-full lg:w-auto h-[500px] min-w-[250px] lg:min-w-[350px] mt-6 lg:mt-0 relative rounded-3xl overflow-hidden">
          <Image
            quality={100}
            title="Image"
            src={MayaMan}
            alt="Image"
            loading="eager"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div>
          <CloudSvg height={70} width={70} />
          <LineUp height={70} width={70} />
        </div>
      </div>

      <div className="lg:hidden relative h-[300px] flex justify-center items-center">
        <div className="w-[200px] h-[395px] min-w-[250px] md:translate-y- relative rounded-3xl overflow-hidden">
          <Image
            quality={100}
            title="Image"
            src={MayaMan}
            alt="Image"
            loading="eager"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Textos que se muestran encima de la imagen del hombre en pantallas pequeñas */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center">
          <h1 className="text-xl md:text-lg text-white w-full px-4">
            <span className="text-[#35CDFB] font-bold text-lg md:text-base">
              eSIM anónima
            </span>
            <span className="text-white font-bold text-lg md:text-base">
              , con paquetes mensuales y datos ilimitados
            </span>
          </h1>

          <div className="mt-4">
            <Button
              size="large"
              rounded="full"
              iconPosition="right"
              icon={<CarSvg />}
              customStyles="border-cyan-500 text-cyan-500"
              intent="ghost"
            >
              Ver todas las SIMS
            </Button>
          </div>

          <h1 className="text-lg md:text-base text-center mt-4 w-full text-[#35CDFB]">
            Paga menos, consume más
          </h1>
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1728419371">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default BannerMaya;
