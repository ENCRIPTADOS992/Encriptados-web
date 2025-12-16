import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import SectionWrapper from "@/shared/components/SectionWrapper";
import Typography from "@/shared/components/Typography";

export default function AmbassadorBanner() {
  const t = useTranslations();

  return (
    <SectionWrapper className="py-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#051A22]">
          <div className="flex flex-col items-center justify-between gap-8 p-6 md:flex-row md:p-10 lg:p-16">
            {/* Texto */}
            <div className="text-center md:text-left md:w-1/2 lg:w-7/12">
              <Typography 
                variant="h2" 
                as="h1" 
                className="mb-6 text-lg font-bold leading-snug text-white sm:text-xl md:mb-8 md:text-2xl lg:mb-10 lg:text-[38px] xl:text-[44px]"
              >
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
              </Typography>
              <div className="flex justify-center md:justify-start">
                <Button intent="light" size="lg" rounded="lg">
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
                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
