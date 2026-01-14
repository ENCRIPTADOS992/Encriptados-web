"use client";

import TelegramButton from "@/shared/components/TelegramButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function BeDistributorEncrypted() {
  const t = useTranslations("DistributorsPage");

  const Build = "/images/distributors/build.webp";
  const ManHow = "/images/distributors/man-how.webp";

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-0 md:py-0">
      <SectionWrapper className="!max-w-none !px-0 !mx-0">
        {/* Card completa */}
        <div className="w-full flex flex-row bg-black overflow-hidden">
          {/* Columna izquierda: imagen */}
          <div className="relative w-1/2 h-[320px] md:h-[380px] lg:h-[500px] flex items-center justify-end bg-[#0E0E0E]">
            <Image
              alt="Distributor"
              src={ManHow}
              fill
              className="object-contain"
              style={{ objectPosition: "right center" }}
            />
          </div>

          {/* Columna derecha: texto + botón */}
          <div className="relative w-1/2 flex items-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${Build})` }}
            />
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 px-6 py-8 md:px-10 lg:px-14 flex flex-col gap-4 w-full max-w-[400px]">
              <h2 className="text-[30px] md:text-[38px] leading-[1.3] font-bold text-white">
                {t("beEncryptedDistributor.title")}
              </h2>
              <p className="text-base leading-relaxed text-white">
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
