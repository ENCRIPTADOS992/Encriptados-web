// src/shared/components/ModalPayment/icons/CryptoIcon.tsx
import * as React from "react";

const CryptoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-coins"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
    <path d="M4 12v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
  </svg>
);

export default CryptoIcon;
