"use client";

import React from "react";
import CheckIcon from "./svgs/CheckIcon";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";

const SecureCommunicationBanner = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto bg-gradient-to-b from-[#0B0B0B] to-[#00242E] rounded-3xl py-10 px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 text-white">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Columna izquierda — alineada natural con padding global */}
          <div className="md:w-1/2 space-y-2 pl-4 md:pl-16 -mt-8">
            <EncryptedLogoSvg width={180} height={80} />
            <h2 className="text-xl md:text-2xl font-semibold leading-snug">
              Somos especialistas en <br /> soluciones de comunicación <br />{" "}
              segura:
            </h2>
            <div className="w-10 border-b-2 border-[#7EE0FF] mt-2"></div>
          </div>

          {/* Columna derecha — separada del borde y alineada */}
          <div className="md:w-1/2 pt-2 pr-10 md:pl-[78px] ml-auto flex flex-col gap-3 text-base md:text-lg font-semibold">
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
      </div>
    </section>
  );
};

export default SecureCommunicationBanner;
