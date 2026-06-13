"use client";
import React from "react";
import CardUsage from "./CardUsage";
import ListOfData from "./ListOfData";
import ListOfMinutes from "./ListOfMinutes";
import ListOfMsi from "./ListOfMsi";
import MultiMenu from "@/shared/components/MultiMenu";
import { useFormContext } from "react-hook-form";
import AppleGenericSvg from "@/shared/svgs/AppleGenericSvg";
import GooglePlayGenericSvg from "@/shared/svgs/GooglePlayGenericSvg";
import Image from "next/image";
import Button from "@/shared/components/Button";
import ArrowDown from "@/shared/svgs/ArrowDown";
import { useTranslations } from "next-intl";

type MenuOption = {
  label: string;
  value: "mobiledata" | "minutes" | "msi";
};

type CardUsageData = {
  title: string;
  price: string;
};

const DataUsagePage: React.FC = () => {
  const t = useTranslations("DashboardPage.dataUsage");
  const { watch } = useFormContext();
  const Man = "/images/dashboard/man.png";

  const menuOptions: MenuOption[] = [
    { label: t("menu.data"), value: "mobiledata" },
    { label: t("menu.minutes"), value: "minutes" },
    { label: "MSI", value: "msi" },
  ];

  const cardUsageData: CardUsageData[] = [
    { title: t("cards.balanceUsed"), price: "208.418 COP" },
    { title: t("cards.dataUsed"), price: "1.5GB" },
    { title: t("cards.minutes"), price: "32min" },
    { title: t("cards.imsiChanges"), price: "5" },
  ];

  const currentMenu = watch("currentmenu") as "mobiledata" | "minutes" | "msi";

  const currentOption: Record<MenuOption["value"], React.JSX.Element> = {
    mobiledata: <ListOfData />,
    minutes: <ListOfMinutes />,
    msi: <ListOfMsi />,
  };

  return (
    <>
      <div className="flex  mt-2   items-center mb-8 gap-x-2">
        <p className="text-[#777B7D] tracking-[0.2em] ">{t("simUsage")}</p>

        <Button
          rounded="md"
          iconPosition="right"
          icon={<ArrowDown width={15} height={15} />}
          intent="profile"
        >
          90049845
        </Button>
      </div>

      {/* Mapeamos las tarjetas de uso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
        {cardUsageData.map((card, index) => (
          <CardUsage key={index} title={card.title} price={card.price} />
        ))}
      </div>

      <p className="text-[#777B7D] tracking-[0.2em]  mt-7 mb-2">
        {t("quickRecharge")}
      </p>

      {/* Sección que se ajustará responsivamente */}
      <div className=" w-full">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Componente MultiMenu y sus contenidos */}
          <div className="bg-white h-auto p-5 rounded-2xl w-full lg:w-1/2">
            <div className="mb-6">
              <MultiMenu name="currentmenu" options={menuOptions} />
            </div>
            {currentOption[currentMenu]}
          </div>

          {/* Imagen y promoción */}
          <div className="bg-cyan-black-gradient  rounded-2xl w-full lg:w-1/2 flex flex-col items-center lg:flex-row">
            <div className="flex flex-col justify-center w-full lg:w-6/12 p-5 text-center lg:text-left">
              <h1 className="font-bold text-2xl mb-2">
                {t("promoTitle")}
              </h1>
              <p className="mb-4">{t("downloadApp")}</p>
              <div className="flex justify-center lg:justify-start gap-2">
                <AppleGenericSvg />
                <GooglePlayGenericSvg />
              </div>
            </div>

            {/* Ajuste de imagen para pantallas grandes */}
            <div className="relative h-[513px] w-full overflow-hidden md:h-[413px]">
              <Image
                alt={t("imageAlt")}
                src={Man}
                fill
                className="rounded-b-2xl absolute bottom-0 left-0 translate-y-0 md:translate-y-20 object-cover" // Asegura que la imagen esté alineada en la parte inferior
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataUsagePage;
