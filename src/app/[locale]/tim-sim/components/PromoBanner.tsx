import Image from "next/image";
import BneSimImg from "/public/images/bne-sim/bne_men.png";
import { useTranslations } from "next-intl";

const PromoBanner: React.FC = () => {
  const t = useTranslations("BneSimPage");

  return (
    <div className="flex justify-center px-4">
      <div
        className="
          bg-white
          rounded-[34px]
          w-full
          max-w-[1058px]
          h-auto
          lg:h-[408px]
          overflow-visible
          px-6
          lg:px-12
          py-8
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          relative
        "
      >
        {/* Texto */}
        <div className="max-w-[520px] flex-shrink-0">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.3] text-[#020202] mb-6">
            {t("PromoBanner.title")}
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#020202] max-w-[457px]">
            {t("PromoBanner.description")}
          </p>
        </div>

        {/* Imagen grande */}
        <div
          className="
    relative
    mt-6
    lg:mt-0
    w-[260px]
    h-[360px]
    lg:absolute
    lg:right-[-30px]   
    lg:bottom-[-220px]
    lg:w-[700px]
    lg:h-[903px]
    z-10               
  "
        >
          <Image
            src={BneSimImg}
            alt="Persona usando smartphone con SIM TIM internacional"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
