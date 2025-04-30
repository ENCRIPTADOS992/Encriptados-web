import { IconSvgProps } from "@/shared/types/IconSvgProps";
import React from "react";

interface PhySimSvgProps extends IconSvgProps {
  color?: string; // Prop para el color
}

const PhySimSvg: React.FC<PhySimSvgProps> = ({
  width = 21,
  height = 21,
  color, // Color por defecto
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 38.75H11.25V34.25H6.75V38.75ZM6.75 29.75H11.25V20.75H6.75V29.75ZM15.75 38.75H20.25V29.75H15.75V38.75ZM15.75 25.25H20.25V20.75H15.75V25.25ZM24.75 38.75H29.25V34.25H24.75V38.75ZM24.75 29.75H29.25V20.75H24.75V29.75ZM4.5 45.5C3.2625 45.5 2.20312 45.0594 1.32188 44.1781C0.440625 43.2969 0 42.2375 0 41V14L13.5 0.5H31.5C32.7375 0.5 33.7969 0.940625 34.6781 1.82188C35.5594 2.70312 36 3.7625 36 5V41C36 42.2375 35.5594 43.2969 34.6781 44.1781C33.7969 45.0594 32.7375 45.5 31.5 45.5H4.5ZM4.5 41H31.5V5H15.4125L4.5 15.9125V41Z"
        fill={color} // Usar el prop color
      />
    </svg>
  );
};

export default PhySimSvg;
