"use client";

import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      <div className="w-full min-h-screen bg-black p-4">
        <div className="w-full max-w-md mx-auto bg-[#0E0E0E] rounded-3xl overflow-hidden">
          <div className="p-6 space-y-4">
            <h1 className="font-bold text-white text-2xl text-center">
              {t("beEncryptedDistributor.title")}
            </h1>
            <p className="text-white text-center text-sm">
              {t("beEncryptedDistributor.description")}
            </p>
          </div>
          <div className="w-full flex justify-center mb-6">
            <Button rounded="full" intent="primary">
              {t("banner.sendRequest")}
            </Button>
          </div>

          <div className="relative h-80 w-full">
            <Image
              alt="Distributor representative"
              src={ManHow}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-4 w-8 h-8">
                <div className="w-full h-full border border-white rounded-sm rotate-45 transform -translate-y-1/2" />
              </div>
              <div className="absolute top-1/4 right-4 w-8 h-8">
                <div className="w-full h-full border border-white rounded-sm rotate-45 transform -translate-y-1/2" />
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-4 border-2 border-black rounded-sm" />
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#3BA1F0] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16">
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
