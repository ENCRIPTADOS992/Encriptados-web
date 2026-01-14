import Image from "next/image";
import { useTranslations } from "next-intl";

const AnonymousBanner: React.FC = () => {
  const t = useTranslations("BneSimPage");
  return (
    <div className="p-4 md:p-0 flex flex-col items-center justify-center max-w-[1000px] mx-auto">
      <div className="text-center w-full">
        <h2 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold mb-6 leading-[1.3] text-[#333333]">
          {t("BannerAnonymous.title")}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[#333333] max-w-[700px] mx-auto">
          {t("BannerAnonymous.description")}
        </p>
      </div>
      <div className="mt-8 w-full">
        <picture>
          {/* Desktop: >= 1024px */}
          <source
            media="(min-width: 1024px)"
            srcSet="/images/bne-sim/anonymous-desktop.webp"
          />
          {/* Tablet: 768px - 1023px */}
          <source
            media="(min-width: 768px)"
            srcSet="/images/bne-sim/anonymous-tablet.webp"
          />
          {/* Móvil: < 768px */}
          <Image
            src="/images/bne-sim/anonymous-movil.webp"
            alt="Ilustración de compra anónima con SIM TIM"
            width={800}
            height={600}
            className="w-full max-w-[800px] mx-auto"
          />
        </picture>
      </div>
    </div>
  );
};

export default AnonymousBanner;
