// ../../encrypted-sim/components/CardInfo.tsx
"use client";

import React from "react";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
import { DataCostsByCountry } from "./DataCostsByCountry";

const CardInfo = () => {
  return (
    <div
      className="
        w-full
        bg-white
        flex flex-col-reverse lg:flex-row
        gap-6

        rounded-none
        px-4
        pt-6 pb-8

        lg:mx-auto
        lg:w-[1276px] lg:max-w-full
        lg:rounded-[34px]
        lg:pt-[54px] lg:pb-[54px]
        lg:pl-[55px] lg:pr-[55px]
        lg:gap-[20px]
      "
    >
      <div className="w-full lg:w-[525px] flex flex-col">
        <div className="inline-flex items-center gap-2 
        rounded-full bg-[#F5FBFF] 
        pr-3 pl-0 py-3">
          <span className="relative w-6 h-6">
            <Image
              src="/images/encrypted-sim/icons/sim.png"
              alt="Icono eSIM"
              fill
              className="object-contain"
            />
          </span>

          <span className="text-[14px] font-medium">
            eSIM Encriptada con datos móviles
          </span>
        </div>


        {/* País */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7">
            <CircleFlag
              countryCode="co"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <span className="text-[24px] font-semibold">Colombia</span>
        </div>

        {/* Beneficios */}
        <div className="mb-6">
          <p className="text-[14px] font-semibold mb-2">Beneficios para ti:</p>
          <ul className="space-y-1 text-[13px] leading-[18px]">
            {[
              "Conexiones seguras y privadas",
              "Llamadas anónimas",
              "Datos de geolocalización cifrados",
              "Sin límite de tiempo para usar recursos del plan",
              "Número sustituto para cada llamada",
              "Cambios de IMSI para mayor anonimato",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[2px] text-[12px]">✔️</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <DataCostsByCountry />

        {/* Sin fecha límite */}
        <div className="flex items-center gap-1 text-[12px] mb-2">
          <span className="font-semibold">*</span>
          <span>No existe fecha límite de uso</span>
          <span className="text-[#74A3D8] cursor-pointer">ⓘ</span>
        </div>

        {/* Opciones de GB */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mb-6">
          {/* Activa */}
          <button
            type="button"
            className="
              h-[72px]
              rounded-[16px]
              border border-[#1E8A4C]
              bg-[#E8F9F0]
              flex items-center justify-center
            "
          >
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold">5GB</span>
              <span className="relative w-8 h-8">
                <Image
                  src="/images/encrypted-sim/icons/5g.png"
                  alt="5G"
                  fill
                  className="object-contain"
                />
              </span>
            </div>
          </button>

          {/* Inactivas */}
          {["10GB", "15GB", "25GB", "50GB", "GB ilimitado"].map((label) => (
            <button
              key={label}
              type="button"
              className="
                h-[72px]
                rounded-[16px]
                border border-[#E2E4EA]
                bg-[#F7F8FA]
                text-[#A3A7B4]
                flex items-center justify-center
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-medium">{label}</span>
                <span className="relative w-8 h-8">
                  <Image
                    src="/images/encrypted-sim/icons/5g.png"
                    alt="5G"
                    fill
                    className="object-contain"
                  />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Precio */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[26px] font-semibold">$40,470 COP</span>
            <span className="text-[14px] line-through text-[#B5BAC6]">
              60,706 COP
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
  <button
    type="button"
    className="
      w-full                    
      h-[54px]                
      rounded-[50px]           
      px-6                    
      flex items-center justify-center gap-1
      bg-black text-white
      text-[14px] font-semibold

      sm:flex-1               
      sm:h-[48px]
      sm:rounded-[999px]
      sm:px-4
    "
  >
    Comprar ahora
  </button>

  <button
    type="button"
    className="
      w-full
      h-[54px]
      rounded-[50px]
      px-6
      flex items-center justify-center gap-1
      bg-[#F5F7FA] text-[#111827]
      text-[14px] font-medium

      sm:flex-1
      sm:h-[48px]
      sm:rounded-[999px]
      sm:px-4
    "
  >
    Chat soporte
  </button>
</div>

      </div>

      {/* Columna derecha */}
      <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
        <div
          className="
            w-[374px] h-[220px]                 
            md:w-[480px] md:h-[320px]
            lg:w-[570px] lg:h-[592px]
            max-w-full
            rounded-[16px]                      
            lg:rounded-[44px]                   
            flex items-center justify-center
            bg-[linear-gradient(to_bottom,_#EAF5FF,_#FFFFFF,_#C1F0FF)]
          "
        >

          <div className="relative w-[482px] h-[398px] max-w-full">
            <Image
              src="/images/encrypted-sim/principal.png"
              alt="Tarjeta Encriptados"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
