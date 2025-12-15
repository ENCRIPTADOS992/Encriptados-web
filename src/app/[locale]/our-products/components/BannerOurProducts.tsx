import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";
import Button from "@/shared/components/Button";
import { MdShoppingBag } from "react-icons/md";

const BannerOurProducts = () => {
  const t = useTranslations("OurProductsPage");
  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-4 sm:py-6 md:py-8 flex justify-center items-center">
      {/* Contenedor tipo tarjeta */}
      <div className="relative w-full max-w-screen-xl mx-auto bg-[#090909] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 overflow-hidden">
        {/* Fondo de puntos detrás del texto */}
        <div className="absolute top-0 left-0 h-full w-full z-0">
          <Image
            src="/images/our-products/2f4c437915945215a21a8478b499fc508f3a35a2.png"
            alt="Dot background"
            layout="fill"
            objectFit="cover"
            className="rounded-xl opacity-20"
          />
        </div>

        {/* Contenido de texto */}
        <div className="flex-1 text-white space-y-3 sm:space-y-4 px-2 sm:px-0 text-left z-10 w-full lg:max-w-xl">
          {/* Badge */}
          <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 sm:px-6 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
            {t("banner.securityFromStartToEnd")}
          </div>
          
          {/* Título Hero */}
          <Typography 
            variant="h1" 
            as="h1" 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight sm:leading-snug"
          >
            <span className="text-[#0AB4E9]">{t("banner.titleNewConnectWith")}</span>{" "}
            <span className="text-white">{t("banner.titleNewTotalSecurity")}</span>{" "}
            <span className="text-[#0AB4E9]">{t("banner.titleNewInComunication")}</span>
          </Typography>
          
          {/* Descripción */}
          <Paragraph 
            variant="body" 
            color="secondary" 
            className="text-sm sm:text-base lg:max-w-xl text-left sm:text-justify"
          >
            {t("banner.descriptionNew")}
          </Paragraph>
          
          {/* Botón CTA */}
          <div className="pt-2 sm:pt-4">
            <Button
              intent="ghost"
              size="md"
              icon={<MdShoppingBag size={20} />}
              iconPosition="left"
              onClick={() => {
                scrollToSection("buysimappsection");
                setValue("selectedOption", "sim");
              }}
              className="text-white hover:bg-white/10"
            >
              {t("banner.goToStore")}
            </Button>
          </div>
        </div>

        {/* Imagen de persona */}
        <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md z-10 relative h-[240px] sm:h-[280px] md:h-[320px] lg:h-[450px] translate-y-6 sm:translate-y-8 lg:translate-y-10">
          <Image
            src="/images/our-products/070e8ce9e05a772be2fda80c02b3733778db1afd.png"
            alt="Persona hablando"
            layout="fill"
            objectFit="contain"
            className="object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default BannerOurProducts;
