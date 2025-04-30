"use client";
import Button from "@/shared/components/Button";
import { InputFormContext } from "@/shared/components/InputFormContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SubscribeBanner() {
  const t = useTranslations("BlogPage");
  return (
    <div className="bg-[#151515] p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 rounded-3xl overflow-hidden relative">
          {/* Imagen */}
          <div className="w-full lg:w-1/2 relative lg:h-[460px] -mb-10 lg:mb-0 lg:translate-y-0 transform translate-y-4 sm:translate-y-6">
            <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[460px]">
              <Image
                src="/images/blog/girlandman.png"
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white text-center lg:text-left">
              {t("saveTitle")}
            </h1>
            <p className="text-base sm:text-lg mb-6 text-white text-center lg:text-left">
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
