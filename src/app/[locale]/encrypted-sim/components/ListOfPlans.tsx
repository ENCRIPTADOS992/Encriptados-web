import PointConect from "@/shared/svgs/PointConect";
import WorldSvg from "@/shared/svgs/WorldSvg";
import React from "react";
import { useFormContext } from "react-hook-form";

type ListOfPlansData = {
  pais: string;
  perfil: string;
  valor_1gb_euros: string;
};

const ListOfPlans = ({ data }: { data: ListOfPlansData[] }) => {
  const { watch } = useFormContext();

  const searchValue = watch("searchinputcountry")?.toLowerCase() || "";

  // Función para eliminar tildes y acentos
  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  if (!searchValue) {
    return null;
  }

  const filteredData = data.filter((item) =>
    removeAccents(item.pais.toLowerCase()).includes(removeAccents(searchValue))
  );

  if (filteredData.length === 0) {
    return null; // No hay resultados filtrados
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full overflow-x-auto bg-white rounded-2xl">
        {" "}
        {/* Contenedor que permite scroll horizontal */}
        <div className="inline-block min-w-full align-middle">
          <div className="border rounded-2xl shadow-lg overflow-hidden">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#003544]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-[#79D8FF] tracking-wider border border-teal-900"
                  >
                    <div className="flex items-center gap-x-2">
                      <WorldSvg color="#79D8FF" height={20} width={20} />
                      <p>País</p>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-[#79D8FF] tracking-wider border border-teal-900"
                  >
                    <div className="flex items-center gap-x-2">
                      <PointConect color="#79D8FF" height={20} width={20} />
                      <p>Perfil</p>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-[#79D8FF] tracking-wider border border-teal-900"
                  >
                    Valor 1 GB en EUROS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-[#F3FCFF] border border-gray-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                      {item.pais}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                      {item.perfil}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                      {item.valor_1gb_euros}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfPlans;
