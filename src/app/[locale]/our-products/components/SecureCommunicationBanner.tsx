"use client";

import React from "react";
import CheckIcon from "./svgs/CheckIcon";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";

const SecureCommunicationBanner = () => {
  return (
    <section className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 sm:w-full sm:left-0 sm:translate-x-0 max-w-screen-2xl mx-auto bg-gradient-to-b from-[#0B0B0B] to-[#00242E] rounded-none sm:rounded-3xl py-10 px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 text-white">
      
      {/* Wrapper general */}
      <div className="mx-auto flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Contenedor de columnas */}
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-4 md:gap-4 sm:flex-row sm:items-start sm:justify-between">
          
          {/* Columna izquierda */}
          <div className="w-full text-center space-y-2 pl-0 sm:w-1/2 sm:pl-4 lg:pl-16 sm:-mt-8 mt-0 sm:text-left">
           <div className="flex justify-center sm:justify-start">
              <EncryptedLogoSvg width={180} height={80} />
            </div>
            <h2 className="text-xl md:text-2xl leading-snug">
              Somos especialistas en <br /> soluciones de comunicación <br /> segura:
            </h2>
            <div className="w-10 border-b-2 border-[#7EE0FF] mx-auto sm:mx-0 mt-2"></div>
          </div>

          {/* Columna derecha */}
          <div className="w-full text-center pt-2 pr-0 sm:w-1/2 sm:px-4 lg:pl-[78px] lg:pr-10 lg:ml-40 flex flex-col gap-3 text-base sm:text-lg font-semibold sm:text-left">
            {[
              "Celulares Seguros",
              "SIM Cards Encriptadas",
              "Protección de Nivel Empresarial",
              "Sistemas de Seguridad Probados",
            ].map((text, idx) => (
              <div className="flex items-center justify-start gap-2 text-[#7EE0FF]" key={idx}>
                <CheckIcon className="w-5 h-5 mt-1" />
                <span>{text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecureCommunicationBanner;
