// src/shared/components/ModalPayment/icons/CardMethodIcon.tsx
import React from "react";

const CardMethodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Ejemplo de icono de tarjeta de crédito */}
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" />
    <rect x="4" y="14" width="4" height="2" fill="currentColor" />
  </svg>
);

export default CardMethodIcon;
