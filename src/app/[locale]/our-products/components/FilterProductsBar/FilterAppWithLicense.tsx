import React from "react";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import { useTranslations } from "next-intl";
import { ProductFilters } from "@/features/products/types/ProductFilters";
import { Product } from "@/features/products/types/AllProductsResponse";
import { useBrandsFromProducts } from "@/features/products/hooks/useBrandsFromProducts";

interface FilterAppWithLicenseProps {
  filters: ProductFilters;
  updateFilters: (newFilters: Partial<ProductFilters>) => void;
  products?: Product[];
}

const FilterAppWithLicense: React.FC<FilterAppWithLicenseProps> = ({ 
  filters, 
  updateFilters,
  products, 
}) => {
  const t = useTranslations("OurProductsPage");
  const osOptions = useBrandsFromProducts(products);
  console.log("[FilterAppWithLicense] products:", products);

  return (
    <div className="flex flex-row space-x-2">
      {/* SOFTWARE */}
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2">
          {t("filterProducts.software")}
        </h1>
        <MenuDropdownProductBar
          name="os"
          options={osOptions}
          onChangeExternal={(value) => {
            console.log("[FilterAppWithLicense] Cambio de OS:", value);
            updateFilters({ os: value });
          }}
        />
      </div>

      {/* LICENCIA */}
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2 whitespace-nowrap">
          {t("filterProducts.licenseTitle")}
        </h1>
        <MenuDropdownProductBar
          name="license"
          options={[
            { label: "TODO", value: "all" },
            { label: "1 mes", value: "1" },
            { label: "3 meses", value: "3" },
            { label: "6 meses", value: "6" },
            { label: "12 meses", value: "12" },
          ]}
          onChangeExternal={(value) => {
            console.log("[FilterAppWithLicense] Cambio de License:", value);
            updateFilters({ license: String(value) });
          }}
        />
      </div>
    </div>
  );
};

export default FilterAppWithLicense;
