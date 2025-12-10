// src/app/[locale]/our-products/components/BannerCoverageDesktop.tsx
"use client";

export const BannerCoverageDesktop = () => {
  return (
    <section className="hidden lg:block bg-white py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Título */}
        <h2 className="text-center text-[32px] leading-tight font-semibold text-black">
          Cobertura en <span className="text-[#00B4FF]">más de 200 países</span>
        </h2>
        <p className="mt-3 text-center text-base text-[#4B5563] max-w-2xl mx-auto">
          Consulta el costo del gigabyte según el país y el perfil recomendado,
          así optimizas el consumo de tus datos al mejor precios
        </p>

        {/* Buscador */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[640px] relative">
            <input
              type="text"
              placeholder="Colombia"
              className="w-full h-[56px] rounded-full border border-[#D1D5DB] px-6 pr-16 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 my-auto flex h-10 w-10 items-center justify-center rounded-full bg-black"
            >
              {/* Ícono lupa simple */}
              <span className="block h-[18px] w-[18px] rounded-full border-2 border-white relative">
                <span className="absolute right-[-4px] bottom-[-4px] h-[8px] w-[2px] rotate-45 bg-white rounded-full" />
              </span>
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="mt-8 overflow-hidden rounded-xl shadow-sm border border-[#E5E7EB]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#003040] text-white text-sm">
                <th className="py-3 pl-6 pr-4 font-medium">País</th>
                <th className="py-3 px-4 font-medium">Perfil</th>
                <th className="py-3 px-4 font-medium">Valor de 1 GB en USD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#EAF5FF] text-sm text-[#111827]">
                <td className="py-3 pl-6 pr-4">Colombia</td>
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
