import { IconSvgProps } from "@/shared/types/IconSvgProps";
import React from "react";

interface PhySimSvgProps extends IconSvgProps {
  color?: string;
}

const LatinAmericSvg: React.FC<PhySimSvgProps> = ({
  width = 21,
  height = 21,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27 0.5C12.096 0.5 0 12.596 0 27.5C0 42.404 12.096 54.5 27 54.5C41.904 54.5 54 42.404 54 27.5C54 12.596 41.904 0.5 27 0.5ZM5.4 27.5C5.4 22.235 7.29 17.402 10.449 13.649L18.9 22.1V24.8C18.9 27.77 21.33 30.2 24.3 30.2V45.293C24.3 46.022 24.597 46.697 25.083 47.21L27 49.1C15.066 49.1 5.4 39.434 5.4 27.5ZM29.7 48.938V43.7L39.825 28.526C40.257 27.851 40.5 27.068 40.5 26.285V23.45C40.5 21.965 39.285 20.75 37.8 20.75H33.75L29.97 16.025C28.944 14.756 27.405 14 25.758 14H16.2V8.789C19.4826 6.89134 23.2083 5.8947 27 5.9C38.907 5.9 48.6 15.593 48.6 27.5C48.6 38.489 40.338 47.588 29.7 48.938Z"
        fill="black"
      />
    </svg>
  );
};

export default LatinAmericSvg;
