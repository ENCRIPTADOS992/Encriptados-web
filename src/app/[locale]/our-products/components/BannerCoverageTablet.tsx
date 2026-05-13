// src/shared/BannerCoverageTablet.tsx
"use client";

import { useTranslations } from "next-intl";

export const BannerCoverageTablet = () => {
  const t = useTranslations("OurProductsPage.coverageBanner");

  return (
    <section className="hidden sm:block lg:hidden bg-white py-12">
      <div className="mx-auto max-w-[720px] px-6">
        <h2 className="text-center text-[26px] leading-tight font-semibold text-black">
          {t("titlePrefix")} <span className="text-[#00B4FF]">{t("titleHighlight")}</span>
        </h2>
        <p className="mt-3 text-center text-sm text-[#4B5563] max-w-xl mx-auto">
          {t("tabletDescription")}
        </p>

        {/* Buscador */}
        <div className="mt-7 flex justify-center">
          <div className="w-full max-w-[560px] relative">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full h-[52px] rounded-full border border-[#D1D5DB] px-5 pr-14 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 my-auto flex h-9 w-9 items-center justify-center rounded-full bg-black"
            >
              <span className="block h-[16px] w-[16px] rounded-full border-2 border-white relative">
                <span className="absolute right-[-3px] bottom-[-3px] h-[7px] w-[2px] rotate-45 bg-white rounded-full" />
              </span>
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="mt-7 overflow-hidden rounded-xl shadow-sm border border-[#E5E7EB]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#003040] text-white text-xs">
                <th className="py-3 pl-5 pr-3 font-medium">{t("countryHeader")}</th>
                <th className="py-3 px-3 font-medium">{t("profileHeader")}</th>
                <th className="py-3 px-3 font-medium">{t("gbShortHeader")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#EAF5FF] text-xs text-[#111827]">
                <td className="py-3 pl-5 pr-3">{t("sampleCountry")}</td>
                <td className="py-3 px-3">SG</td>
                <td className="py-3 px-3">50.14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
