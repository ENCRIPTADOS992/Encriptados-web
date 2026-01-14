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
    image: "/images/deliveries/imagepeople.webp",
  },
  {
    id: 3,
    title: "Recoge tu celular encriptado",
    description:
      "Una vez coordinada la entrega, recoge tu celular encriptado y disfruta de comunicaciones seguras",
    image: "/images/deliveries/image (6).webp",
  },
];

const HowItWorksDeliveries: React.FC = () => {
  return (
    <section className="py-16 bg-[#EAF2F6] hidden lg:flex lg:flex-col lg:items-center relative">
      {/* Fondo degradado superior (usa ya tus tamaños para lg) */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[1272px] h-[454px]
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
          max-w-5xl px-8
          py-6 mb-8
        "
      >
        <h2
          className="
            text-white font-bold
            text-4xl
            leading-tight
            whitespace-nowrap
          "
        >
          ¿Cómo funciona la{" "}
          <span className="border-b-4 border-[#35CDFB] pb-1">
            Entrega Rápida
          </span>{" "}
          de Encriptados?
        </h2>
      </div>

      {/* Tarjetas – escritorio */}
      <div
        className="
          relative z-10
          grid grid-cols-3
          w-[930px]
          mx-auto
        "
      >
        {steps.map((step) => (
          <div
            key={step.id}
            className="
              bg-white rounded-[24px] shadow-lg overflow-hidden
              flex flex-col justify-between
              w-[306px] h-[510px]
              px-5 py-6
            "
          >
            {/* Texto */}
            <div
              className="
                flex flex-col items-start
                w-[268px]
                h-[120px]
                gap-[11px]
                min-h-[120px]
              "
            >
              <h3
                className="
                  font-semibold text-left
                  text-[18px]
                  mb-3
                  min-h-[38px]
                "
              >
                {step.title}
              </h3>

              <p
                className="
                  text-gray-600
                  text-[16px]
                "
              >
                {step.description}
              </p>
            </div>

            {/* Imagen */}
            <div className="w-full mt-8">
              <img
                src={step.image}
                alt={step.title}
                className="
                  mx-auto object-cover
                  w-[259px] h-[298px]
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

export default HowItWorksDeliveries;
