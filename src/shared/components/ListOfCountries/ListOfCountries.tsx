import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Country {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
}

const CountryList: React.FC = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { getValues, watch } = useFormContext();

  console.log(watch());

  useEffect(() => {
    const fetchCountries = async () => {
      const countryName = getValues("country") || "Colombia"; // Usa "Colombia" si no hay entrada

      try {
        const response = await axios.get<Country[]>(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [getValues("country")]);

  if (loading) {
    return <div className="text-center text-lg">Cargando...</div>;
  }

  const currentRedirect: Record<string, string> = {
    irasim: "ira-sim/payment-service#buy-section",
    timsim: "tim-sim/payment-service#buy-section",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 w-full gap-2">
      {countries.map((country, index) => (
        <div
          key={index}
          onClick={() => {
            router.push(currentRedirect[watch("optionType")]);
          }}
        >
          <CountryCard key={country.cca3} country={country} />
        </div>
      ))}
    </div>
  );
};

export default CountryList;
