import Image from "next/image";

import { useTranslations } from "next-intl";

const PromoBanner: React.FC = () => {
  const t = useTranslations("BneSimPage");

  return (
    <div className="flex justify-center px-4 bg-[linear-gradient(270deg,#009DFF_50%,#7ECDFD_90%)] py-16 md:py-20 lg:py-24">
      <div
        className="
          bg-white
          rounded-[34px]
          w-full
          max-w-[1058px]
          h-auto
          lg:h-[408px]
          overflow-hidden
          lg:overflow-visible
          px-6
          lg:px-12
          pt-8 pb-0 lg:py-8
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          relative
        "
      >
        {/* Texto */}
        <div className="max-w-[520px] flex-shrink-0 text-center lg:text-left">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.3] text-[#020202] mb-6 mx-auto lg:mx-0">
            {t("PromoBanner.title")}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#020202] max-w-[457px] mx-auto lg:mx-0">
            {t("PromoBanner.description")}
          </p>
        </div>

        {/* Imagen grande */}
        <div
          className="
    relative
    mt-6
    lg:mt-0
    w-full
    max-w-[350px]
    h-[400px]
    md:max-w-[450px]
    md:h-[500px]
    lg:absolute
    lg:right-[-30px]   
    lg:bottom-0
    lg:w-[500px]
    lg:h-[450px]
    lg:max-w-none
    z-10               
  "
        >
          <Image
            src="/images/encrypted-sim/men-banner-.webp"
            alt="Persona usando smartphone con SIM TIM internacional"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
