import Image from "next/image";
import BneSimSvg from "/public/images/bne-sim/anonymous_purchase.png";
import { useTranslations } from "next-intl";

const AnonymousBanner: React.FC = () => {
  const t = useTranslations("BneSimPage");
  return (
    <div className="p-4 md:p-0 flex flex-col items-center justify-center max-w-[1000px] mx-auto ">
      <div className="text-center">
        <h2 className="lg:text-4xl text-3xl font-bold py-4 text-black ">
          {t("BannerAnonymous.title")}
        </h2>
        <p className="text-black lg:text-2xl lg:py-4 m:py-10 lg:w-[700px]">
          {t("BannerAnonymous.description")}
        </p>
      </div>
      <div>
        <Image
          src={BneSimSvg}
          alt="Hombre usando smartphone"
          className="w-[100%] "
        />
      </div>
    </div>
  );
};

export default AnonymousBanner;
