// src/app/[locale]/our-products/components/BannerCoverageDesktop.tsx
"use client";

import { useTranslations } from "next-intl";

export const BannerCoverageDesktop = () => {
  const t = useTranslations("OurProductsPage.coverageBanner");

  return (
    <section className="hidden lg:block bg-white py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-[32px] leading-tight font-semibold">
          <span className="bg-gradient-to-r from-[#33CDFB] via-[#0EA5E9] to-[#1E3A8A] bg-clip-text text-transparent">{t("title")}</span>
        </h2>
        <p className="mt-3 text-center text-base text-[#4B5563] max-w-2xl mx-auto">
          {t("desktopDescription")}
        </p>

        {/* Buscador */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[640px] relative">
            <button
              type="button"
              className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              {/* Ícono lupa simple */}
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full h-[56px] rounded-full border border-[#D1D5DB] pl-14 pr-6 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:outline-none focus:border-[#33CDFB] transition-colors"
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="mt-8 overflow-hidden rounded-xl shadow-sm border border-[#E5E7EB]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#003040] text-white text-sm">
                <th className="py-3 pl-6 pr-4 font-medium">{t("countryHeader")}</th>
                <th className="py-3 px-4 font-medium">{t("profileHeader")}</th>
                <th className="py-3 px-4 font-medium">{t("gbValueHeader")}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#EAF5FF] text-sm text-[#111827]">
                <td className="py-3 pl-6 pr-4">{t("sampleCountry")}</td>
                <td className="py-3 px-4">SG</td>
                <td className="py-3 px-4">50.14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
