// src/shared/BannerCoverageMobile.tsx
"use client";

export const BannerCoverageMobile = () => {
  return (
    <section className="block sm:hidden bg-white py-10">
      <div className="mx-auto max-w-md px-4">
        <h2 className="text-center text-[22px] leading-tight font-semibold text-black">
          Cobertura en{" "}
          <span className="text-[#00B4FF]">más de 200 países</span>
        </h2>
        <p className="mt-2 text-center text-xs text-[#4B5563]">
          Consulta el costo por GB según el país.
        </p>

        {/* Buscador */}
        <div className="mt-6">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Colombia"
              className="w-full h-[48px] rounded-full border border-[#D1D5DB] px-4 pr-12 text-xs text-[#111827] placeholder:text-[#9CA3AF] outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 my-auto flex h-8 w-8 items-center justify-center rounded-full bg-black"
            >
              <span className="block h-[14px] w-[14px] rounded-full border-2 border-white relative">
                <span className="absolute right-[-3px] bottom-[-3px] h-[6px] w-[2px] rotate-45 bg-white rounded-full" />
              </span>
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="mt-6 overflow-hidden rounded-xl shadow-sm border border-[#E5E7EB]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#003040] text-white text-[11px]">
                <th className="py-2 pl-4 pr-2 font-medium">País</th>
                <th className="py-2 px-2 font-medium">Perfil</th>
                <th className="py-2 px-2 font-medium">1 GB (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#EAF5FF] text-[11px] text-[#111827]">
                <td className="py-2 pl-4 pr-2">Colombia</td>
                <td className="py-2 px-2">SG</td>
                <td className="py-2 px-2">50.14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
