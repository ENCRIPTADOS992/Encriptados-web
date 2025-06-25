"use client";

import React from "react";
import CheckIcon from "./svgs/CheckIcon";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";

const SecureCommunicationBanner = () => {
  return (
    <section className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 sm:w-full sm:left-0 sm:translate-x-0 max-w-screen-2xl mx-auto bg-gradient-to-b from-[#0B0B0B] to-[#00242E] rounded-none sm:rounded-3xl py-10 px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 text-white">
      
      {/* Wrapper general */}
      <div className="mx-auto flex flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-between">
        
        {/* Contenedor de columnas */}
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:justify-between">
          
          {/* Columna izquierda */}
          <div className="w-full text-center space-y-2 pl-0 md:w-1/2 md:pl-16 md:-mt-8 mt-0 md:text-left">
           <div className="flex justify-center md:justify-start">
              <EncryptedLogoSvg width={180} height={80} />
            </div>
            <h2 className="text-xl md:text-2xl leading-snug">
              Somos especialistas en <br /> soluciones de comunicación <br /> segura:
            </h2>
            <div className="w-10 border-b-2 border-[#7EE0FF] mx-auto md:mx-0 mt-2"></div>
          </div>

          {/* Columna derecha */}
          <div className="w-full text-center pt-2 pr-0 md:w-1/2 md:pr-10 md:pl-[78px] ml-0 md:ml-40 flex flex-col gap-3 text-base md:text-lg font-semibold md:text-left">
            {[
              "Celulares Seguros",
              "SIM Cards Encriptadas",
              "Protección de Nivel Empresarial",
              "Sistemas de Seguridad Probados",
            ].map((text, idx) => (
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#7EE0FF]" key={idx}>
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
