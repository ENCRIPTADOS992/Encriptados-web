"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import Flag from "react-world-flags";

export const CountriesRadar = () => {
  const { watch } = useFormContext();
  const country = watch("country");

  const countries = [
    {
      code: "US",
      name: "United States",
      url: "https://coinatmradar.com/country/226/bitcoin-atm-united-states/",
      locations: 32737,
    },
    {
      code: "CA",
      name: "Canada",
      url: "https://coinatmradar.com/country/58/bitcoin-atm-canada/",
      locations: 2444,
    },
    {
      code: "ES",
      name: "Spain",
      url: "https://coinatmradar.com/country/192/bitcoin-atm-spain/",
      locations: 227,
    },
    {
      code: "SV",
      name: "El Salvador",
      url: "https://coinatmradar.com/country/70/bitcoin-atm-el-salvador/",
      locations: 204,
    },
    {
      code: "PL",
      name: "Poland",
      url: "https://coinatmradar.com/country/159/bitcoin-atm-poland/",
      locations: 184,
    },
    {
      code: "CH",
      name: "Switzerland",
      url: "https://coinatmradar.com/country/191/bitcoin-atm-switzerland/",
      locations: 148,
    },
    {
      code: "HK",
      name: "Hong Kong",
      url: "https://coinatmradar.com/country/103/bitcoin-atm-hong-kong/",
      locations: 148,
    },
    {
      code: "AT",
      name: "Austria",
      url: "https://coinatmradar.com/country/13/bitcoin-atm-austria/",
      locations: 139,
    },
    {
      code: "RO",
      name: "Romania",
      url: "https://coinatmradar.com/country/170/bitcoin-atm-romania/",
      locations: 130,
    },
    {
      code: "IT",
      name: "Italy",
      url: "https://coinatmradar.com/country/105/bitcoin-atm-italy/",
      locations: 76,
    },
    {
      code: "CZ",
      name: "Czech Republic",
      url: "https://coinatmradar.com/country/55/bitcoin-atm-czech-republic/",
      locations: 74,
    },
    {
      code: "GR",
      name: "Greece",
      url: "https://coinatmradar.com/country/96/bitcoin-atm-greece/",
      locations: 67,
    },
    {
      code: "AU",
      name: "Australia",
      url: "https://coinatmradar.com/country/14/bitcoin-atm-australia/",
      locations: 56,
    },
    {
      code: "SK",
      name: "Slovakia",
      url: "https://coinatmradar.com/country/176/bitcoin-atm-slovakia/",
      locations: 55,
    },
    {
      code: "RU",
      name: "Russian Federation",
      url: "https://coinatmradar.com/country/167/bitcoin-atm-russian-federation/",
      locations: 53,
    },
    {
      code: "HU",
      name: "Hungary",
      url: "https://coinatmradar.com/country/92/bitcoin-atm-hungary/",
      locations: 49,
    },
    {
      code: "BE",
      name: "Belgium",
      url: "https://coinatmradar.com/country/20/bitcoin-atm-belgium/",
      locations: 48,
    },
    {
      code: "GE",
      name: "Georgia",
      url: "https://coinatmradar.com/country/69/bitcoin-atm-georgia/",
      locations: 45,
    },
    {
      code: "UA",
      name: "Ukraine",
      url: "https://coinatmradar.com/country/189/bitcoin-atm-ukraine/",
      locations: 44,
    },
    {
      code: "IE",
      name: "Ireland",
      url: "https://coinatmradar.com/country/103/bitcoin-atm-ireland/",
      locations: 41,
    },
    {
      code: "PR",
      name: "Puerto Rico",
      url: "https://coinatmradar.com/country/138/bitcoin-atm-puerto-rico/",
      locations: 41,
    },
    {
      code: "CO",
      name: "Colombia",
      url: "https://coinatmradar.com/country/157/bitcoin-atm-colombia/",
      locations: 39,
    },
    {
      code: "DE",
      name: "Germany",
      url: "https://coinatmradar.com/country/113/bitcoin-atm-germany/",
      locations: 37,
    },
    {
      code: "GB",
      name: "United Kingdom",
      url: "https://coinatmradar.com/country/58/bitcoin-atm-united-kingdom/",
      locations: 34,
    },
    {
      code: "BG",
      name: "Bulgaria",
      url: "https://coinatmradar.com/country/38/bitcoin-atm-bulgaria/",
      locations: 29,
    },
    {
      code: "TW",
      name: "Taiwan",
      url: "https://coinatmradar.com/country/181/bitcoin-atm-taiwan/",
      locations: 29,
    },
    {
      code: "PA",
      name: "Panama",
      url: "https://coinatmradar.com/country/151/bitcoin-atm-panama/",
      locations: 28,
    },
    {
      code: "SI",
      name: "Slovenia",
      url: "https://coinatmradar.com/country/181/bitcoin-atm-slovenia/",
      locations: 23,
    },
    {
      code: "BR",
      name: "Brazil",
      url: "https://coinatmradar.com/country/105/bitcoin-atm-brazil/",
      locations: 21,
    },
    {
      code: "NL",
      name: "Netherlands",
      url: "https://coinatmradar.com/country/128/bitcoin-atm-netherlands/",
      locations: 20,
    },
    {
      code: "ZA",
      name: "South Africa",
      url: "https://coinatmradar.com/country/203/bitcoin-atm-south-africa/",
      locations: 18,
    },
    {
      code: "FI",
      name: "Finland",
      url: "https://coinatmradar.com/country/60/bitcoin-atm-finland/",
      locations: 16,
    },
    {
      code: "DO",
      name: "Dominican Republic",
      url: "https://coinatmradar.com/country/68/bitcoin-atm-dominican-republic/",
      locations: 14,
    },
    {
      code: "MX",
      name: "Mexico",
      url: "https://coinatmradar.com/country/139/bitcoin-atm-mexico/",
      locations: 13,
    },
    {
      code: "PH",
      name: "Philippines",
      url: "https://coinatmradar.com/country/160/bitcoin-atm-philippines/",
      locations: 13,
    },
    {
      code: "HR",
      name: "Croatia",
      url: "https://coinatmradar.com/country/62/bitcoin-atm-croatia/",
      locations: 11,
    },
    {
      code: "IL",
      name: "Israel",
      url: "https://coinatmradar.com/country/105/bitcoin-atm-israel/",
      locations: 11,
    },
    {
      code: "TR",
      name: "Turkey",
      url: "https://coinatmradar.com/country/196/bitcoin-atm-turkey/",
      locations: 10,
    },
    {
      code: "AR",
      name: "Argentina",
      url: "https://coinatmradar.com/country/106/bitcoin-atm-argentina/",
      locations: 9,
    },
    {
      code: "VN",
      name: "VietNam",
      url: "https://coinatmradar.com/country/204/bitcoin-atm-vietnam/",
      locations: 8,
    },
    {
      code: "CR",
      name: "Costa Rica",
      url: "https://coinatmradar.com/country/68/bitcoin-atm-costa-rica/",
      locations: 7,
    },
    {
      code: "PT",
      name: "Portugal",
      url: "https://coinatmradar.com/country/166/bitcoin-atm-portugal/",
      locations: 6,
    },
    {
      code: "BA",
      name: "Bosnia and Herzegovina",
      url: "https://coinatmradar.com/country/40/bitcoin-atm-bosnia-and-herzegovina/",
      locations: 6,
    },
    {
      code: "RS",
      name: "Serbia",
      url: "https://coinatmradar.com/country/159/bitcoin-atm-serbia/",
      locations: 5,
    },
    {
      code: "TH",
      name: "Thailand",
      url: "https://coinatmradar.com/country/195/bitcoin-atm-thailand/",
      locations: 5,
    },
    {
      code: "XK",
      name: "Kosovo",
      url: "https://coinatmradar.com/country/120/bitcoin-atm-kosovo/",
      locations: 4,
    },
    {
      code: "LB",
      name: "Lebanon",
      url: "https://coinatmradar.com/country/99/bitcoin-atm-lebanon/",
      locations: 4,
    },
    {
      code: "GU",
      name: "Guam",
      url: "https://coinatmradar.com/country/88/bitcoin-atm-guam/",
      locations: 4,
    },
    {
      code: "AE",
      name: "United Arab Emirates",
      url: "https://coinatmradar.com/country/59/bitcoin-atm-united-arab-emirates/",
      locations: 4,
    },
    {
      code: "AM",
      name: "Armenia",
      url: "https://coinatmradar.com/country/23/bitcoin-atm-armenia/",
      locations: 4,
    },
    {
      code: "HN",
      name: "Honduras",
      url: "https://coinatmradar.com/country/83/bitcoin-atm-honduras/",
      locations: 3,
    },
    {
      code: "FR",
      name: "France",
      url: "https://coinatmradar.com/country/44/bitcoin-atm-france/",
      locations: 3,
    },
    {
      code: "EE",
      name: "Estonia",
      url: "https://coinatmradar.com/country/68/bitcoin-atm-estonia/",
      locations: 3,
    },
    {
      code: "PE",
      name: "Peru",
      url: "https://coinatmradar.com/country/158/bitcoin-atm-peru/",
      locations: 3,
    },
    {
      code: "UY",
      name: "Uruguay",
      url: "https://coinatmradar.com/country/190/bitcoin-atm-uruguay/",
      locations: 2,
    },
    {
      code: "AI",
      name: "Anguilla",
      url: "https://coinatmradar.com/country/10/bitcoin-atm-anguilla/",
      locations: 2,
    },
    {
      code: "KZ",
      name: "Kazakhstan",
      url: "https://coinatmradar.com/country/106/bitcoin-atm-kazakhstan/",
      locations: 2,
    },
    {
      code: "IN",
      name: "India",
      url: "https://coinatmradar.com/country/68/bitcoin-atm-india/",
      locations: 2,
    },
    {
      code: "BS",
      name: "Bahamas",
      url: "https://coinatmradar.com/country/45/bitcoin-atm-bahamas/",
      locations: 2,
    },
    {
      code: "CL",
      name: "Chile",
      url: "https://coinatmradar.com/country/44/bitcoin-atm-chile/",
      locations: 2,
    },
    {
      code: "AG",
      name: "Antigua and Barbuda",
      url: "https://coinatmradar.com/country/9/bitcoin-atm-antigua-and-barbuda/",
      locations: 2,
    },
    {
      code: "NG",
      name: "Nigeria",
      url: "https://coinatmradar.com/country/137/bitcoin-atm-nigeria/",
      locations: 2,
    },
    {
      code: "DJ",
      name: "Djibouti",
      url: "https://coinatmradar.com/country/45/bitcoin-atm-djibouti/",
      locations: 1,
    },
    {
      code: "AW",
      name: "Aruba",
      url: "https://coinatmradar.com/country/7/bitcoin-atm-aruba/",
      locations: 1,
    },
    {
      code: "VE",
      name: "Venezuela",
      url: "https://coinatmradar.com/country/201/bitcoin-atm-venezuela/",
      locations: 1,
    },
    {
      code: "BB",
      name: "Barbados",
      url: "https://coinatmradar.com/country/19/bitcoin-atm-barbados/",
      locations: 1,
    },
    {
      code: "BW",
      name: "Botswana",
      url: "https://coinatmradar.com/country/24/bitcoin-atm-botswana/",
      locations: 1,
    },
    {
      code: "KH",
      name: "Cambodia",
      url: "https://coinatmradar.com/country/34/bitcoin-atm-cambodia/",
      locations: 1,
    },
    {
      code: "UG",
      name: "Uganda",
      url: "https://coinatmradar.com/country/201/bitcoin-atm-uganda/",
      locations: 1,
    },
    {
      code: "PY",
      name: "Paraguay",
      url: "https://coinatmradar.com/country/157/bitcoin-atm-paraguay/",
      locations: 1,
    },
    {
      code: "GH",
      name: "Ghana",
      url: "https://coinatmradar.com/country/70/bitcoin-atm-ghana/",
      locations: 1,
    },
    {
      code: "ID",
      name: "Indonesia",
      url: "https://coinatmradar.com/country/100/bitcoin-atm-indonesia/",
      locations: 1,
    },
    {
      code: "KE",
      name: "Kenya",
      url: "https://coinatmradar.com/country/104/bitcoin-atm-kenya/",
      locations: 1,
    },
    {
      code: "LV",
      name: "Latvia",
      url: "https://coinatmradar.com/country/116/bitcoin-atm-latvia/",
      locations: 1,
    },
    {
      code: "LT",
      name: "Lithuania",
      url: "https://coinatmradar.com/country/114/bitcoin-atm-lithuania/",
      locations: 1,
    },
    {
      code: "MY",
      name: "Malaysia",
      url: "https://coinatmradar.com/country/117/bitcoin-atm-malaysia/",
      locations: 1,
    },
    {
      code: "SA",
      name: "Saudi Arabia",
      url: "https://coinatmradar.com/country/160/bitcoin-atm-saudi-arabia/",
      locations: 1,
    },
    {
      code: "SM",
      name: "San Marino",
      url: "https://coinatmradar.com/country/174/bitcoin-atm-san-marino/",
      locations: 1,
    },
    {
      code: "KN",
      name: "Saint Kitts and Nevis",
      url: "https://coinatmradar.com/country/168/bitcoin-atm-saint-kitts-and-nevis/",
      locations: 1,
    },
    {
      code: "ZW",
      name: "Zimbabwe",
      url: "https://coinatmradar.com/country/202/bitcoin-atm-zimbabwe/",
      locations: 1,
    },
  ];

  // Filtrar los países que coinciden con el valor de 'country'
  const filteredCountries = countries.filter((countryItem) =>
    countryItem.name.toLowerCase().includes(country?.toLowerCase() || "")
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCountries.length === 0 ? (
        <p className="text-white font-bold text-2xl col-span-full text-center">
          No results
        </p>
      ) : (
        filteredCountries.map((country, index) => (
          <a
            key={index}
            href={country.url}
            rel="nofollow"
            target="_blank"
            className="text-sm text-white truncate"
          >
            <div className="flex items-center space-x-2 bg-[#181818] px-3 py-5 rounded-2xl ">
              <Flag code={country.code} style={{ width: 36, height: 24 }} />

              <span>{country.name}</span>

              <p className="text-white font-bold text-sm truncate">
                ({country.locations} locations)
              </p>
            </div>
          </a>
        ))
      )}
    </div>
  );
};
