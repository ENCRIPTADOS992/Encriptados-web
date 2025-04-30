import React from "react";
import CardOfRegion from "./CardOfRegion";
import AfricaSvg from "./svgs/AfricaSvg";
import AsiaSvg from "./svgs/AsiaSvg";
import CaribeanIslandSvg from "./svgs/CaribeanIslandSvg";
import EuropeSvg from "./svgs/EuropeSvg";
import GlobalSvg from "./svgs/GlobalSvg";
import LatinAmericSvg from "./svgs/LatinAmericSvg";
import MidOrientAmericSvg from "./svgs/MidOrientAmericSvg";
import NorthAmericSvg from "./svgs/NorthAmericSvg";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

const ListOfRegions = () => {
  const regions = [
    { name: "Global", icon: <GlobalSvg height={35} width={35} /> },
    { name: "Europa", icon: <EuropeSvg height={35} width={35} /> },
    { name: "Asia", icon: <AsiaSvg height={35} width={35} /> },
    {
      name: "América del Norte",
      icon: <NorthAmericSvg height={35} width={35} />,
    },
    {
      name: "Oriente Medio y el norte de África",
      icon: <MidOrientAmericSvg height={35} width={35} />,
    },
    { name: "Latinoamérica", icon: <LatinAmericSvg height={35} width={35} /> },
    { name: "África", icon: <AfricaSvg height={35} width={35} /> },
    {
      name: "Islas del Caribe",
      icon: <CaribeanIslandSvg height={35} width={35} />,
    },
  ];

  const router = useRouter();

  const currentRedirect: Record<string, string> = {
    irasim: "ira-sim/payment-service#buy-section",
    timsim: "tim-sim/payment-service#buy-section",
  };

  const { watch } = useFormContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6  w-full">
      {regions.map((region, index) => (
        <div
          key={index}
          onClick={() => {
            router.push(currentRedirect[watch("optionType")]);
          }}
        >
          <CardOfRegion key={index} region={region.name} icon={region.icon} />
        </div>
      ))}
    </div>
  );
};

export default ListOfRegions;
