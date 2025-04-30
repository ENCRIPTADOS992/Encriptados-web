"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import L from "leaflet";

// Definir icono personalizado
const customIcon = L.icon({
  iconUrl: "/images/deliveries/home_pin.png",
  iconSize: [30, 30],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const deliveryPoints: { id: number; name: string; position: [number, number] }[] = [
  { id: 1, name: "Sucursal 1", position: [19.4326, -99.1332] },
  { id: 2, name: "Sucursal 2", position: [19.4526, -99.1632] },
  { id: 3, name: "Sucursal 3", position: [19.4626, -99.1032] },
];

const DeliveriesMap = () => {
  return (
    <section className="w-full flex flex-col items-center py-10 bg-[#eaf2f6]">
      
      {/* Contenedor del Icono, Título y Texto */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <img 
          src="/images/deliveries/material-symbols_store-outline.png" 
          alt="Ícono de tienda" 
          className="w-12 h-12"
        />
        <h2 className="text-3xl font-bold text-center">Encuentra nuestros puntos de entrega rápida</h2>
        <p className="text-lg text-black max-w-2xl text-center mt-2">
          Usa el mapa interactivo y encuentra nuestros puntos seleccionados de recogida más cercanos a tu ubicación
        </p>
      </div>

      {/* Buscador */}
      <div className="relative w-full max-w-lg mb-10">
        <div className="flex items-center bg-white border border-[#000]-300 rounded-[50px] px-4 py-3 shadow-md">
          {/* Icono de búsqueda */}
          <FontAwesomeIcon icon={faSearch} className="text-black-500 text-lg" />
          
          {/* Input de búsqueda */}
          <input 
            type="text" 
            placeholder="Buscar ubicación..." 
            className="flex-1 bg-transparent outline-none px-4 text-gray-600 placeholder-gray-400"
          />
          
          {/* Selector de país */}
          <div className="flex items-center text-black-500 font-medium cursor-pointer">
            <span className="mr-2">🇨🇦</span> Canada ▼
          </div>
        </div>
      </div>

      {/* Contenedor del Mapa */}
      <div className="w-4/5 h-96 rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={[19.4326, -99.1332] as [number, number]} zoom={12} className="w-full h-full">
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

export default DeliveriesMap;