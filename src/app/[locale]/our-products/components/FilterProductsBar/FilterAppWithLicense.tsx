import React from "react";
import MenuDropdownProductBar from "./MenuDropdownProductBar";
import { useTranslations } from "next-intl";

const FilterAppWithLicense = () => {
  const t = useTranslations("OurProductsPage");
  return (
    <>
      <div className="w-full lg:w-auto">
        <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
          {t("filterProducts.osTitle")}
        </h1>
        <MenuDropdownProductBar
          name="os"
          options={[
            { label: "TODO", value: "all" },
            { label: "Secure Cryptra", value: "Secure Crypt" },
            { label: "Other Option", value: "Other Option" },
          ]}
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
            {
              label: "1 mes",
              value: "1month",
            },
            {
              label: "6 meses",
              value: "6month",
            },
            {
              label: "9 meses",
              value: "9month",
            },
            {
              label: "12 meses",
              value: "12month",
            },
          ]}
        />
      </div>
    </>
  );
};

export default FilterAppWithLicense;
