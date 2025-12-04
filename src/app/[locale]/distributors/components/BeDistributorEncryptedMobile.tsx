"use client";

import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";
import TelegramButton from "@/shared/components/TelegramButton";

export default function BeDistributorEncryptedMobile() {
    const t = useTranslations("DistributorsPage");
    const Build = "/images/distributors/build.png";
    const ManHow = "/images/distributors/man-how.png";

    return (
        <div className="w-full bg-gradient-to-b from-[#00372B] via-black to-[#022530] md:hidden flex justify-center py-10 px-4">
            <SectionWrapper>
                <div className="max-w-sm mx-auto bg-black rounded-3xl overflow-hidden relative flex flex-col items-center text-center px-6 pt-8 pb-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${Build})` }}
                    />
                    <div className="absolute inset-0 bg-black opacity-60" />

                    {/* Texto + botón */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <h1 className="font-bold text-white text-lg">
                            {t("beEncryptedDistributor.title")}
                        </h1>

                        <p className="text-white text-xs leading-relaxed">
                            {t("beEncryptedDistributor.description")}
                        </p>

                        <div className="w-full flex justify-center mt-2">
                            <TelegramButton />
                        </div>
                    </div>

                    {/* Imagen abajo */}
                    <div className="relative z-10 mt-6 w-full flex justify-start">
                        <Image
                            alt="Distributor representative"
                            src={ManHow}
                            width={260}
                            height={260}
                            className="object-contain"
                        />
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}