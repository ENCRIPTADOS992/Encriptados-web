"use client";

import TelegramButton from "@/shared/components/TelegramButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function BeDistributorEncrypted() {
  const t = useTranslations("DistributorsPage");

  const Build = "/images/distributors/build.png";
  const ManHow = "/images/distributors/man-how.png";

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16">
      <SectionWrapper>
        {/* Card completa */}
        <div className="w-full flex flex-row bg-black overflow-hidden">
          {/* Columna izquierda: imagen */}
          <div className="relative w-1/2 min-h-[260px] flex items-center justify-center bg-black">
            <Image
              alt="Distributor"
              src={ManHow}
              width={520}
              height={520}
              className="w-full max-w-[320px] md:max-w-[360px] h-auto object-contain"
            />
          </div>

          {/* Columna derecha: texto + botón */}
          <div className="relative w-1/2 flex items-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${Build})` }}
            />
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 px-6 py-8 md:px-10 lg:px-14 flex flex-col gap-4">
              <h1 className="font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-tight">
                {t("beEncryptedDistributor.title")}
              </h1>
              <p className="text-white text-sm md:text-base">
                {t("beEncryptedDistributor.description")}
              </p>
              <div className="mt-4 max-w-xs">
                <TelegramButton />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}