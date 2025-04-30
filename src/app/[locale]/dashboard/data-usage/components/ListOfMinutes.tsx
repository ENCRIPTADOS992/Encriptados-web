import ListOfGBSMonths from "@/shared/components/ListOfGBSMonths";
import React from "react";

const ListOfMinutes = () => {
  const minutesOptions = [
    { label: "10 Minutos", value: "1min" },
    { label: "20GB", value: "20min" },
    { label: "30GB", value: "30min" },
  ];

  return <ListOfGBSMonths name="minutes" options={minutesOptions} />;
};

export default ListOfMinutes;
