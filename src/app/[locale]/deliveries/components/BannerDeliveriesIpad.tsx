import React from "react";

const BannerDeliveriesIpad = () => {
  const handleScrollToMap = () => {
    const el = document.getElementById("deliveries-map");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section
      className="
        hidden sm:flex xl:hidden
        w-full h-[310px]
        bg-gradient-to-b from-white to-[#D3F5FF]
        justify-center
        mt-[80px]
      "
    >
      <div className="relative w-full max-w-[1024px] h-[344px] text-black px-4 mx-auto">
        <div
          className="
            absolute z-0
            top-[-40px] left-0 lg:left-[50px]
            w-[270px] h-[350px]
            hidden md:block
          "
        >
          <img
            src="/images/deliveries/image313.webp"
            alt="Entrega Chica"
            className="w-full h-full object-contain"
          />
        </div>

        <div
          className="
            absolute z-0
            top-[-40px] right-0 lg:right-[50px]
            w-[270px] h-[350px]
            hidden md:block
          "
        >
          <img
            src="/images/deliveries/image314.webp"
            alt="Entrega Chico"
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className="
            absolute
            top-[20px] left-0 right-0 mx-auto
            w-full max-w-[678px]
            flex flex-col items-center text-center
            gap-[24px]
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
            <span className="bg-white text-black px-4 py-2 rounded-full border border-black text-sm font-medium shadow-md">
              Evita esperas innecesarias
            </span>

            <h1
              className="
                font-inter font-bold
                text-[20px] md:text-[32px] leading-[1.2]
                max-w-[478px] md:max-w-[600px]
                mx-auto
              "
            >
              Con la Entrega Rápida, recibe tu celular encriptado
              en el menor tiempo posible
            </h1>

            <p
              className="
                font-normal
                text-[17px] md:text-[20px] leading-[1]
                max-w-[364px] md:max-w-[500px]
                mx-auto
              "
            >
              Encuentra un punto de recogida cercano a ti
            </p>
          </div>

          <button
            type="button"
            className="
              bg-[#35CDFB] text-black font-semibold
              shadow-lg hover:bg-[#007acc] transition
              rounded-[34px]
              w-[269px] h-[44px]
              px-[44px] py-[10px]
              text-[16px]
            "
            onClick={handleScrollToMap}
          >
            Ver Lugares de Entrega
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerDeliveriesIpad;

