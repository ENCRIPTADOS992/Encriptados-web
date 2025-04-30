"use client";

import { useState } from 'react';

interface Region {
  name: string;
  icon: string;
}

interface DataPlan {
  size: string;
  price: string;
}

const SimSelection = () => {
  const [selectedOption, setSelectedOption] = useState<string>('physical');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const regions: Region[] = [
    { name: 'Global', icon: '🌍' },
    { name: 'Europa', icon: '🌍' },
    { name: 'Asia', icon: '🌍' },
    { name: 'América del norte', icon: '🌍' },
    { name: 'Oriente Medio y el norte de África', icon: '🌍' },
    { name: 'Latinoamérica', icon: '🌍' },
    { name: 'África', icon: '🌍' },
    { name: 'Islas del Caribe', icon: '🌍' },
  ];

  const dataPlans: DataPlan[] = [
    { size: '5GB', price: '$10' },
    { size: '10GB', price: '$15' },
    { size: '15GB', price: '$20' },
    { size: '25GB', price: '$30' },
    { size: '50GB', price: '$50' },
    { size: 'GB ilimitado', price: '$100' },
  ];

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">¿Dónde vas a usar tu SIM?</h1>
      <p className="text-sm text-gray-500 mb-6">
        Conéctate a Internet con tu SIM o eSIM en más de 200 países. Disfruta de internet seguro y con total anonimato.
      </p>

      <div className="tabs mb-6 flex justify-between">
        <button
          className={`tab-button ${selectedOption === 'physical' ? 'active' : ''}`}
          onClick={() => setSelectedOption('physical')}
        >
          SIM Física
        </button>
        <button
          className={`tab-button ${selectedOption === 'recharge' ? 'active' : ''}`}
          onClick={() => setSelectedOption('recharge')}
        >
          Recargar
        </button>
        <button
          className={`tab-button ${selectedOption === 'esim' ? 'active' : ''}`}
          onClick={() => setSelectedOption('esim')}
        >
          eSIM + Datos
        </button>
      </div>

      {selectedOption === 'physical' && (
        <div>
          <button className="back-button flex items-center mb-4" onClick={() => setSelectedOption('')}>
            <span className="mr-2">⬅</span> Atrás
          </button>
          <h2 className="text-xl font-semibold mb-4">Compra tu SIM y recíbela en cualquier parte del mundo</h2>
          <p className="text-sm text-gray-500 mb-4">Disponible en más de 200 países</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <span className="icon mb-2">🔒</span>
              <span className="text-sm">Anónimato</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="icon mb-2">🌍</span>
              <span className="text-sm">Roaming Global</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="icon mb-2">🛡️</span>
              <span className="text-sm">Seguridad</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">SIM Física</h3>
              <ul className="text-sm">
                <li>Recíbela en cualquier parte del mundo</li>
                <li>Privacidad y anonimato</li>
                <li>Sin vencimiento de datos ni fechas de corte</li>
                <li>Cobertura global en más de 200 países</li>
              </ul>
            </div>
            <img src="/placeholder.svg" alt="Phone" width={200} height={200} className="rounded-lg" />
          </div>
          <div className="mt-6">
            <span className="font-semibold">$10 USD</span>
            <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg">Comprar Ahora</button>
          </div>
        </div>
      )}

      {selectedOption === 'recharge' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Ingresa tu número de SIM para recargar</h2>
          <input type="text" placeholder="1928-423-33" className="w-full p-2 border rounded mb-4" />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg">Pagar ahora</button>
          <ul className="text-sm mt-4">
            <li>Tu recarga se hará inmediatamente</li>
            <li>Pago seguro garantizado</li>
            <li>No recopilamos tu información de compra</li>
            <li>Conexión segura y anónima</li>
          </ul>
        </div>
      )}

      {selectedOption === 'esim' && !selectedRegion && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecciona una región</h2>
          <div className="grid grid-cols-2 gap-4">
            {regions.map((region) => (
              <button
                key={region.name}
                className="flex items-center justify-start p-4 border rounded-lg"
                onClick={() => setSelectedRegion(region.name)}
              >
                <span className="mr-2">{region.icon}</span> {region.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedOption === 'esim' && selectedRegion && (
        <div>
          <div className="flex items-center mb-4 cursor-pointer" onClick={() => setSelectedRegion('')}>
            <span className="mr-2">⬅</span> Atrás
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-700 mb-2">SIM eSIM con datos móviles</h3>
            <h4 className="font-bold text-lg mb-2">{selectedRegion.toUpperCase()}</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">✅ Total anonimato</li>
              <li className="flex items-center">✅ Sin vencimiento de datos ni fechas de corte</li>
              <li className="flex items-center">✅ Sin límites de tiempo para usar recursos del plan</li>
              <li className="flex items-center">✅ Cobertura en más de 200 países</li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {dataPlans.map((plan) => (
              <button key={plan.size} className="flex flex-col items-center justify-center h-20 border rounded-lg">
                <span className="font-bold">{plan.size}</span>
                <span className="text-sm">{plan.price}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">$10 USD</span>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Comprar ahora</button>
          </div>
          <button className="w-full border rounded-lg py-2">Chat soporte</button>
        </div>
      )}
    </div>
  );
};

export default SimSelection;
