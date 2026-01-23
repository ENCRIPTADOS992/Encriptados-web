"use client";

import React from "react";
import FiltersOffers from "./FiltersOffers";
import { useTranslations } from "next-intl";

// Temporalmente deshabilitado - no cargar productos
const LOAD_OFFERS = false;

const ListOfOffers = () => {
  const o = useTranslations("OffersPage");

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <h2 className="text-white font-bold mb-6 text-[24px] sm:text-[30px] lg:text-[38px] leading-[1.3]">{o("exclusiveOffersTitle")}</h2>
      <div className="w-full max-w-[720px] mx-auto">
        <FiltersOffers
          items={[
            { label: o("menu.sims"), value: "sims" },
            { label: o("menu.apps"), value: "apps" },
            { label: o("menu.system"), value: "system" },
          ]}
          name={"currentoffer"}
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-2 md:px-4 grid grid-cols-1 gap-2 md:gap-4 text-black mt-9 min-h-[320px] sm:min-h-[420px]">
          {/* Temporalmente deshabilitado - mostrar mensaje de próximamente */}
          <div className="col-span-full">
            <div className="w-full bg-[#111111] rounded-2xl px-6 py-10 text-center text-white/80 min-h-[320px] sm:min-h-[420px] flex flex-col items-center justify-center gap-4">
              <p className="text-2xl sm:text-3xl font-bold text-white">Próximamente</p>
              <p className="text-base sm:text-lg">Estamos preparando ofertas exclusivas para ti.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfOffers;

