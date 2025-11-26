"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { CircleFlag } from "react-circle-flags";
import rawCountries from "world-countries";

// ==== Tipado de país y lista con coordenadas ====
type Country = {
  code: string;
  name: string;
  latlng: [number, number];
};

export const COUNTRIES: Country[] = rawCountries.map((country) => ({
  code: country.cca2.toLowerCase(),
  name: country.translations?.spa?.common || country.name.common,
  latlng: country.latlng
    ? [country.latlng[0], country.latlng[1]]
    : [0, 0], // fallback
}));

const customIcon = L.icon({
  iconUrl: "/images/deliveries/home_pin.png",
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const deliveryPoints: {
  id: number;
  name: string;
  position: [number, number];
}[] = [
  { id: 1, name: "Sucursal 1", position: [19.4326, -99.1332] },
  { id: 2, name: "Sucursal 2", position: [19.4526, -99.1632] },
  { id: 3, name: "Sucursal 3", position: [19.4626, -99.1032] },
];

// ==== Componente auxiliar para mover el mapa cuando cambia el centro ====
const MapViewUpdater: React.FC<{ center: [number, number]; zoom?: number }> = ({
  center,
  zoom = 5,
}) => {
  const map = useMap();

  useEffect(() => {
    if (center[0] !== 0 || center[1] !== 0) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const DeliveriesMapClient = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    COUNTRIES[0].latlng
  );

  // ref para detectar click fuera del dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Cerrar dropdown al hacer click fuera
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

  return (
    <section className="relative w-full flex flex-col items-center py-10 bg-[#eaf2f6]">
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
            sm:text-[16px] sm:max-w-[590px]
            lg:text-[20px] lg:max-w-[840px]
          "
        >
          Usa el mapa interactivo y encuentra nuestros puntos seleccionados de
          recogida más cercanos a tu ubicación
        </p>
      </div>

      {/* Buscador */}
      <div
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

          {/* Selector de país */}
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
                      setMapCenter(country.latlng); // <-- mover mapa al país
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
      </div>

      {/* Mapa */}
      <div className="relative z-10 w-4/5 h-96 rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={mapCenter}
          zoom={5}
          className="w-full h-full"
        >
          {/* actualiza la vista cuando cambia mapCenter */}
          <MapViewUpdater center={mapCenter} zoom={5} />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {deliveryPoints.map((point) => (
            <Marker key={point.id} position={point.position} icon={customIcon}>
              <Popup>{point.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default DeliveriesMapClient;
