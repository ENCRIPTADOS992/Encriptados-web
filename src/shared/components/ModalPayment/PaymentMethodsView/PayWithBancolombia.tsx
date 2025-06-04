// // src/shared/components/ModalPayment/PaymentMethodsView/PayWithBancolombia.tsx
// "use client";

// import React from "react";
// import { XIcon } from "@heroicons/react/solid";

// interface Props {
//   productId: string;
//   closeModal: () => void;
//   languageCode: string;
// }

// const PayWithBancolombia: React.FC<Props> = ({ productId, closeModal, languageCode }) => {
//   return (
//     <div className="mt-4 flex flex-col gap-6">
//       {/* Título y botón de cerrar */}
//       <div className="flex items-center justify-between">
//         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Pagar con Bancolombia
//         </h3>
//         <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
//           <XIcon className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Texto descriptivo */}
//       <p className="text-gray-700 dark:text-gray-300 text-sm">
//         Se te redirigirá a la plataforma de pago de Bancolombia para procesar tu compra. Producto:{" "}
//         <span className="font-medium">{productId}</span> (idioma: <span className="font-medium">{languageCode}</span>).
//       </p>

//       {/* Botón para “Ir a Bancolombia” (placeholder) */}
//       <button
//         onClick={() => {
//           // Aquí iría la lógica real, p.ej. redirigir a una URL de Bancolombia
//           console.log("Redirigiendo a Bancolombia...");
//         }}
//         className="mt-2 rounded-md bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600 focus:outline-none"
//       >
//         Ir a Bancolombia
//       </button>

//       {/* Botón “Volver” */}
//       <button
//         onClick={closeModal}
//         className="mt-4 self-start text-sm text-gray-600 dark:text-gray-400 hover:underline"
//       >
//         Volver
//       </button>
//     </div>
//   );
// };

// export default PayWithBancolombia;