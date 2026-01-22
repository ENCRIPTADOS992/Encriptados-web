import React from "react";

const steps = [
  {
    id: 1,
    title: "Selecciona un punto de entrega",
    description:
      "Consulta la ubicación más cercana donde te gustaría recoger tu celular encriptado",
    image: "/images/deliveries/imagemap.webp",
  },
  {
    id: 2,
    title: "Contáctanos por Telegram",
    description:
      "Contáctanos por nuestro canal de Telegram y coordina la compra de tu celular encriptado",
    image: "/images/deliveries/card2.webp",
  },
  {
    id: 3,
    title: "Recoge tu celular encriptado",
    description:
      "Una vez coordinada la entrega, recoge tu celular encriptado y disfruta de comunicaciones seguras",
    image: "/images/deliveries/card3.webp",
  },
];

const HowItWorksDeliveriesMobile: React.FC = () => {
  return (
    <section className="py-12 bg-[#EAF2F6] flex sm:hidden flex-col items-center relative">
      {/* Fondo mobile */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r from-black via-black to-[#35CDFB]
          z-0
        "
      />

      {/* Título */}
      <div
        className="
          relative z-10 text-center
          w-full mx-auto
          max-w-[322px] px-4
          py-6 mb-8
        "
      >
        <h2
          className="
            text-white font-bold
            text-[20px]
            leading-tight
            whitespace-normal
          "
        >
          ¿Cómo funciona la Entrega Rápida de Encriptados?
        </h2>
      </div>

      {/* Tarjetas – mobile en columna */}
      <div
        className="
          relative z-10
          grid grid-cols-1
          gap-6
          w-full max-w-[374px]
          mx-auto
          px-4
        "
      >
        {steps.map((step) => (
          <div
            key={step.id}
            className="
              bg-white rounded-[18px] shadow-lg overflow-hidden
              flex flex-col
              w-full h-auto min-h-[370px]
              px-4 py-4
            "
          >
            <div
              className="
    flex flex-col
    gap-2
    w-full max-w-[318px]
    mx-auto
  "
            >
              <h3
                className="
                  font-semibold
                  text-[18px]
                  mb-1
                  mt-4
                "
              >
                {step.title}
              </h3>

              <p
                className="
                  text-gray-600
                  text-[14px]
                  mb-1
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
                  w-full max-w-[318px] h-[215px]
                  rounded-[16px]
                "
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksDeliveriesMobile;
