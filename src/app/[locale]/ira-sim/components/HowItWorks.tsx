import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const FullWorld = "/images/maya-data/fullworld.png";
  const Balance = "/images/maya-data/balancecharge.png";
  const StepperMan = "/images/maya-data/stepperman.png";

  const t = useTranslations("MayaData");

  const stepper = [
    {
      id: 1,
      header: (
        <div className="flex items-center justify-center md:items-start md:justify-start xl:items-start xl:justify-start md:mb-4 xl:mt-4">
          <h1 className="text-base font-bold mb-2 bg-[#35CDFB] px-2 rounded-full inline-block">
            1
          </h1>
        </div>
      ),
      title: (
        <h1 className="text-xl font-bold mb-4">
          {t("howItWorks.chooseRegionTitle")}
          {""}

          <span className="text-[#35CDFB]">
            {" "}
            {t("howItWorks.chooseRegionSpecialWord")}
          </span>
        </h1>
      ),
      description: t("howItWorks.chooseRegionDescription"),
      image: (
        <div className="w-full">
          <Image
            quality={100}
            width={500}
            height={300}
            src={FullWorld}
            alt="Mapa del mundo"
            className="rounded-lg"
          />
        </div>
      ),
    },
    {
      id: 2,
      header: (
        <div className="flex items-center justify-center md:items-start md:justify-start xl:items-start xl:justify-start md:mt-4 xl:mt-4">
          <h1 className="text-base font-bold mb-2 bg-[#35CDFB] px-2 rounded-full inline-block mt-4">
            2
          </h1>
        </div>
      ),
      title: (
        <h1 className="text-xl font-bold mb-4">
          {t("howItWorks.choosePlanTitle")}{" "}
          <span className="text-[#35CDFB]">
            {" "}
            {t("howItWorks.choosePlanSpecialWord")}
          </span>{" "}
          {t("howItWorks.choosePlanTitle2")}
        </h1>
      ),
      description: t("howItWorks.choosePlanDescription"),
      image: (
        <div className=" w-full">
          <Image
            width={400} // Tamaño más pequeño
            height={400} // Tamaño más pequeño
            src={StepperMan}
            alt="Persona con plan de datos"
            layout="fixed" // Asegura que la imagen tenga el tamaño especificado
            className="rounded-lg w-full" // Bordes redondeados
          />
        </div>
      ),
    },
    {
      id: 3,
      header: (
        <div className="flex items-center justify-center md:items-start md:justify-start xl:items-start xl:justify-start md:mt-4 xl:mt-4">
          <h1 className="text-base font-bold mb-2 bg-[#35CDFB] px-2 rounded-full inline-block">
            3
          </h1>
        </div>
      ),
      title: (
        <h1 className="text-xl font-bold mb-4">
          {t("howItWorks.activateSimTitle")}
          <span className="text-[#35CDFB]">
            {" "}
            {t("howItWorks.activateSimSpecialWord")}
          </span>
        </h1>
      ),
      description: t("howItWorks.activateSimDescription"),
      image: (
        <div className="bg-[#DEF2F8] px-16 rounded-2xl  justify-center flex py-4 items-center w-full">
          <Image
            width={200} // Tamaño más pequeño
            height={200} // Tamaño más pequeño
            src={Balance}
            alt="Balance de datos móviles"
            layout="fixed" // Asegura que la imagen tenga el tamaño especificado
            className="rounded-lg" // Bordes redondeados
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-base text-center mt-14 font-bold md:text-3xl xl:text-4xl ">
        {t("howItWorks.title")}
      </h1>
      <div className="flex justify-center mt-16 md:mt-32">
        <div className="w-full md:w-7/12">
          {stepper.map((step, index) => (
            <div
              key={step.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-x-24 items-center mb-12 px-4  ${
                index % 2 === 0 // Índices pares: Texto a la izquierda, imagen a la derecha
                  ? "md:grid-flow-col"
                  : "md:grid-flow-col-reverse" // Índices impares: Imagen a la izquierda, texto a la derecha
              }`}
            >
              {/* Alternar texto e imagen */}
              <div className={`${index % 2 === 0 ? "order-1" : "order-2"}`}>
                {step.header}
                {step.title}
                <p className="text-gray-700">{step.description}</p>
              </div>
              <div
                className={`${
                  index % 2 === 0 ? "order-2" : "order-1"
                } flex justify-center`}
              >
                {step.image}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
