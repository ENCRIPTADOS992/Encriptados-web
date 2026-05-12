import React from "react";
import Image from "next/image";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import { ProductFilters } from "@/features/products/types/ProductFilters";

interface FilterAppWithLicenseProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const FilterAppWithLicense: React.FC<FilterAppWithLicenseProps> = ({ filters, updateFilters }) => {
  type ProviderType = "encriptados" | "tim" | "activarapps" | undefined;

  const currentProvider = filters.provider as ProviderType;

  const optionByProvider: Record<any, JSX.Element | undefined> = {
    encriptados: (
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          options={[
            { label: "Todo", value: "all" },
            { label: "Recarga Datos", value: "datarecharge" },
            { label: "eSIM + Datos", value: "eSimData" },
            { label: "Recarga Minutos", value: "minuterecharge" },
            { label: "eSIM + Minutos", value: "eSimMinutes" },
            { label: "eSim", value: "esim" },
            { label: "Sim Física", value: "physicsim" },
          ]}
          onChangeExternal={(value) => {
            const normalized = Array.isArray(value)
              ? value[value.length - 1]
              : value;

            console.log(
              "[FilterAppWithLicense] Cambio de encriptadosprovider (normalizado):",
              normalized
            );

            updateFilters({ encriptadosprovider: normalized });
          }}
        />
      </div>
    ),
    tim: (
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="timprovider"
          options={[
            { label: "Todo", value: "all" },
            { label: "Recarga Datos", value: "datarechargetim" },
            { label: "eSIM + Datos", value: "esimplusdatatim" },
            { label: "SIM Física", value: "physicsimtim" },
          ]}
          onChangeExternal={(value) => {
            console.log("[FilterAppWithLicense] Cambio de timprovider:", value);
            updateFilters({ timprovider: value });
          }}
        />
      </div>
    ),
    activarapps: (
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          options={[{ label: "Todos", value: "all" }]}
          onChangeExternal={() => {
            updateFilters({ encriptadosprovider: "all" });
          }}
        />
      </div>
    ),
  };

  const providerLogoClass = "h-[25px] w-auto max-w-[144px] object-contain";

  const encriptadosProviderIcon = (
    <Image
      src="/icons/sim_encriptada.svg"
      alt=""
      width={137}
      height={34}
      className={providerLogoClass}
      loading="lazy"
    />
  );

  const timProviderIcon = (
    <Image
      src="/icons/sim_tim.svg"
      alt=""
      width={106}
      height={34}
      className={providerLogoClass}
      loading="lazy"
    />
  );

  const activarAppsProviderIcon = (
    <Image
      src="/icons/activar_apps.svg"
      alt=""
      width={144}
      height={34}
      className={providerLogoClass}
      loading="lazy"
    />
  );

  return (
    <div className="flex flex-row space-x-2">
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Proveedor</h1>
        <MenuDropdownProductBar
          name="provider"
          options={[
            {
              label: " ",
              value: "encriptados",
              icon: encriptadosProviderIcon,
            },
            {
              label: " ",
              value: "tim",
              icon: timProviderIcon,
            },
            {
              label: " ",
              value: "activarapps",
              icon: activarAppsProviderIcon,
            },
          ]}
          onChangeExternal={(value) => {
            console.log("[FilterAppWithLicense] Cambio de provider:", value);
            updateFilters({ provider: value });
          }}
        />
      </div>

      {currentProvider && optionByProvider[currentProvider]}
    </div>
  );
};

export default FilterAppWithLicense;
