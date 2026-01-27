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
      return [{ label: "Todos", value: "all" }];
    }

    const filteredByBrand = products.filter((p) => {
      const brand = p.brand as string | undefined;

      if (filters.os && filters.os !== "all") {
        return brand === filters.os;
      }

      return true;
    });

    if (filteredByBrand.length === 0) {
      return [{ label: "Todos", value: "all" }];
    }

    const licenseSet = new Set<string>();

    filteredByBrand.forEach((p) => {
      p.licenseVariants?.forEach((v) => {
        if (!v.licensetime || v.licensetime === "0") return;

        // Si la categoría es "Sistemas" (35), filtrar solo 3, 6 y 12 meses
        if (filters.selectedOption === "35") {
          const allowedTimes = ["3", "6", "12"];
          if (!allowedTimes.includes(String(v.licensetime))) return;
        }

        licenseSet.add(String(v.licensetime));
      });
    });

    if (licenseSet.size === 0) {
      return [{ label: "Todos", value: "all" }];
    }

    const sorted = Array.from(licenseSet).sort(
      (t1, t2) => Number(t1) - Number(t2)
    );

    return [
      { label: "Todos", value: "all" },
      ...sorted.map((time) => ({
        label: `${time} mes${time === "1" ? "" : "es"}`,
        value: time,
      })),
    ];
  }, [products, filters.os]);


  return (
    <div className="flex flex-row space-x-2">
      {/* SOFTWARE */}
      <div className="flex-1">
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2 capitalize">
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
        <h1 className="text-sm text-[#7E7E7E] font-semibold mb-2 whitespace-nowrap capitalize">
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
