import React from "react";

const steps = [
  {
    id: 1,
    title: "Selecciona un punto de entrega",
    description:
      "Consulta la ubicación más cercana donde te gustaría recoger tu celular encriptado",
    image: "/images/deliveries/imagemap.png",
  },
  {
    id: 2,
    title: "Contáctanos por Telegram",
    description:
      "Contáctanos por nuestro canal de Telegram y coordina la compra de tu celular encriptado",
    image: "/images/deliveries/imagepeople.png",
  },
  {
    id: 3,
    title: "Recoge tu celular encriptado",
    description:
      "Una vez coordinada la entrega, recoge tu celular encriptado y disfruta de comunicaciones seguras",
    image: "/images/deliveries/image (6).png",
  },
];

const HowItWorksDeliveriesTablet: React.FC = () => {
  return (
    <section className="py-12 bg-[#EAF2F6] hidden sm:flex lg:hidden flex-col items-center relative">
      {/* Fondo tablet */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[712px] h-[454px]
          bg-gradient-to-r from-black via-black to-[#35CDFB]
          rounded-[44px]
          z-0
        "
      />

      {/* Título */}
      <div
        className="
          relative z-10 text-center
          w-full mx-auto
          max-w-[672px] px-6
          py-6 mb-8
        "
      >
        <h2
          className="
            w-[348px]
            h-[58px]
            text-white font-bold
            mx-auto
            text-[24px]
            gap-1px
            whitespace-normal
          "
        >
          ¿Cómo funciona la Entrega Rápida de Encriptados?
        </h2>
      </div>

      {/* Tarjetas – tablet */}
      <div
        className="
          relative z-10
          grid grid-cols-3
          gap-2
          w-[672px]
          mx-auto
        "
      >
        {steps.map((step) => (
          <div
            key={step.id}
            className="
              bg-white rounded-[24px] shadow-lg overflow-hidden
              flex flex-col justify-between
              w-[222px] h-[370px]
              px-4 py-4
            "
          >
            <div
              className="
                flex flex-col items-start
                w-[194px]
                h-[87px]
                gap-[2px]
                
              "
            >
              <h3
                className="
                  font-bold
                  text-[14px]
                  w-[167px]
                  mb-1 mt-0
                "
              >
                {step.title}
              </h3>

              <p
                className="
                  text-gray-600
                  text-[12px]
                  w-[194px]
                "
              >
                {step.description}
              </p>
            </div>

            <div className="w-full mt-6">
              <img
                src={step.image}
                alt={step.title}
                className="
                  mx-auto object-cover
                  w-[194px] h-[215px]
                  rounded-[18px]
                "
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksDeliveriesTablet;
