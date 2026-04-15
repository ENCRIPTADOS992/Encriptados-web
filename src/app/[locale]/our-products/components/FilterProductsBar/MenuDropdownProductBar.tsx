"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SearchableSelectField from "@/shared/components/SearchableSelectField";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface MenuDropdownProductBarProps {
  options: Option[];
  name: string;
  onChangeExternal?: (value: string) => void;
  externalValue?: string;
}

const MenuDropdownProductBar: React.FC<MenuDropdownProductBarProps> = ({
  options,
  name,
  onChangeExternal,
  externalValue,
}) => {
  const t = useTranslations("OurProductsPage");

  return (
    <SearchableSelectField
      name={name}
      externalValue={externalValue}
      onChangeExternal={onChangeExternal}
      placeholder={t("filterProducts.selectPlacerholder")}
      searchPlaceholder="Buscar..."
      variant="dark"
      searchable={options.length > 5}
      showRadio
      options={options.map((o) => ({
        value: o.value,
        label: o.label,
        icon: o.icon,
      }))}
    />
  );
};

export default MenuDropdownProductBar;
