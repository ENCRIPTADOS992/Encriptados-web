import React from "react";
import { IconSvgProps } from "../types/IconSvgProps";

const ArrowUp: React.FC<IconSvgProps> = ({
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
        d="M4.41276 0.333496L8.57943 4.50016H0.246094L4.41276 0.333496Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowUp;