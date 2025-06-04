// // src/shared/components/ModalPayment/PaymentMethodsView/PayWithCrypto.tsx
// "use client";

// import React from "react";
// import { XIcon } from "@heroicons/react/solid";

// interface Props {
//   productId: string;
//   closeModal: () => void;
//   languageCode: string;
// }

// const PayWithCrypto: React.FC<Props> = ({ productId, closeModal, languageCode }) => {
//   return (
//     <div className="mt-4 flex flex-col gap-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Pagar con Criptomonedas
//         </h3>
//         <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
//           <XIcon className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Texto descriptivo */}
//       <p className="text-gray-700 dark:text-gray-300 text-sm">
//         Elige tu criptomoneda preferida y escanea el QR para completar el pago. Producto:{" "}
//         <span className="font-medium">{productId}</span> (idioma: <span className="font-medium">{languageCode}</span>).
//       </p>

//       {/* Ejemplo de sección de QR (placeholder) */}
//       <div className="flex flex-col items-center gap-4">
//         <div className="h-40 w-40 rounded-lg border-2 border-gray-300 bg-gray-100 dark:bg-gray-700">
//           {/* Aquí reemplaza con el componente QR real, p.ej. <QRCode value={...} /> */}
//           <p className="mt-16 text-center text-xs text-gray-500 dark:text-gray-400">QR Cripto Aquí</p>
//         </div>

//         <label className="flex flex-col text-sm text-gray-600 dark:text-gray-400">
//           Seleccionar Criptomoneda:
//           <select className="mt-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 focus:border-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
//             <option value="">— Elige Cripto —</option>
//             <option value="btc">Bitcoin (BTC)</option>
//             <option value="eth">Ethereum (ETH)</option>
//             <option value="usdc">USDC</option>
//             <option value="usdt">USDT</option>
//           </select>
//         </label>

//         <button
//           onClick={() => {
//             // p.ej. generar nuevo QR, refrescar datos, etc.
//             console.log("Generar nuevo QR");
//           }}
//           className="mt-2 rounded-md bg-primary px-4 py-2 text-white transition hover:bg-blue-600 focus:outline-none"
//         >
//           Generar QR
//         </button>
//       </div>

//       {/* Botón para regresar */}
//       <button
//         onClick={closeModal}
//         className="mt-4 self-start text-sm text-gray-600 dark:text-gray-400 hover:underline"
//       >
//         Volver
//       </button>
//     </div>
//   );
// };

// export default PayWithCrypto;
