import React from "react";
import { IconSvgProps } from "../types/IconSvgProps";

const ArrowDown: React.FC<IconSvgProps> = ({
  width = 21,
  height = 21,
  color = "white",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.41276 4.50016L0.246094 0.333496H8.57943L4.41276 4.50016Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDown;
