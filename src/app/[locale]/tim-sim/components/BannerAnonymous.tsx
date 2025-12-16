import Image from "next/image";
import BneSimSvg from "/public/images/bne-sim/anonymous_purchase.png";
import { useTranslations } from "next-intl";

const AnonymousBanner: React.FC = () => {
  const t = useTranslations("BneSimPage");
  return (
    <div className="p-4 md:p-0 flex flex-col items-center justify-center max-w-[1000px] mx-auto">
      <div className="text-center">
        <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold mb-6 leading-[1.3] text-[#333333]">
          {t("BannerAnonymous.title")}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[#333333] max-w-[700px] mx-auto">
          {t("BannerAnonymous.description")}
        </p>
      </div>
      <div className="mt-8">
        <Image
          src={BneSimSvg}
          alt="Ilustración de compra anónima con SIM TIM"
          className="w-full max-w-[800px]"
        />
      </div>
    </div>
  );
};

export default AnonymousBanner;
