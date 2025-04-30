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

const HowItWorksDeliveries = () => {
  return (
    <section className="py-16 bg-[#EAF2F6] flex flex-col items-center relative">
      {/* Contenedor del título con fondo degradado */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[50%] bg-gradient-to-r from-black via-black to-[#35CDFB] rounded-[50px] z-0"></div>

      {/* Contenedor del título */}
      <div className="relative z-10 text-center w-full max-w-5xl px-8 py-6 mb-8">
  <h2 className="text-white text-2xl md:text-4xl font-bold whitespace-nowrap">
    ¿Cómo funciona la{" "}
    <span className="border-b-4 border-[#35CDFB] pb-1">
      Entrega Rápida
    </span>{" "}
    de Encriptados?
  </h2>
</div>


      {/* Contenedor de tarjetas */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-[30px] shadow-lg overflow-hidden flex flex-col items-center text-center px-6 py-8 w-[85%] md:w-[300px]"
          >
            {/* Imagen */}
            <div className="w-full h-72">
              <img
                src={step.image}
                alt={step.title}
                className="w-[249px] h-[308px] object-cover mx-auto"
              />
            </div>

            {/* Texto */}
            <div className="mt-4">
              <h3 className="text-xl text-left font-semibold mb-2 mt-5">{step.title}</h3>
              <p className="text-gray-600  text-justify">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksDeliveries;
