"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

type CountryCost = {
  country: string;
  profile: string;
  pricePerGb: string;
};

const DEFAULT_ROWS: CountryCost[] = [
  { country: "Canadá", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Reino Unido", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Japón", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Argentina", profile: "5G", pricePerGb: "7,78 €" },
  { country: "España", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Sudáfrica", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Brasil", profile: "5G", pricePerGb: "7,78 €" },
  { country: "México", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Bolivia", profile: "5G", pricePerGb: "7,78 €" },
  { country: "Francia", profile: "5G", pricePerGb: "7,78 €" },
];

interface DataCostsByCountryProps {
  rows?: CountryCost[];
}

export function DataCostsByCountry({ rows = DEFAULT_ROWS }: DataCostsByCountryProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredRows = useMemo(
    () =>
      rows.filter((r) =>
        r.country.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [rows, query]
  );

  return (
    <>
      {/* BOTÓN QUE DETONA LA MODAL */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          w-full md:w-auto
          inline-flex items-center justify-center gap-2
          rounded-[12px]
          border border-[#C4EAD2]
          bg-[#E8F9F0]
          px-4 py-2
          text-[13px] font-medium text-[#1E8A4C]
          mb-6
        "
      >
        <span className="relative w-4 h-4">
          <Image
            src="/images/encrypted-sim/icons/travel_explore.png"
            alt="Explorar países"
            fill
            className="object-contain"
          />
        </span>
        <span>Ver costos de GB por país</span>
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-3xl mx-4 rounded-2xl bg-white p-6 md:p-8 shadow-xl">
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Título y descripción */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              Tarifas y <span className="text-[#1E8A4C]">costos de datos</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Busca el lugar donde consumirás tus datos, ten en cuenta que el
              costo de consumo de datos varía según el país / región.
            </p>

            {/* Buscador */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar país..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#1E8A4C] focus:ring-1 focus:ring-[#1E8A4C]"
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tabla */}
            <div className="mt-2 overflow-hidden rounded-xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm table-fixed">
                  {/* Anchos de columnas */}
                  <colgroup>
                    <col className="w-[430px]" /> {/* País */}
                    <col className="w-[170px]" /> {/* Perfil */}
                    <col className="w-[245px]" /> {/* Valor 1 GB */}
                  </colgroup>

                  <thead className="bg-[#003544] text-xs font-medium uppercase text-white">
                    <tr>
                      <th className="h-[52px] px-6 rounded-tl-[12px]">
                        <div className="flex items-center gap-2">
                          <span className="relative w-4 h-4">
                            <Image
                              src="/images/encrypted-sim/icons/globe.png"
                              alt="País"
                              fill
                              className="object-contain"
                            />
                          </span>
                          <span>País</span>
                        </div>
                      </th>

                      <th className="h-[52px] px-6">
                        <div className="flex items-center gap-2">
                          <span className="relative w-4 h-4">
                            <Image
                              src="/images/encrypted-sim/icons/online_prediction.png"
                              alt="Perfil"
                              fill
                              className="object-contain"
                            />
                          </span>
                          <span>Perfil</span>
                        </div>
                      </th>

                      <th className="h-[52px] px-6 rounded-tr-[12px]">
                        Valor 1 GB en EUROS
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {filteredRows.map((row, idx) => {
                      const isSelected = selectedIndex === idx;

                      return (
                        <tr
                          key={`${row.country}-${idx}`}
                          onClick={() => setSelectedIndex(idx)}
                          className={`
                            cursor-pointer
                            ${isSelected ? "bg-[#E0F3F9]" : "bg-[#F3FCFF]"}
                          `}
                        >
                          <td className="h-[52px] px-6 text-[13px] text-gray-800">
                            {row.country}
                          </td>
                          <td className="h-[52px] px-6 text-[13px] text-gray-800">
                            {row.profile}
                          </td>
                          <td className="h-[52px] px-6 text-[13px] text-gray-800">
                            {row.pricePerGb}
                          </td>
                        </tr>
                      );
                    })}

                    {filteredRows.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-4 text-center text-sm text-gray-500 bg-white"
                        >
                          No se encontraron países con ese nombre.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
