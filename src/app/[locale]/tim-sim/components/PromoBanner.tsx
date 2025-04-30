import Image from 'next/image';
import BneSimSvg from "/public/images/bne-sim/bne_men.png";;
import { useTranslations } from 'next-intl';

const PromoBanner: React.FC = () => {
  const t = useTranslations("BneSimPage");
  return (
    <div className="bg-white lg:p-4 pt-4 px-4 flex flex-col md:flex-row items-center justify-center rounded-3xl max-w-[1000px] lg:max-h-[400px] mx-auto">
      <div className="mb-4 md:mb-0 md:mr-8 max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {t("PromoBanner.title")}
        </h2>
        <p className="text-gray-700">
        {t("PromoBanner.description")}
        </p>
      </div>
      <div className='-translate-y-6' >
        <Image
          src={BneSimSvg}
          alt="Hombre usando smartphone"                   
          className="w-[300px] translate-y-6 lg:translate-y-0 "
        />
      </div>
    </div>
  );
};

export default PromoBanner;

