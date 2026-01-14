"use client";
import Button from "@/shared/components/Button";
import { InputFormContext } from "@/shared/components/InputFormContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SubscribeBanner() {
  const t = useTranslations("BlogPage");
  return (
    <div className="bg-[#151515] py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 rounded-3xl overflow-hidden relative">
          {/* Imagen */}
          <div className="w-full lg:w-1/2 relative lg:h-[460px] -mb-10 lg:mb-0 lg:translate-y-0 transform translate-y-4 sm:translate-y-6">
            <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[460px]">
              <Image
                src="/images/blog/girlandman.webp"
                alt="Personas mirando un teléfono móvil"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-lg"
                priority
              />
            </div>
          </div>
          {/* Contenido */}
          <div className="w-full lg:w-5/12 lg:-translate-x-16 bg-[#35CDFB] p-6 sm:p-8 lg:p-12 rounded-2xl z-10">
            <h2 className="text-[30px] md:text-[38px] leading-[1.3] font-bold text-white text-center lg:text-left mb-4">
              {t("saveTitle")}
            </h2>
            <p className="text-lg leading-relaxed text-white text-center lg:text-left mb-6">
              {t("saveDescription")}
            </p>

            <InputFormContext
              placeholder={t("saveInputPlaceholder")}
              light
              rounded="full"
              name="input"
            />

            <Button
              rounded="full"
              type="button"
              intent="black"
              onClick={() => {}}
            >
              {t("subscribe")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
