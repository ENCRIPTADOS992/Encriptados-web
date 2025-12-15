"use client";

import TelegramButton from '@/shared/components/TelegramButton';
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
    <div className="w-full max-w-5xl mx-auto px-3 py-6 sm:p-8 bg-white shadow-lg rounded-2xl sm:rounded-[32px]">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">¿Dónde vas a usar tu SIM?</h1>
      <p className="text-sm sm:text-base text-[#4B5563] mb-6 sm:mb-8">
        Conéctate a Internet con tu SIM o eSIM en más de 200 países. Disfruta de internet seguro y con total anonimato.
      </p>

      {/* Layout responsive: Móvil (columna) | Tablet (2 filas) | Desktop (1 fila) */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
        
        {/* Categoría */}
        <div className="w-full lg:w-auto lg:flex-1">
          <p className="text-sm font-medium text-[#7E7E7E] mb-3">Categoría</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`flex flex-col items-center justify-center py-3 sm:py-4 px-1 sm:px-3 rounded-xl sm:rounded-[18px] border-2 transition-all ${
                selectedOption === 'physical' 
                  ? 'bg-[#E8F4FF] border-[#00A3FF] text-[#00A3FF]' 
                  : 'bg-[#F5F5F5] border-transparent text-[#7E7E7E] hover:border-[#00A3FF]'
              }`}
              onClick={() => setSelectedOption('physical')}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7C21 5.9 20.1 5 19 5ZM9 5H15V7H9V5ZM19 19H5V7H7V9H17V7H19V19Z" fill="currentColor"/>
              </svg>
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">SIM Física</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center py-3 sm:py-4 px-1 sm:px-3 rounded-xl sm:rounded-[18px] border-2 transition-all ${
                selectedOption === 'recharge' 
                  ? 'bg-[#E8F4FF] border-[#00A3FF] text-[#00A3FF]' 
                  : 'bg-[#F5F5F5] border-transparent text-[#7E7E7E] hover:border-[#00A3FF]'
              }`}
              onClick={() => setSelectedOption('recharge')}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">Recargar</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center py-3 sm:py-4 px-1 sm:px-3 rounded-xl sm:rounded-[18px] border-2 transition-all ${
                selectedOption === 'esim' 
                  ? 'bg-[#E8F4FF] border-[#00A3FF] text-[#00A3FF]' 
                  : 'bg-[#F5F5F5] border-transparent text-[#7E7E7E] hover:border-[#00A3FF]'
              }`}
              onClick={() => setSelectedOption('esim')}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 9H12V11H10V9ZM14 9H16V11H14V9ZM10 13H12V15H10V13ZM14 13H16V15H14V13Z" fill="currentColor"/>
              </svg>
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">eSIM + Datos</span>
            </button>
          </div>
        </div>

        {/* Región/País y Buscar (lado a lado en tablet+, apilados en móvil) */}
        <div className="w-full lg:w-auto lg:flex-1 flex flex-col sm:flex-row gap-4">
          
          {/* Región/País */}
          <div className="w-full sm:flex-1">
            <p className="text-sm font-medium text-[#7E7E7E] mb-3">Región/País</p>
            <div className="relative">
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full h-[48px] sm:h-[56px] pl-4 pr-10 bg-[#F5F5F5] border-2 border-transparent rounded-xl sm:rounded-[18px] text-sm sm:text-base appearance-none focus:outline-none focus:border-[#00A3FF] transition-all cursor-pointer"
              >
                <option value="">🇨🇴 Global / Colombia</option>
                {regions.map((region) => (
                  <option key={region.name} value={region.name}>{region.icon} {region.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Buscar */}
          <div className="w-full sm:flex-1 lg:w-auto lg:min-w-[280px]">
            <p className="text-sm font-medium text-[#7E7E7E] mb-3 opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto" aria-hidden="true">Buscar</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar" 
                className="w-full h-[48px] sm:h-[56px] pl-4 pr-12 bg-[#F5F5F5] border-2 border-transparent rounded-xl sm:rounded-[24px] text-sm sm:text-base focus:outline-none focus:border-[#00A3FF] transition-all"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {selectedOption === 'physical' && (
        <div>
          <button className="back-button flex items-center mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 hover:text-gray-900" onClick={() => setSelectedOption('')}>
            <span className="mr-2">⬅</span> Atrás
          </button>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Compra tu SIM y recíbela en cualquier parte del mundo</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Disponible en más de 200 países</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col items-center">
              <span className="icon text-2xl sm:text-3xl mb-2">🔒</span>
              <span className="text-xs sm:text-sm text-center">Anónimato</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="icon text-2xl sm:text-3xl mb-2">🌍</span>
              <span className="text-xs sm:text-sm text-center">Roaming Global</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="icon text-2xl sm:text-3xl mb-2">🛡️</span>
              <span className="text-xs sm:text-sm text-center">Seguridad</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 p-4 rounded-lg gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">SIM Física</h3>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Recíbela en cualquier parte del mundo</li>
                <li>• Privacidad y anonimato</li>
                <li>• Sin vencimiento de datos ni fechas de corte</li>
                <li>• Cobertura global en más de 200 países</li>
              </ul>
            </div>
            <img src="/placeholder.svg" alt="Phone" width={200} height={200} className="rounded-lg w-32 h-32 sm:w-40 sm:h-40 object-cover mx-auto sm:mx-0" />
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-semibold text-lg sm:text-xl">$10 USD</span>
            <button className="w-full sm:w-auto sm:px-8 bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 rounded-lg transition-colors">Comprar Ahora</button>
          </div>
        </div>
      )}

      {selectedOption === 'recharge' && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ingresa tu número de SIM para recargar</h2>
          <input type="text" placeholder="1928-423-33" className="w-full p-3 border-2 border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg mb-4 text-sm sm:text-base" />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors text-sm sm:text-base font-medium">Pagar ahora</button>
          <ul className="text-xs sm:text-sm mt-4 sm:mt-6 space-y-2">
            <li className="flex items-start"><span className="mr-2">✅</span> Tu recarga se hará inmediatamente</li>
            <li className="flex items-start"><span className="mr-2">✅</span> Pago seguro garantizado</li>
            <li className="flex items-start"><span className="mr-2">✅</span> No recopilamos tu información de compra</li>
            <li className="flex items-start"><span className="mr-2">✅</span> Conexión segura y anónima</li>
          </ul>
        </div>
      )}

      {selectedOption === 'esim' && !selectedRegion && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Selecciona una región</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {regions.map((region) => (
              <button
                key={region.name}
                className="flex items-center justify-start p-3 sm:p-4 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg transition-all text-sm sm:text-base"
                onClick={() => setSelectedRegion(region.name)}
              >
                <span className="mr-2 text-xl sm:text-2xl">{region.icon}</span> {region.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedOption === 'esim' && selectedRegion && (
        <div>
          <div className="flex items-center mb-3 sm:mb-4 cursor-pointer text-gray-600 hover:text-gray-900 text-sm sm:text-base" onClick={() => setSelectedRegion('')}>
            <span className="mr-2">⬅</span> Atrás
          </div>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
            <h3 className="font-semibold text-blue-700 mb-2 text-sm sm:text-base">SIM eSIM con datos móviles</h3>
            <h4 className="font-bold text-base sm:text-lg mb-3">{selectedRegion.toUpperCase()}</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              <li className="flex items-start"><span className="mr-2 mt-0.5">✅</span> Total anonimato</li>
              <li className="flex items-start"><span className="mr-2 mt-0.5">✅</span> Sin vencimiento de datos ni fechas de corte</li>
              <li className="flex items-start"><span className="mr-2 mt-0.5">✅</span> Sin límites de tiempo para usar recursos del plan</li>
              <li className="flex items-start"><span className="mr-2 mt-0.5">✅</span> Cobertura en más de 200 países</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {dataPlans.map((plan) => (
              <button key={plan.size} className="flex flex-col items-center justify-center h-20 sm:h-24 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                <span className="font-bold text-sm sm:text-base">{plan.size}</span>
                <span className="text-xs sm:text-sm text-gray-600">{plan.price}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="font-bold text-lg sm:text-xl">$10 USD</span>
            <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base font-medium">Comprar ahora</button>
          </div>

          <TelegramButton />

          {/* <button className="w-full border rounded-lg py-2">Chat soporte</button> */}
        </div>
      )}
    </div>
  );
};

export default SimSelection;
