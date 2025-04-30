import React from "react";
import { IconSvgProps } from "../types/IconSvgProps";

const CopyPaste: React.FC<IconSvgProps> = ({
  width = 21,
  height = 21,
  color = "white", // Asigna un color por defecto
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 21"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.98975 16.5C6.43975 16.5 5.96891 16.3042 5.57725 15.9125C5.18558 15.5208 4.98975 15.05 4.98975 14.5V2.5C4.98975 1.95 5.18558 1.47917 5.57725 1.0875C5.96891 0.695833 6.43975 0.5 6.98975 0.5H15.9897C16.5397 0.5 17.0106 0.695833 17.4022 1.0875C17.7939 1.47917 17.9897 1.95 17.9897 2.5V14.5C17.9897 15.05 17.7939 15.5208 17.4022 15.9125C17.0106 16.3042 16.5397 16.5 15.9897 16.5H6.98975ZM6.98975 14.5H15.9897V2.5H6.98975V14.5ZM2.98975 20.5C2.43975 20.5 1.96891 20.3042 1.57725 19.9125C1.18558 19.5208 0.989746 19.05 0.989746 18.5V4.5H2.98975V18.5H13.9897V20.5H2.98975Z"
        fill={color}
      />
    </svg>
  );
};

export default CopyPaste;
