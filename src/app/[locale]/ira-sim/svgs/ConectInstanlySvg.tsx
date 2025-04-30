import { IconSvgProps } from "@/shared/types/IconSvgProps";
import React from "react";

const ConnectInstanlySvg: React.FC<IconSvgProps> = ({
  width = 21,
  height = 21,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9993 56.332L2.79935 41.932C2.13268 41.4431 1.61046 40.8209 1.23268 40.0654C0.854905 39.3098 0.666016 38.5098 0.666016 37.6654V5.66536C0.666016 4.1987 1.18824 2.94314 2.23268 1.8987C3.27713 0.854254 4.53268 0.332031 5.99935 0.332031H37.9994C39.466 0.332031 40.7216 0.854254 41.766 1.8987C42.8105 2.94314 43.3327 4.1987 43.3327 5.66536V37.6654C43.3327 38.5098 43.1438 39.3098 42.766 40.0654C42.3882 40.8209 41.866 41.4431 41.1993 41.932L21.9993 56.332ZM21.9993 49.6654L37.9994 37.6654V5.66536H5.99935V37.6654L21.9993 49.6654ZM19.1994 34.9987L34.266 19.932L30.5327 16.0654L19.1994 27.3987L13.5993 21.7987L9.73268 25.532L19.1994 34.9987Z"
        fill="url(#paint0_linear_681_21758)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_681_21758"
          x1="21.9993"
          y1="0.332031"
          x2="21.9993"
          y2="56.332"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.235" stopColor="#08BAF0" />
          <stop offset="0.85" stopColor="#1CD2A5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ConnectInstanlySvg;
