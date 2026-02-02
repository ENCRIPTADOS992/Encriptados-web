"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface SecurityTestCardProps {
    icon: string;
    title: string;
    description: string;
    backgroundImage: string;
    onStartTest?: () => void;
    href?: string; // Add href support for navigation
}

export function SecurityTestCard({
    icon,
    title,
    description,
    backgroundImage,
    onStartTest,
}: SecurityTestCardProps) {
    const t = useTranslations("EncryptedTestPage");
    return (
        <div className="relative overflow-hidden bg-black group cursor-pointer transition-all hover:shadow-lg rounded-3xl min-h-[280px] w-full xl:w-[1272px] h-auto xl:h-[569px] md:rounded-[38px] mx-auto" onClick={onStartTest}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage || "/placeholder.svg"}
                    alt=""
                    fill
                    className="object-cover object-right opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    priority
                />
            </div>

            {/* Overlay Border */}
            <div className="absolute inset-0 rounded-3xl md:rounded-[38px] border border-[#383838] pointer-events-none z-20" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between xl:justify-center p-6 md:p-10">
                <div className="flex flex-col gap-4 md:gap-6">
                    {/* Icon */}
                    <div className="w-14 h-14 md:w-20 md:h-20 xl:w-[120px] xl:h-[120px] relative">
                        <Image
                            src={icon || "/placeholder.svg"}
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="max-w-xs md:max-w-xl">
                        <h3 className="text-2xl md:text-4xl xl:text-[44px] font-bold text-white leading-tight xl:leading-none text-balance">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm md:text-lg xl:text-[22px] text-gray-400 font-medium xl:font-normal xl:leading-none">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Button - Mobile: bottom left, Desktop: absolute positioned */}
                <div className="mt-6 xl:absolute xl:top-[255px] xl:left-[966px] xl:mt-0">
                    <button
                        className="inline-flex items-center justify-center gap-[8px] rounded-full bg-[#E3F8FF] px-5 py-2.5 xl:w-[199px] xl:h-[58px] xl:rounded-[34px] xl:px-[24px] xl:py-[10px] text-sm md:text-base xl:text-[18px] font-bold xl:leading-none tracking-normal text-[#1F1F1F] transition-colors hover:bg-[#cbf4ff]"
                    >
                        {t("initTest")}
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
