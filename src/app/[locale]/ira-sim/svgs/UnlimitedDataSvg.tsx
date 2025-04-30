import { IconSvgProps } from "@/shared/types/IconSvgProps";
import React from "react";

const UnlimitedDataSvg: React.FC<IconSvgProps> = ({
  width = 21,
  height = 21,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9993 32.668L8.66602 19.3346L12.3993 15.468L19.3327 22.4013V0.667969H24.666V22.4013L31.5993 15.468L35.3327 19.3346L21.9993 32.668ZM5.99935 43.3346C4.53268 43.3346 3.27713 42.8124 2.23268 41.768C1.18824 40.7235 0.666016 39.468 0.666016 38.0013V30.0013H5.99935V38.0013H37.9994V30.0013H43.3327V38.0013C43.3327 39.468 42.8105 40.7235 41.766 41.768C40.7216 42.8124 39.466 43.3346 37.9994 43.3346H5.99935Z"
        fill="url(#paint0_linear_681_21749)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_681_21749"
          x1="21.9993"
          y1="0.667969"
          x2="21.9993"
          y2="43.3346"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.235" stopColor="#08BAF0" />
          <stop offset="0.85" stopColor="#1CD2A5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default UnlimitedDataSvg;
