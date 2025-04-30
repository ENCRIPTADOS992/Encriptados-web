"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import ShieldDistributors from "../icons/ShieldDistributors";
import ListOfCards from "@/shared/components/ListOfCards/ListOfCards";

const EncryptedCommunication = () => {
  const t = useTranslations("DistributorsPage");
  const [columns, setColumns] = useState(1); // Estado inicial para columnas

  useEffect(() => {
    const handleResize = () => {
      // Establece 2 columnas si el ancho de la ventana es mayor a 768px (md de Tailwind)
      if (window.innerWidth >= 768) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    handleResize(); // Llama a la función al montar el componente
    window.addEventListener("resize", handleResize); // Agrega el listener de resize

    // Limpieza del listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16 px-4">
      <div>
        {/* Botón flotante */}
        <div className="flex min-h-[100px] items-center justify-center p-4">
          <div className="relative inline-block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#0080FF] opacity-75 blur-sm rounded-full" />
            <button className="relative px-6 py-2 bg-[#0E0E0E] rounded-full leading-none border border-transparent bg-clip-padding">
              <span className="bg-gradient-to-r from-[#00FFFF] to-[#0080FF] bg-clip-text text-transparent font-sans text-xs sm:text-sm font-medium">
                {t("knowsBenefits.title")}
              </span>
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex justify-center items-center">
          <div className="w-full md:w-6/12">
            <div className="w-full flex items-center justify-center">
              <div className="w-10/12 md:w-6/12">
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl text-center mb-6 sm:mb-7 font-bold">
                  {t("knowsBenefits.subtitle")}
                </h1>
              </div>
            </div>

            {/* Lista de Tarjetas */}
            <ListOfCards
              columns={columns} // Utiliza el estado para las columnas
              titleColor="white"
              descriptionColor="#969696"
              bgColorCard="#0E0E0E"
              bgIconCard="#0E0E0E"
              items={[
                {
                  icon: <ShieldDistributors />,
                  title: t("benefitsCards.card1.title"),
                  description: t("benefitsCards.card1.description"),
                },
                {
                  icon: <ShieldDistributors />,
                  title: t("benefitsCards.card2.title"),
                  description: t("benefitsCards.card2.description"),
                },
                {
                  icon: <ShieldDistributors />,
                  title: t("benefitsCards.card3.title"),
                  description: t("benefitsCards.card3.description"),
                },
                {
                  icon: <ShieldDistributors />,
                  title: t("benefitsCards.card4.title"),
                  description: t("benefitsCards.card4.description"),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptedCommunication;
