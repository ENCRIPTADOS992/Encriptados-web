import { IconSvgProps } from "@/shared/types/IconSvgProps";
import React from "react";

interface PhySimSvgProps extends IconSvgProps {
  color?: string;
}

const ArrowRightSvg: React.FC<PhySimSvgProps> = ({
  width = 13,
  height = 21,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.025 20.5L0.25 18.725L8.475 10.5L0.25 2.275L2.025 0.5L12.025 10.5L2.025 20.5Z"
        fill="#1C1B1F"
      />
    </svg>
  );
};

export default ArrowRightSvg;
