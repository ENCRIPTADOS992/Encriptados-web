import ListOfGBSMonths from "@/shared/components/ListOfGBSMonths";
import React from "react";

const ListOfData = () => {
  const gigabyteOptions = [
    { label: "1GB", value: "1gb" },
    { label: "10GB", value: "10gb" },
    { label: "15GB", value: "15gb" },
  ];

  return <ListOfGBSMonths name="gigabyteoptions" options={gigabyteOptions} />;
};

export default ListOfData;
