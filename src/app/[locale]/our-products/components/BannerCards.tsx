"use client";

import OurSimCard from "../../tim-sim/components/svgs/OurSimCard";
import AdsClickSvg from "/public/images/bne-sim/svg/ads_click.svg";
import CellTowerSvg from "/public/images/bne-sim/svg/cell_tower.svg";
import Rotate_rightSvg from "/public/images/bne-sim/svg/rotate_right.svg";

import { useTranslations } from "next-intl";
import Slider from "react-slick";
import { useEffect, useState } from "react";

const BannerCards: React.FC = () => {
  const t = useTranslations("BneSimPage");

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Establecer el estado inicial
    handleResize();

    // Agregar listener para manejar cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpiar el listener al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    swipe: true,
    centerMode: true,
    centerPadding: "0px", // Elimina el padding interno
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px", // Mantén sin padding en pantallas pequeñas
          slidesToScroll: 1,
        },
      },
    ],
  };

  const cards = [
    {
      bgColor: "bg-custom-gradient-our-sim-black",
      textColor: "text-white",
      icon: CellTowerSvg,
      title: t("OurSimCard.title"),
      description: t("OurSimCard.description"),
    },
    {
      bgColor: "bg-custom-gradient-our-sim-blue",
      textColor: "text-black",
      icon: AdsClickSvg,
      title: t("OurSimCard.title2"),
      description: t("OurSimCard.description2"),
    },
    {
      bgColor: "bg-custom-gradient-our-sim-black",
      textColor: "text-white",
      icon: CellTowerSvg,
      title: t("OurSimCard.title4"),
      description: t("OurSimCard.description4"),
    },
    {
      bgColor: "bg-custom-gradient-our-sim-blue",
      textColor: "text-black",
      icon: Rotate_rightSvg,
      title: t("OurSimCard.title3"),
      description: t("OurSimCard.description3"),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 w-full px-8 rounded-xl max-w-7xl mx-auto py-20 ">
      {/* Encabezado */}
      <div className="lg:w-1/3 space-y-4">
        <h2 className="text-3xl font-bold text-black">
          Tu SIM o e-SIM tienen estos superpoderes
        </h2>
        <p className="text-xl font-light text-black">
          Conéctate con todo el mundo en todo el mundo, cuando lo necesites y
          oculta tu información.
        </p>
      </div>

      {/* Contenedor de tarjetas */}
      <div className="w-full">
        {isSmallScreen ? (
          <Slider {...sliderSettings}>
            {cards.map((card, index) => (
              <div
                key={index}
                className="p-2"
                style={{
                  marginLeft: index === 0 ? "-10px" : undefined, // Ajusta margen inicial
                  marginRight: index === cards.length - 1 ? "-10px" : undefined, // Ajusta margen final
                }}
              >
                <OurSimCard
                  bgColor={card.bgColor}
                  textColor={card.textColor}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  classCard="w-full h-90 rounded-2xl p-6"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div
            className="flex flex-wrap gap-4 justify-center overflow-hidden"
            style={{
              overflowX: "hidden", // Ocultar desbordamiento horizontal
            }}
          >
            {cards.map((card, index) => (
              <OurSimCard
                key={index}
                bgColor={card.bgColor}
                textColor={card.textColor}
                icon={card.icon}
                title={card.title}
                description={card.description}
                classCard="flex-shrink-0 w-60 sm:w-60 h-90 rounded-2xl p-6"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCards;
