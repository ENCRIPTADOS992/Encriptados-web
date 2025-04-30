import ListOfGBSMonths from "@/shared/components/ListOfGBSMonths";
import React from "react";

const ListOfMsi = () => {
  const msiOptions = [
    { label: "5 MSI", value: "1msi" },
    { label: "10 MSI", value: "10msi" },
    { label: "15 MSI", value: "15msi" },
  ];

  return <ListOfGBSMonths name="msi" options={msiOptions} />;
};

export default ListOfMsi;
