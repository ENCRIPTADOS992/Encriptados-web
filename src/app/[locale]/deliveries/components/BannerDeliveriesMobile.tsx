"use client";
import React from "react";

const BannerDeliveriesMobile = () => {
  return (
    <section
      className="
        flex sm:hidden             
        w-full h-[543px]
        bg-gradient-to-b from-white to-[#D3F5FF]
        justify-center
        mt-[58px]
      "
    >
      <div className="relative w-full max-w-[414px] h-[634px] text-black px-4">
        <div
          className="
            absolute
            top-[-10px] left-[20px]
            w-[374px]
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
            <span className="bg-white text-black px-4 py-2 rounded-full border border-black text-xs font-medium shadow-md">
              Evita esperas innecesarias
            </span>

            <div
              className="
                w-full
                flex flex-col items-center text-center
                gap-[6px]
              "
            >
              <h1
                className="
                  font-inter font-bold
                  text-[18px] leading-[1]
                  max-w-[374px]
                  mx-auto
                "
              >
                Con la Entrega Rápida, recibe tu celular encriptado
                en el menor tiempo posible
              </h1>

              <p
                className="
                  font-normal
                  text-[16px] leading-[1]
                  max-w-[374px]
                  mx-auto
                "
              >
                Encuentra un punto de recogida cercano a ti
              </p>
            </div>
          </div>

          <button
            className="
              bg-[#35CDFB] text-black font-semibold
              shadow-lg hover:bg-[#007acc] transition
              rounded-[34px]
              w-[269px] h-[44px]
              px-[44px] py-[10px]
              text-[14px]
            "
          >
            Ver Lugares de Entrega
          </button>
        </div>

        <div
          className="
            absolute
            top-[253px] left-[63px]
            w-[351px] h-[289px]
          "
        >
          <img
            src="/images/deliveries/Group%20480956537.png"
            alt="Entrega rápida"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerDeliveriesMobile;
