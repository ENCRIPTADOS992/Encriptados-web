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
    <div className="w-full bg-black relative flex justify-center items-center py-12 md:py-16 lg:py-20 px-4 overflow-hidden">
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 360,
          height: 240,
          left: "8%",
          top: "55%",
          transform: "translateY(-50%)",
          background: "#01FFC2",
          opacity: 0.4,
          filter: "blur(140px)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 420,
          height: 300,
          left: "86%",
          top: "55%",
          transform: "translate(-50%, -50%)",
          background: "#10B4E7",
          opacity: 0.5,
          filter: "blur(140px)",
          borderRadius: "50%",
        }}
      />
      <SectionWrapper className="relative z-10">
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
        <h1 className="text-[30px] md:text-[38px] lg:text-[44px] leading-[1.3] font-bold text-white text-center w-10/12 md:w-8/12">
          {t("becomeOurAllyBannerTitle")}
        </h1>

        <p className="text-lg leading-relaxed text-[#FFFFFF] text-center w-10/12 md:w-8/12 mb-6">
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
