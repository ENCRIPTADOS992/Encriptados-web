import React, { useMemo } from "react";
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

    const licenseOptions = useMemo(() => {
    if (!products || products.length === 0) {
      return [{ label: "TODO", value: "all" }];
    }

    const filteredByBrand = products.filter((p) => {
      const brand = (p as any).brand as string | undefined;

      if (filters.os && filters.os !== "all") {
        return brand === filters.os;
      }

      return true; 
    });

    if (filteredByBrand.length === 0) {
      return [{ label: "TODO", value: "all" }];
    }

    const set = new Set<string>();

    filteredByBrand.forEach((p) => {
      const lt = (p as any).licensetime as string | undefined;
      if (lt && lt !== "0") {
        set.add(lt);
      }
    });

    const sorted = Array.from(set).sort(
      (a, b) => Number(a) - Number(b)
    );

    if (sorted.length === 0) {
      return [{ label: "TODO", value: "all" }];
    }

    return [
      { label: "TODO", value: "all" },
      ...sorted.map((val) => ({
        label: `${val} mes${val === "1" ? "" : "es"}`,
        value: val,
      })),
    ];
  }, [products, filters.os]);



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
          options={licenseOptions}
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
