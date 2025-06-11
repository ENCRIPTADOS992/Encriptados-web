// src/shared/components/ModalPayment/icons/CardMethodIcon.tsx
import * as React from "react";

const CardMethodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default CardMethodIcon;
