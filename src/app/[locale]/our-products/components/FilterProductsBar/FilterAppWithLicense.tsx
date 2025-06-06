import React from "react";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import { useTranslations } from "next-intl";
import { ProductFilters } from "@/features/products/types/ProductFilters";


interface FilterAppWithLicenseProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
}

const FilterAppWithLicense: React.FC<FilterAppWithLicenseProps> = ({ filters, updateFilters }) => {
  const t = useTranslations("OurProductsPage");
  return (
    <>
      <div className="w-full lg:w-auto">
        <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
          {t("filterProducts.software")}
        </h1>
      <MenuDropdownProductBar
        name="os"
        options={[
          { label: "TODO", value: "all" },
          { label: "Secure Cryptra", value: "Secure Crypt" },
          { label: "Other Option", value: "Other Option" },
        ]}
        onChangeExternal={(value) => {
          console.log("[FilterAppWithLicense] Cambio de OS:", value);
          updateFilters({ os: value });
        }}
      />
      </div>
      <div className="w-full lg:w-auto lg:ml-4">
        <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
          {t("filterProducts.licenseTitle")}
        </h1>
        <MenuDropdownProductBar
          name="license"
          options={[
            { label: "TODO", value: "all" },
            { label: "1 mes", value: "1month" },
            { label: "6 meses", value: "6month" },
            { label: "9 meses", value: "9month" },
            { label: "12 meses", value: "12month" },
          ]}
          onChangeExternal={(value) => {
            console.log("[FilterAppWithLicense] Cambio de License:", value);
            updateFilters({ license: value });
          }}
        />
      </div>
    </>
  );
};

export default FilterAppWithLicense;
