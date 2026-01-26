import React from "react";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import FilterRegionCountry from "./FilterRegionCountry";

import { useFormContext } from "react-hook-form";
import EncryptedSimIcon from "./simicons/EncryptedSimIcon";
import IraSimIcon from "./simicons/IraSimIcon";
import TimSimIcon from "./simicons/TimSimIcon";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";

interface FilterAppWithLicenseProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const FilterAppWithLicense: React.FC<FilterAppWithLicenseProps> = ({ filters, updateFilters }) => {
  type ProviderType = "encriptados" | "tim" | undefined;

  const currentProvider = filters.provider as ProviderType;

  const optionByProvider: Record<any, JSX.Element | undefined> = {
    encriptados: (
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          options={[
            { label: "Todo", value: "all" },
            { label: "Sim Física", value: "physicsim" },
            { label: "eSim", value: "esim" },
            { label: "Recarga Datos", value: "datarecharge" },
            { label: "Recarga Minutos", value: "minuterecharge" },
            { label: "eSIM + Datos", value: "eSimData" },
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
            { label: "Sim Física", value: "physicsimtim" },
            { label: "eSIM + Datos", value: "esimplusdatatim" },
            { label: "Recarga Datos", value: "datarechargetim" },
          ]}
          onChangeExternal={(value) => {
            console.log("[FilterAppWithLicense] Cambio de timprovider:", value);
            updateFilters({ timprovider: value });
          }}
        />
      </div>
    ),
  };

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
              icon: <EncryptedSimIcon width={100} height={25}
              />
            },
            {
              label: " ",
              value: "tim",
              icon: <TimSimIcon width={100} height={25}
              />
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
