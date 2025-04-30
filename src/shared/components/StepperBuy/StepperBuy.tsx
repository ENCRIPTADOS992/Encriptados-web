import React, { useEffect } from "react";
import SelectCard from "./SelectCard";
import { useFormContext } from "react-hook-form";
import PhySim from "@/shared/svgs/PhySimSvg";
import RechargeBuy from "@/shared/svgs/RechargeBuySvg";
import DotsSvg from "@/shared/svgs/DotsSvg";
import SimData from "./SimData";
import RechargeSim from "../RechargeSim/RechargeSim";

const StepperBuy = ({
  optionType,
}: {
  optionType?: "irasim" | "timsim" | "encriptados-sim";
}) => {
  const { watch, setValue } = useFormContext();

  //change context of render payment url in case optionType "bme" will redirect to payments of bme for example
  useEffect(() => {
    setValue("optionType", optionType);
  }, [optionType]);

  const selectedValue = watch("selectedcardvalue");

  const ICON_SIZE = 50;
  const SELECTED_COLOR = "#35CDFB";
  const DEFAULT_COLOR = "gray";

  const allOptions = [
    {
      label: "eSIM + Datos",
      value: "esim_recharge",
      icon: (
        <DotsSvg
          color={
            selectedValue === "esim_recharge" ? SELECTED_COLOR : DEFAULT_COLOR
          }
          height={ICON_SIZE}
          width={ICON_SIZE}
          aria-label="eSIM + recarga"
        />
      ),
    },
    // {
    //   label: "SIM Física",
    //   value: "physical_sim",
    //   icon: (
    //     <PhySim
    //       color={
    //         selectedValue === "physical_sim" ? SELECTED_COLOR : DEFAULT_COLOR
    //       }
    //       height={ICON_SIZE}
    //       width={ICON_SIZE}
    //       aria-label="SIM Física"
    //     />
    //   ),
    // },
    {
      label: "Recargar eSIM",
      value: "recharge_esim",
      icon: (
        <RechargeBuy
          color={
            selectedValue === "recharge_esim" ? SELECTED_COLOR : DEFAULT_COLOR
          }
          height={ICON_SIZE}
          width={ICON_SIZE}
          aria-label="Recargar eSIM"
        />
      ),
    },
  ];

  const filteredOptions =
    optionType === "encriptados-sim"
      ? [
          {
            label: "SIM Física",
            value: "physical_sim",
            icon: (
              <PhySim
                color={
                  selectedValue === "physical_sim"
                    ? SELECTED_COLOR
                    : DEFAULT_COLOR
                }
                height={ICON_SIZE}
                width={ICON_SIZE}
                aria-label="SIM Física"
              />
            ),
          },
        ]
      : optionType === "irasim" || optionType === "timsim"
      ? allOptions
      : null;
  const renderOptions: { [key: string]: JSX.Element } = {
    esim_recharge: <SimData />,
    recharge_esim: <RechargeSim />,
  };

  return (
    <>
      <div className="w-full">
        <SelectCard options={filteredOptions} name="selectedcardvalue" />
      </div>

      {renderOptions[selectedValue]}
    </>
  );
};

export default StepperBuy;
