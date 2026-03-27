"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";
import Button from "@/shared/components/Button";
import { MdShoppingBag } from "react-icons/md";

const BannerOurProductsMobile = () => {
  const t = useTranslations("OurProductsPage");
  const { setValue } = useFormContext();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 75% -40%, #7EE0FF 0%, rgb(37, 191, 238) 15%, #000 55%)",
      }}
    >
      {/* Fondo de puntos */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/our-products/2f4c437915945215a21a8478b499fc508f3a35a2.png"
          alt="Dot background"
          fill
          objectFit="cover"
          className="opacity-20"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-start px-6 pt-10 pb-10 space-y-4">
        {/* Badge */}
        <div className="inline-block border border-[#7EE0FF] text-[#0AB4E9] px-4 py-1 rounded-full text-xs font-semibold">
          {t("banner.securityFromStartToEnd")}
        </div>

        {/* Título */}
        <Typography
          variant="h1"
          as="h1"
          className="text-xl leading-snug"
        >
          <span className="text-[#0AB4E9]">{t("banner.titleNewConnectWith")}</span>{" "}
          <span className="text-white">{t("banner.titleNewTotalSecurity")}</span>{" "}
          <span className="text-[#0AB4E9]">{t("banner.titleNewInComunication")}</span>
        </Typography>

        {/* Descripción */}
        <Paragraph
          variant="body"
          color="secondary"
          className="text-sm leading-relaxed"
        >
          {t("banner.descriptionNew")}
        </Paragraph>

        {/* Botón CTA */}
        <div className="pt-1">
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
    </section>
  );
};


export default BannerOurProductsMobile;
