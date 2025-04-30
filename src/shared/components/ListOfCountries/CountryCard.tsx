import React from "react";
import Image from "next/image";

interface Country {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
}

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className=" my-4 border  shadow-lg   bg-white rounded-full w-full flex justify-start p-4 items-center cursor-pointer ">
      <div className="relative  min-w-8 min-h-8 rounded-full overflow-hidden mr-3">
        <Image
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h2 className="text-base font-bold text-gray-700 ">
        {country.name.common}
      </h2>

      <div></div>
    </div>
  );
};

export default CountryCard;
