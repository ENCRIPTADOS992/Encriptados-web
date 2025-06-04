// src/shared/components/ModalPayment/icons/CryptoIcon.tsx
import React from "react";

const CryptoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Ejemplo genérico de icono “Crypto” (moneda) */}
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" />
    <path
      d="M32 16v32M16 32h32"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CryptoIcon;
