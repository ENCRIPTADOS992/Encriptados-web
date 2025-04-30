import React from "react";

type CardUsageProps = {
  title: string;
  price: string | number;
};

const CardUsage = ({ title, price }: CardUsageProps) => {
  return (
    <div className="bg-white px-9 py-7 flex flex-col gap-y-4  justify-center  rounded-2xl shadow-md">
      <h3 className="text-black text-sm">
        <span className="font-bold">$</span> {title}
      </h3>
      <p className="font-bold text-black text-2xl">{price}</p>
    </div>
  );
};

export default CardUsage;
