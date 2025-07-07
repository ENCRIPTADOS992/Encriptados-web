"use client";

import Button from "@/shared/components/Button";
import TelegramButton from "@/shared/components/TelegramButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function BeDistributorEncrypted() {
  const t = useTranslations("DistributorsPage");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const Build = "/images/distributors/build.png";
  const ManHow = "/images/distributors/man-how.png";

  if (isMobile) {
   return (
  <div className="w-full bg-black flex items-start justify-center p-0">
    <div className="w-full bg-[#0E0E0E] rounded-3xl overflow-hidden flex flex-row relative p-0">
      <div className="relative w-1/2 min-h-[200px] flex items-center bg-black">
        <Image
          alt="Distributor representative"
          src={ManHow}
          fill
          className="object-contain"
          style={{ borderRadius: "1.5rem 0 0 1.5rem" }}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-14 relative z-10">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${Build})`, opacity: 0.18 }}
        />
        <div className="absolute inset-0 bg-black opacity-0 z-0" />
        <div className="relative z-10 flex flex-col gap-y-4 items-start">
          <h1 className="font-bold text-white text-lg sm:text-xl">
            {t("beEncryptedDistributor.title")}
          </h1>
          <p className="text-white text-xs">
            {t("beEncryptedDistributor.description")}
          </p>
          <div className="w-full flex justify-start mt-2">
            <Button rounded="full" intent="primary">
              {t("banner.sendRequest")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


  }

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16">
      <SectionWrapper>
        <div className="h-auto w-full flex flex-col md:flex-row bg-black">
          <div className="relative w-full md:w-6/12 flex justify-end">
            <Image
              alt="image"
              width={500}
              height={500}
              src={ManHow}
              className="max-w-full h-auto object-contain"
            />
          </div>

          <div className="w-full md:w-6/12 flex flex-col justify-center items-center gap-y-4 relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${Build})` }}
            />
            <div className="absolute inset-0 bg-black opacity-65" />
            <div className="relative z-10 flex flex-col justify-center items-center gap-y-4 p-6 md:p-12 lg:p-24">
              <h1 className="font-bold text-white text-3xl md:text-4xl">
                {t("beEncryptedDistributor.title")}
              </h1>
              <p className="text-white">
                {t("beEncryptedDistributor.description")}
              </p>
              <div className="flex w-full">
                <TelegramButton />
                {/* <Button rounded="full" intent="primary">
                {t("banner.sendRequest")}
              </Button> */}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
