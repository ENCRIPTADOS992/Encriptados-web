import React from "react";

const BannerDeliveries = () => {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-white to-[#d4f5ff] text-black flex justify-center items-center px-4">
      
      {/* Imágenes laterales */}
      <div className="absolute bottom-0 left-0 w-1/3 max-w-xs md:max-w-sm z-0">
        <img src="/images/deliveries/image313.png" alt="Entrega Chica" className="w-full" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-1/3 max-w-xs md:max-w-sm">
        <img src="/images/deliveries/image314.png" alt="Entrega Chico" className="w-full" />
      </div>

      {/* Contenido centrado */}
      <div className="relative max-w-3xl text-center flex flex-col justify-center items-center z-10">
        {/* Texto "Evita esperas innecesarias" */}
        <span className="bg-white text-black px-4 py-2 rounded-full border border-black text-sm font-medium shadow-md mb-4">
          Evita esperas innecesarias
        </span>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Con la Entrega Rápida, recibe <br />
          tu celular encriptado en el <br />
          menor tiempo posible
        </h1>
        <p className="mt-4 text-lg">
          Encuentra un punto de recogida cercano a ti
        </p>

        {/* Botón "Ver Lugares de Entrega" */}
        <button className="mt-6 bg-[#35CDFB] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#007acc] transition text-lg">
          Ver Lugares de Entrega
        </button>
      </div>

    </section>
  );
};

export default BannerDeliveries;
