"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Tooltip,
  useMapEvents,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import rawCountries from "world-countries";


type Country = {
  code: string;
  name: string;
  latlng: [number, number];
};

export const COUNTRIES: Country[] = rawCountries.map((country) => ({
  code: country.cca2.toLowerCase(),
  name: country.translations?.spa?.common || country.name.common,
  latlng: country.latlng ? [country.latlng[0], country.latlng[1]] : [0, 0],
}));

type RegionId = "Europa" | "Colombia" | "Chile" | "México" | "Canadá" | "Otros";

type CityTag = {
  id: number;
  name: string;
  countryLabel: string;
  region: RegionId;
  position: [number, number];
};

const CITY_TAGS: CityTag[] = [
  {
    id: 1,
    name: "Bilbao",
    countryLabel: "España",
    region: "Europa",
    position: [43.263, -2.935],
  },
  {
    id: 2,
    name: "Islas Canarias",
    countryLabel: "España",
    region: "Europa",
    position: [28.2916, -16.6291],
  },
  {
    id: 3,
    name: "Madrid",
    countryLabel: "España",
    region: "Europa",
    position: [40.4168, -3.7038],
  },
  {
    id: 4,
    name: "Barcelona",
    countryLabel: "España",
    region: "Europa",
    position: [41.3874, 2.1686],
  },
  {
    id: 5,
    name: "Málaga",
    countryLabel: "España",
    region: "Europa",
    position: [36.7213, -4.4214],
  },
  {
    id: 6,
    name: "Granada",
    countryLabel: "España",
    region: "Europa",
    position: [37.1773, -3.5986],
  },
  {
    id: 7,
    name: "Almería",
    countryLabel: "España",
    region: "Europa",
    position: [36.834, -2.4637],
  },
  {
    id: 8,
    name: "Murcia",
    countryLabel: "España",
    region: "Europa",
    position: [37.9922, -1.1307],
  },
  {
    id: 9,
    name: "Alicante",
    countryLabel: "España",
    region: "Europa",
    position: [38.3452, -0.481],
  },
  {
    id: 10,
    name: "Valencia",
    countryLabel: "España",
    region: "Europa",
    position: [39.4699, -0.3763],
  },

  {
    id: 11,
    name: "Belgrado",
    countryLabel: "Serbia",
    region: "Europa",
    position: [44.7866, 20.4489],
  },
  {
    id: 12,
    name: "Reino Unido",
    countryLabel: "Londres",
    region: "Europa",
    position: [51.5074, -0.1278],
  },
  {
    id: 13,
    name: "Albania",
    countryLabel: "Tirana",
    region: "Europa",
    position: [41.3275, 19.8187],
  },
  {
    id: 14,
    name: "Agder",
    countryLabel: "Noruega",
    region: "Europa",
    position: [58.1475, 7.9975],
  },
  {
    id: 15,
    name: "Eslovenia",
    countryLabel: "Liubliana",
    region: "Europa",
    position: [46.0569, 14.5058],
  },
  {
    id: 16,
    name: "Aveiro",
    countryLabel: "Portugal",
    region: "Europa",
    position: [40.6405, -8.6538],
  },
  {
    id: 17,
    name: "París",
    countryLabel: "Francia",
    region: "Europa",
    position: [48.8566, 2.3522],
  },
  {
    id: 18,
    name: "Grenoble",
    countryLabel: "Francia",
    region: "Europa",
    position: [45.1885, 5.7245],
  },
  {
    id: 19,
    name: "Lyon",
    countryLabel: "Francia",
    region: "Europa",
    position: [45.764, 4.8357],
  },
  {
    id: 20,
    name: "Calabria",
    countryLabel: "Italia",
    region: "Europa",
    position: [39.0, 16.6],
  },

  {
    id: 21,
    name: "Medellín",
    countryLabel: "Colombia",
    region: "Colombia",
    position: [6.2442, -75.5812],
  },
  {
    id: 22,
    name: "Bogotá",
    countryLabel: "Colombia",
    region: "Colombia",
    position: [4.711, -74.0721],
  },
  {
    id: 23,
    name: "Cali",
    countryLabel: "Colombia",
    region: "Colombia",
    position: [3.4516, -76.532],
  },

  {
    id: 24,
    name: "Panama City",
    countryLabel: "Panamá",
    region: "Otros",
    position: [8.9824, -79.5199],
  },
  {
    id: 25,
    name: "Paraguay",
    countryLabel: "Asunción",
    region: "Otros",
    position: [-25.2637, -57.5759],
  },
  {
    id: 26,
    name: "Brasil (frontera)",
    countryLabel: "Foz do Iguaçu",
    region: "Otros",
    position: [-25.5163, -54.5854],
  },

  {
    id: 27,
    name: "Santiago",
    countryLabel: "Chile",
    region: "Chile",
    position: [-33.4489, -70.6693],
  },
  {
    id: 28,
    name: "Valparaíso",
    countryLabel: "Chile",
    region: "Chile",
    position: [-33.0472, -71.6127],
  },
  {
    id: 29,
    name: "Viña del Mar",
    countryLabel: "Chile",
    region: "Chile",
    position: [-33.0245, -71.5518],
  },

  {
    id: 30,
    name: "Sonora",
    countryLabel: "México (Hermosillo)",
    region: "México",
    position: [29.0729, -110.9559],
  },
  {
    id: 31,
    name: "Guadalajara",
    countryLabel: "México",
    region: "México",
    position: [20.6597, -103.3496],
  },
  {
    id: 32,
    name: "Tijuana",
    countryLabel: "México",
    region: "México",
    position: [32.5149, -117.0382],
  },
  {
    id: 33,
    name: "Sinaloa",
    countryLabel: "México (Culiacán)",
    region: "México",
    position: [24.8091, -107.394],
  },

  {
    id: 34,
    name: "Montreal",
    countryLabel: "Canadá",
    region: "Canadá",
    position: [45.5017, -73.5673],
  },
  {
    id: 35,
    name: "Quebec",
    countryLabel: "Canadá",
    region: "Canadá",
    position: [46.8139, -71.208],
  },
];

const MapViewUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center[0] !== 0 || center[1] !== 0) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
};

const MapZoomHandler: React.FC<{ onZoomChange: (zoom: number) => void }> = ({
  onZoomChange,
}) => {
  const map = useMapEvents({
    zoom: () => {
      onZoomChange(map.getZoom());
    },
  });

  useEffect(() => {
    onZoomChange(map.getZoom());
  }, [map, onZoomChange]);

  return null;
};

const getDefaultCountry = (): Country => {
  const byCode = COUNTRIES.find((c) => c.code === "es");
  return byCode || COUNTRIES[0];
};

const getCityCircleRadius = (zoom: number) => {
  if (zoom <= 3) return 80000;
  if (zoom <= 5) return 40000;
  if (zoom <= 7) return 15000;
  return 6000;
};

const DeliveriesMapClient = () => {
  const defaultCountry = getDefaultCountry();

  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    defaultCountry.latlng
  );
  const [mapZoom, setMapZoom] = useState<number>(4);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const customIcon = L.icon({
    iconUrl: "/images/deliveries/encryptedlogo.webp",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <section className="relative w-full flex flex-col items-center pt-10 pb-0 bg-[#eaf2f6]">
      <div className="flex flex-col items-center gap-2 mb-4">
        <img
          src="/images/deliveries/material-symbols_store-outline.png"
          alt="Ícono de tienda"
          className="w-12 h-12"
        />
        <h2
          className="
            font-inter font-bold
            text-center
            mx-auto
            text-[16px] leading-[1] max-w-[361px]       
            sm:text-[18px] sm:max-w-[406px]             
            lg:text-[30px] lg:max-w-[818px]              
          "
        >
          Encuentra nuestros puntos de entrega rápida
        </h2>

        <p
          className="
            text-black text-center mt-2
            font-normal
            text-[12px] leading-[1] max-w-[374px] mx-auto
            sm:text-[20px] sm:leading-[1] sm:max-w-[590px]
          "
        >
          Usa el mapa interactivo y encuentra nuestros puntos seleccionados de
          recogida más cercanos a tu ubicación
        </p>

      </div>

      {/* Buscador */}
      {/* <div
        className="
          relative z-30 mb-10
          w-[374px] mx-auto
          sm:w-[590px]
          lg:w-[840px]
        "
      >
        <div
          className="
            flex items-center
            justify-start sm:justify-between
            bg-white
            border border-black
            rounded-[100px]
            h-[54px] px-[34px] py-[14px]
            sm:h-[64px] sm:py-[20px]
            shadow-md
          "
        >
          <FontAwesomeIcon icon={faSearch} className="text-black text-lg" />

          <input
            type="text"
            placeholder=""
            className="
              flex-1 bg-transparent outline-none
              px-4 text-gray-600 placeholder-gray-400
            "
          />

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="
                flex items-center gap-2 text-black font-medium cursor-pointer
                transform -translate-x-6 sm:translate-x-0
              "
            >
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <CircleFlag
                  countryCode={selectedCountry.code}
                  className="w-5 h-5"
                />
              </div>

              <span
                className="
                  text-sm sm:text-base
                  max-w-[90px] sm:max-w-[140px]
                  truncate
                "
              >
                {selectedCountry.name}
              </span>

              <span className="text-xs sm:text-sm ml-1">▼</span>
            </button>

            {isOpen && (
              <div
                className="
                  absolute right-0 top-[110%]
                  w-44 bg-white border border-gray-200 rounded-lg
                  shadow-lg z-[999] max-h-60 overflow-y-auto
                "
              >
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setMapCenter(country.latlng);
                      setMapZoom(5);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <CircleFlag
                      countryCode={country.code}
                      className="w-5 h-5"
                    />
                    <span className="truncate max-w-[130px] sm:max-w-[160px]">
                      {country.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div> 
      </div> */}

      {/* Mapa */}
      <div className="relative z-10 w-4/5 h-96 rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="w-full h-full"
          minZoom={2}
          zoomControl={false}
        >
          <MapViewUpdater center={mapCenter} />
          <MapZoomHandler onZoomChange={setMapZoom} />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Círculos que ENCIERRAN cada ciudad (no toda la región) */}
          {CITY_TAGS.map((city) => {
            const radius = getCityCircleRadius(mapZoom);
            const showCircle = mapZoom >= 7;
            return (
              <React.Fragment key={city.id}>
                {showCircle && (
                  <Circle
                    center={city.position}
                    radius={radius}
                    pathOptions={{
                      color: "#1D4ED8",
                      weight: 1,
                      fillColor: "#1D4ED8",
                      fillOpacity: 0.12,
                    }}
                  />
                )}
                <Marker position={city.position} icon={customIcon}>
                  {mapZoom >= 5 && (
                    <Tooltip direction="top" offset={[0, -20]} permanent>
                      <span className="text-xs font-semibold">{city.name}</span>
                    </Tooltip>
                  )}
                  <Popup>
                    <div>
                      <strong>{city.name}</strong>
                      <br />
                      {city.countryLabel}
                      <br />
                      Entrega rápida disponible
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
};

export default DeliveriesMapClient;
