import React from "react";

const BannerDeliveries = () => {
  const handleScrollToMap = () => {
    const el = document.getElementById("deliveries-map");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section
      className="
        hidden lg:flex
        w-full h-[580px]
        bg-gradient-to-b from-white to-[#D3F5FF]
        flex justify-center
        mt-[80px]
      "
    >
      <div className="relative w-full max-w-[1440px] h-[580px] bg-gradient-to-b from-white to-[#D3F5FF] text-black flex justify-center items-center px-4">
        <div className="absolute bottom-0 left-0 w-1/3 max-w-xs md:max-w-sm z-0">
          <img
            src="/images/deliveries/image313.png"
            alt="Entrega Chica"
            className="w-full"
          />
        </div>

        <div className="absolute bottom-0 right-0 w-1/3 max-w-xs md:max-w-sm">
          <img
            src="/images/deliveries/image314.png"
            alt="Entrega Chico"
            className="w-full"
          />
        </div>

        {/* Contenido centrado */}
        <div
          className="
              absolute
              top-[50px] left-[381px]  
              w-[678px]                  
              flex flex-col items-center text-center
              gap-[44px]                 
              z-10
            "
        >
          <div
            className="
      w-full
      flex flex-col items-center text-center
      gap-[16px]        
    "
          >
            <span className="bg-white text-black px-4 py-2 rounded-full border border-black text-sm font-medium shadow-md mb-4">
              Evita esperas innecesarias
            </span>

            <h1
              className="
            font-inter font-bold
            text-[44px] leading-[1]
            max-w[636px]
            mx-auto
          "
            >
              Con la Entrega Rápida,<br />
              recibe tu celular encriptado<br />
              en el menor tiempo posible
            </h1>

            <p
              className="
              mt-4 
              font-normal
              text-[30px] leading-[1]
              max-w-[678px]
              mx-auto
            "
            >
              Encuentra un punto de recogida cercano a ti
            </p>
          </div>
          <button 
          type="button"
          className="mt-6 bg-[#35CDFB] text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#007acc] transition text-lg"
          onClick={handleScrollToMap}
          >
            Ver Lugares de Entrega
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerDeliveries;
