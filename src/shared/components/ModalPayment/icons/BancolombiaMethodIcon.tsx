// src/shared/components/ModalPayment/icons/BancolombiaMethodIcon.tsx
import React from "react";

const BancolombiaMethodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Ejemplo de “Bancolombia” (usa tu propio path de logo) */}
    <path
      d="M256 0C114.616 0 0 114.616 0 256s114.616 256 256 256 256-114.616 256-256S397.384 0 256 0zm0 472c-119.103 0-216-96.897-216-216S136.897 40 256 40s216 96.897 216 216-96.897 216-216 216z"
      fill="currentColor"
    />
    <path
      d="M180 200h152v112H180z"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
);

export default BancolombiaMethodIcon;
