import React from "react";
import Region from "./Region";

import { useFormContext, UseFormWatch } from "react-hook-form";
import ListOfRegions from "../ListOfRegions/ListOfRegions";
import ListOfCountries from "../ListOfCountries/ListOfCountries";
import SearchInput from "../SearchInput";

interface RegionOption {
  label: string;
  value: string;
}

interface FormValues {
  selectedregion: "region" | "country";
}

const SimData: React.FC = () => {
  const Regions: RegionOption[] = [
    {
      label: "Región",
      value: "region",
    },
    {
      label: "País",
      value: "country",
    },
  ];

  const { watch }: { watch: UseFormWatch<FormValues> } =
    useFormContext<FormValues>();
  const selectedRegion = watch("selectedregion");

  const renderRegionComponent: { [key: string]: JSX.Element | null } = {
    country: <ListOfCountries />,
    region: <ListOfRegions />,
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-wrap">
      {/* Selector and Input */}
      <div className="flex flex-col md:flex-row gap-4 px-4 md:px-0 mt-8 w-full">
        {/* Region Selector */}
        <Region options={Regions} name="selectedregion" />
        {/* Search Input */}
        <div className="w-full mt-4 md:mt-0">
          <SearchInput
            inputClassName="border-4 border-[#DCF2F8] focus:outline-none focus:border-[#DCF2F8] w-full"
            iconPosition="right"
            placeholder={
              selectedRegion === "country"
                ? "Buscar por país"
                : "Buscar por región"
            }
            name="country"
          />
        </div>
      </div>

      {/* Render Content */}
      <div className="px-4 md:px-0 mt-8 mb-8 w-full">
        {renderRegionComponent[selectedRegion]}
      </div>
    </div>
  );
};

export default SimData;
