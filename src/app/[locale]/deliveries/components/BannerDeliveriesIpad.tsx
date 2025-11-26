import React from "react";

const BannerDeliveriesIpad = () => {
  return (
    <section
      className="
        hidden sm:flex lg:hidden
        w-full h-[310px]
        bg-gradient-to-b from-white to-[#D3F5FF]
        justify-center
        mt-[80px]
      "
    >
      <div className="relative w-full max-w-[744px] h-[344px] text-black px-4">
        <div
          className="
            absolute z-0
            top-[-40px] left-[-15px]
            w-[270px] h-[350px]
          "
        >
          <img
            src="/images/deliveries/image313.png"
            alt="Entrega Chica"
            className="w-full h-full object-contain"
          />
        </div>

        <div
          className="
            absolute z-0
            top-[-40px] left-[554px]
            w-[270px] h-[350px]
          "
        >
          <img
            src="/images/deliveries/image314.png"
            alt="Entrega Chico"
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className="
            absolute
            top-[20px] left-[33px]
            w-[678px]
            flex flex-col items-center text-center
            gap-[44px]
          "
        >
          <div
            className="
              w-full
              flex flex-col items-center text-center
              gap-[16px]
            "
          >
            <span className="bg-white text-black px-4 py-2 rounded-full border border-black text-sm font-medium shadow-md">
              Evita esperas innecesarias
            </span>

            <h1
              className="
                font-inter font-bold
                text-[20px] leading-[1]
                max-w-[478px]
                mx-auto
              "
            >
              Con la Entrega Rápida, recibe tu celular encriptado
              en el menor tiempo posible
            </h1>

            <p
              className="
                font-normal
                text-[17px] leading-[1]
                max-w-[364px]
                mx-auto
              "
            >
              Encuentra un punto de recogida cercano a ti
            </p>
          </div>

          <button
            className="
              bg-[#35CDFB] text-black font-semibold
              shadow-lg hover:bg-[#007acc] transition
              rounded-[34px]
              w-[269px] h-[44px]
              px-[44px] py-[10px]
              text-[16px]
            "
          >
            Ver Lugares de Entrega
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerDeliveriesIpad;

