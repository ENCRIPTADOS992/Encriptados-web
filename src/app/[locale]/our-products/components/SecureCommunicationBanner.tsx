"use client";

import React from "react";
import CheckIcon from "./svgs/CheckIcon";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";

const SecureCommunicationBanner = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto bg-gradient-to-b from-[#0B0B0B] to-[#00242E] rounded-2xl py-10 px-6 md:px-10 text-white">

      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Columna izquierda */}
        <div className="md:w-1/2 space-y-4">
          <EncryptedLogoSvg width={150} height={50} />
          <h2 className="text-xl md:text-2xl font-semibold">
            Somos especialistas en <br /> soluciones de comunicación segura:
          </h2>
          <div className="w-10 border-b-2 border-[#7EE0FF] mt-2"></div>
        </div>

        {/* Columna derecha */}
        <div className="md:w-1/2 flex flex-col gap-3 text-base md:text-lg font-semibold">
          {[
            "Celulares Seguros",
            "SIM Cards Encriptadas",
            "Protección de Nivel Empresarial",
            "Sistemas de Seguridad Probados",
          ].map((text, idx) => (
            <div className="flex items-center gap-2 text-[#7EE0FF]" key={idx}>
              <CheckIcon className="w-5 h-5 mt-1" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecureCommunicationBanner;
