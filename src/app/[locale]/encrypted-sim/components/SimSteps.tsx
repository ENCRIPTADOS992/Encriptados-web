// ../../encrypted-sim/components/SimSteps.tsx
"use client";

import React from "react";
import Image from "next/image";

const SimSteps = () => {
  return (
    <section className="w-full pt-16 pb-10 md:pt-10 md:pb-2">

      <div className="mx-auto w-[1276px] max-w-full px-4 md:px-8">
        {/* Título */}
        <h2 className="text-center text-[26px] md:text-[32px] font-semibold mb-14">
          Así funciona
        </h2>

        {/* Paso 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          {/* Texto */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#19BBFF] flex items-center justify-center text-black text-[16px] font-semibold">
                1
              </div>
            </div>

            <h3 className="text-[32px] md:text-[32px] font-semibold leading-snug mb-3">
              Elige el destino donde quieres usar internet en tu{" "}
              <span className="text-[#19BBFF]">eSIM</span>
            </h3>

            <p className="text-[18px] md:text-[18px] text-[#4B5563] mb-4 max-w-md">
              Elige uno de nuestros 65 destinos o regiones donde puedes usar
              nuestra sim virtual.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-[16px] font-medium text-[#111827] underline underline-offset-4"
            >
              Cómo funciona la cobertura 
              <span className="text-[16px]">›</span>
            </button>
          </div>

          {/* Imagen */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[520px] aspect-[16/10] rounded-[32px] overflow-hidden">
              <Image
                src="/images/encrypted-sim/step1.png"
                alt="Selecciona el destino para tu eSIM"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Paso 2 */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-12">
          {/* Imagen */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[520px] aspect-[16/10] rounded-[32px] overflow-hidden">
              <Image
                src="/images/encrypted-sim/step2.png"
                alt="Selecciona tu plan de datos"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#19BBFF] flex items-center justify-center text-black text-[16px] font-semibold">
                2
              </div>
            </div>

            <h3 className="text-[22px] md:text-[32px] font-semibold leading-snug mb-3">
              Selecciona tu{" "}
              <span className="text-[#19BBFF]">plan de datos</span> y realiza la
              compra
            </h3>

            <p className="text-[16px] md:text-[16px] text-[#4B5563] mb-4 max-w-md">
              Elige uno de nuestros 65 destinos o regiones donde puedes usar
              nuestra sim virtual.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-[16px] font-medium text-[#111827] underline underline-offset-4"
            >
              Cómo funciona
              <span className="text-[16px]">›</span>
            </button>
          </div>
        </div>

        {/* Paso 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-2 mt-12
        ">
          {/* Texto */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#19BBFF] flex items-center justify-center text-white text-[16px] font-semibold">
                3
              </div>
            </div>

            <h3 className="text-[22px] md:text-[26px] font-semibold leading-snug mb-3">
              Activa tu eSIM y disfruta de tus{" "}
              <span className="text-[#19BBFF]">datos móviles</span>
            </h3>

            <p className="text-[14px] md:text-[15px] text-[#4B5563] mb-4 max-w-md">
              Elige uno de nuestros 65 destinos o regiones donde puedes usar
              nuestra sim virtual.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#111827] underline underline-offset-4"
            >
              Cómo funciona
              <span className="text-[16px]">›</span>
            </button>
          </div>

          {/* Imagen */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[521px] aspect-[16/12] rounded-[32px] overflow-hidden ">
              <Image
                src="/images/encrypted-sim/step3.png"
                alt="Activa y usa tu eSIM"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimSteps;
