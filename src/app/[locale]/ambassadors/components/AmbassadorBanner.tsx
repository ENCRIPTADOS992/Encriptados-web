import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";

export default function AmbassadorBanner() {
  const t = useTranslations();

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#051A22]">
          <div className="flex flex-col items-center justify-between gap-8 p-6 md:flex-row md:p-10 lg:p-16">
            {/* Texto */}
            <div className="text-center md:text-left md:w-1/2 lg:w-7/12">
              <h2 className="mb-6 text-lg font-bold leading-snug text-white sm:text-xl md:mb-8 md:text-2xl lg:mb-10 lg:text-4xl xl:text-5xl">
                <span className="text-[#FFFFFF]">
                  {t("AmbassadorsPage.banner.joinUsTitle")}
                </span>{" "}
                <span className="text-[#45D4FF]">
                  {t("AmbassadorsPage.banner.programTitle")}
                </span>{" "}
                <span className="text-[#FFFFFF]">
                  {t("AmbassadorsPage.banner.ofTitle")}
                </span>{" "}
                <span className="text-[#00FFC2]">
                  {t("AmbassadorsPage.banner.ambassadorsTitle")}
                </span>
              </h2>
              <div className="flex justify-center md:justify-start">
                <Button intent="elegant">
                  {t("AmbassadorsPage.banner.showBenefits")}
                </Button>
              </div>
            </div>

            {/* Imagen */}
            <div className="w-full md:w-1/2 lg:w-5/12">
              <Image
                src="/images/ambassadors/ambassadors-banner.png"
                alt="Ambassadors Banner"
                width={400}
                height={400}
                className="mx-auto w-full max-w-xs object-contain sm:max-w-sm md:max-w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
