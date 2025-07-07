import React, { useState, useEffect } from "react";
import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import Bag from "../icons/Bag";
import { useJoinUsModal } from "../context/JoinUsModalContext";
import TelegramButton from "@/shared/components/TelegramButton";
import SectionWrapper from "@/shared/components/SectionWrapper";

const BannerDistributors = () => {
  const t = useTranslations("DistributorsPage.banner");
  const BannerDistributorsImage =
    "/images/distributors/bannerdistributors1.png";

  const { openModal } = useJoinUsModal();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    checkScreenSize(); 

    window.addEventListener("resize", checkScreenSize); 
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16 px-4">
      <SectionWrapper>
      <div
        className={`p-6 md:p-10 rounded-3xl w-full max-w-[1200px] md:h-[550px] h-100%  flex-col gap-y-4 flex justify-center items-center ${
          isMobile ? "bg-[#151515]" : ""
        }`}
        style={{
          backgroundImage: `url(${BannerDistributorsImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}

      >
        <Bag />
        <h1 className="text-white text-xl sm:text-2xl md:text-4xl w-10/12 md:w-8/12 font-bold text-center">
          {t("becomeOurAllyBannerTitle")}
        </h1>

        <p className="text-[#FFFFFF] text-sm sm:text-base md:text-lg text-center w-10/12 md:w-8/12">
          {t("becomeOurAllyBannerDescription")}
        </p>

        <div className="flex items-center justify-center w-full">
          <TelegramButton />
          {/* <Button onClick={openModal} rounded="full" intent="primary">
            {t("sendRequest")}
          </Button> */}
        </div>
      </div>
      </SectionWrapper>
    </div>
  );
};

export default BannerDistributors;
