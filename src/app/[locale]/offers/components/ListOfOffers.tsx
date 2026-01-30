"use client";

import React from "react";
import FiltersOffers from "./FiltersOffers";
import { useTranslations } from "next-intl";
import { BadgePercent } from "lucide-react";

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

      <div className="flex items-center justify-center w-full mt-9">
        <div className="w-full max-w-[1036px] bg-[#0A0A0A] rounded-[30px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 min-h-[400px]">

          <div className="flex flex-col items-center md:items-start gap-4 max-w-[320px]">
            <BadgePercent className="w-12 h-12 text-[#FFFFFF]" />
            <p
              className="text-[#FFFFFF] text-[24px] md:text-[34px] leading-[100%] tracking-normal text-center md:text-left"
              style={{ fontWeight: 300, fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {o("noOffers")}
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <img
              src="/images/offers/Web search-pana.webp"
              alt="No offers available"
              className="w-full max-w-[280px] md:max-w-[340px] lg:max-w-[420px]"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListOfOffers;

