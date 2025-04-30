import React from "react";
import MenuDropdownProductBar from "./MenuDropdownProductBar";

import { useFormContext } from "react-hook-form";
import EncryptedSimIcon from "./simicons/EncryptedSimIcon";
import IraSimIcon from "./simicons/IraSimIcon";
import TimSimIcon from "./simicons/TimSimIcon";

const FilterAppWithLicense = () => {
  type ProviderType = "encriptados" | "ira" | "tim" | undefined;

  const { watch } = useFormContext();

  const currentProvider = watch("provider") as ProviderType;
  const optionByProvider: Record<any, JSX.Element | undefined> = {
    encriptados: (
      <>
        <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">Servicios</h1>
        <MenuDropdownProductBar
          name="encriptadosprovider"
          options={[
            { label: "TODO", value: "all" },
            { label: "Sim Física", value: "physicsim" },
            { label: "eSim", value: "esim" },
            { label: "Recarga Datos", value: "datarecharge" },
            { label: "Recarga Minutos", value: "minuterecharge" },
            { label: "Recarga IMSI", value: "imsi" },
          ]}
        />
      </>
    ),
    ira: (
      <>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full ">
            <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
              Servicios
            </h1>
            <div className="w-full">
              <MenuDropdownProductBar
                name="iraprovider"
                options={[
                  { label: "Sim Física", value: "physicsimira" },
                  { label: "eSim + Datos", value: "esimplusdataira" },
                  { label: "Recarga Datos", value: "datarechargeira" },
                ]}
              />
            </div>
          </div>
          <div className="w-full ">
            <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
              Región y país
            </h1>
            <MenuDropdownProductBar
              name="iracountry"
              options={[{ label: "Colombia", value: "col" }]}
            />
          </div>
        </div>
      </>
    ),
    tim: (
      <>
        <div className="flex items-center justify-center gap-4">
          <div className="w-full ">
            <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
              Servicios
            </h1>
            <MenuDropdownProductBar
              name="timprovider"
              options={[
                { label: "Sim Física", value: "physicsimtim" },
                { label: "eSim + Datos", value: "esimplusdatatim" },
                { label: "Recarga Datos", value: "datarechargetim" },
              ]}
            />
          </div>
          <div className="w-full ">
            <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">
              Región y país
            </h1>
            <MenuDropdownProductBar
              name="timcountry"
              options={[{ label: "Colombia", value: "col" }]}
            />
          </div>
        </div>
      </>
    ),
  };

  return (
    <>
      <div className="w-full lg:w-auto">
        <h1 className="text-[rgb(8,93,119)] font-semibold mb-2">Proveedor</h1>
        <MenuDropdownProductBar
          name="provider"
          options={[
            {
              label: "TODO",
              value: "all",
              icon: "",
            },
            {
              label: " ",
              value: "encriptados",
              icon: <EncryptedSimIcon />,
            },
            { label: " ", value: "ira", icon: <IraSimIcon /> },
            { label: " ", value: "tim", icon: <TimSimIcon /> },
          ]}
        />
      </div>
      <div className="w-full lg:w-auto lg:ml-4">
        {currentProvider && optionByProvider[currentProvider]}
      </div>
    </>
  );
};

export default FilterAppWithLicense;
