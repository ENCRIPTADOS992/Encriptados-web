import { IconSvgProps } from "@/shared/types/IconSvgProps";
import React from "react";

const HighPriceSvg: React.FC<IconSvgProps> = ({ width = 21, height = 21 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4673 38.0013L9.00065 30.5346L12.734 26.8013L16.4673 30.5346L25.934 21.068L29.6673 24.8013L16.4673 38.0013ZM5.66732 59.3346C4.20065 59.3346 2.9451 58.8124 1.90065 57.768C0.856207 56.7235 0.333984 55.468 0.333984 54.0013V6.0013C0.333984 4.53464 0.856207 3.27908 1.90065 2.23464C2.9451 1.19019 4.20065 0.667969 5.66732 0.667969H32.334C33.8006 0.667969 35.0562 1.19019 36.1007 2.23464C37.1451 3.27908 37.6673 4.53464 37.6673 6.0013V54.0013C37.6673 55.468 37.1451 56.7235 36.1007 57.768C35.0562 58.8124 33.8006 59.3346 32.334 59.3346H5.66732ZM5.66732 51.3346V54.0013H32.334V51.3346H5.66732ZM5.66732 46.0013H32.334V14.0013H5.66732V46.0013ZM5.66732 8.66797H32.334V6.0013H5.66732V8.66797Z"
        fill="url(#paint0_linear_681_21722)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_681_21722"
          x1="19.0007"
          y1="0.667969"
          x2="19.0007"
          y2="59.3346"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.235" stopColor="#08BAF0" />
          <stop offset="0.85" stopColor="#1CD2A5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HighPriceSvg;
