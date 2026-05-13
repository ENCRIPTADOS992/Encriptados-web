import React from "react";
import Image from "next/image";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { useTranslations } from "next-intl";

interface FilterAppWithLicenseProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const FilterAppWithLicense: React.FC<FilterAppWithLicenseProps> = ({ filters, updateFilters }) => {
  const t = useTranslations("OurProductsPage");
  type ProviderType = "encriptados" | "tim" | "activarapps" | undefined;

  const currentProvider = filters.provider as ProviderType;

  const optionByProvider: Record<any, JSX.Element | undefined> = {
    encriptados: (
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">{t("filterProducts.servicesTitle")}</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          options={[
            { label: t("filterProducts.allOption"), value: "all" },
            { label: t("filterProducts.services.rechargeData"), value: "datarecharge" },
            { label: t("filterProducts.services.esimData"), value: "eSimData" },
            { label: t("filterProducts.services.rechargeMinutes"), value: "minuterecharge" },
            { label: t("filterProducts.services.esimMinutes"), value: "eSimMinutes" },
            { label: t("filterProducts.services.esim"), value: "esim" },
            { label: t("filterProducts.services.physicalSim"), value: "physicsim" },
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
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">{t("filterProducts.servicesTitle")}</h1>
        <MenuDropdownProductBar
          name="timprovider"
          options={[
            { label: t("filterProducts.allOption"), value: "all" },
            { label: t("filterProducts.services.rechargeData"), value: "datarechargetim" },
            { label: t("filterProducts.services.esimData"), value: "esimplusdatatim" },
            { label: t("filterProducts.services.physicalSim"), value: "physicsimtim" },
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
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">{t("filterProducts.servicesTitle")}</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          options={[{ label: t("filterProducts.allOption"), value: "all" }]}
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
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">{t("filterProducts.providerTitle")}</h1>
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
