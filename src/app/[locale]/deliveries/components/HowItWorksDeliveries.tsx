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
      {/* fondo degradado superior */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          bg-gradient-to-r from-black via-black to-[#35CDFB]
          rounded-[44px]
          z-0
          w-[414px] h-[1340px]         
          sm:w-[712px] sm:h-[454px]     
          lg:w-[1272px] lg:h-[454px]   
        "
      />

      <div
  className="
    relative z-10 text-center
    w-full mx-auto
    max-w-[322px] px-4          
    sm:max-w-5xl sm:px-8        
    py-6 mb-8
  "
>
  <h2
    className="
      text-white font-bold
      text-[20px]              
      sm:text-2xl               
      md:text-4xl              
      leading-tight
      whitespace-normal        
      sm:whitespace-nowrap      
    "
  >
    ¿Cómo funciona la{" "}
    <span className="border-b-4 border-[#35CDFB] pb-1">
      Entrega Rápida
    </span>{" "}
    de Encriptados?
  </h2>
</div>


      {/* tarjetas */}
      <div
        className="
          relative z-10
          grid grid-cols-1
          sm:grid-cols-3
          lg:grid-cols-3
          gap-[6px]     
          w-[374px] lg:w-[930px]
          w-[374px] sm:w-[672px]
          mx-auto
        "
            >
        {steps.map((step) => (
                    <div
            key={step.id}
            className="
      bg-white rounded-[24px] shadow-lg overflow-hidden
      flex flex-col justify-between
      w-[374px] h-[370px]              
      sm:w-[222px] sm:h-[370px]        
      lg:w-[306px] lg:h-[510px]        
      px-4 py-4 lg:px-6 lg:py-6
    "
          >

            {/* Texto */}
            <div
              className="
        flex flex-col items-start
        sm:w-[194px] sm:gap-2 sm:min-h-[87px]
        lg:w-[268px] lg:gap-[11px] lg:min-h-[120px]
      "
            >
              <h3
                className="
          font-semibold text-left
          text-base                 
          sm:text-[14px] sm:w-[167px]  
          lg:text-xl lg:w-auto   
          mb-1 mt-0
          lg:min-h-[38px]
        "
              >
                {step.title}
              </h3>

              <p
                className="
          text-gray-600 text-justify
          text-sm                         
          sm:text-[12px] sm:w-[194px]     
          lg:text-base lg:w-auto
        "
              >
                {step.description}
              </p>
            </div>

            {/* Imagen */}
          <div className="w-full mt-6 lg:mt-8">
            <img
              src={step.image}
              alt={step.title}
              className="
                mx-auto object-cover
                w-[249px] h-[308px]          
                sm:w-[174px] sm:h-[195px]    
                lg:w-[259px] lg:h-[298px]
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
