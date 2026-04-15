"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import SearchableSelect, {
  SearchableSelectProps,
} from "./SearchableSelect";

export interface SearchableSelectFieldProps
  extends Omit<SearchableSelectProps, "value" | "onChange"> {
  /** Field name for react-hook-form */
  name: string;
  /** Valor externo que toma prioridad sobre el de react-hook-form */
  externalValue?: string;
  /** Callback externo adicional al cambiar valor */
  onChangeExternal?: (value: string) => void;
}

export default function SearchableSelectField({
  name,
  externalValue,
  onChangeExternal,
  ...rest
}: SearchableSelectFieldProps) {
  const { control, watch } = useFormContext();
  const watchedValue = watch(name);

  const currentValue =
    externalValue !== undefined ? externalValue : watchedValue;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={currentValue || ""}
      render={({ field: { onChange } }) => (
        <SearchableSelect
          {...rest}
          value={currentValue}
          onChange={(val) => {
            onChange(val);
            onChangeExternal?.(val);
          }}
        />
      )}
    />
  );
}
