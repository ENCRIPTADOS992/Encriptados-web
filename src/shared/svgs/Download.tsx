import React from "react";
import { IconSvgProps } from "../types/IconSvgProps";

const Download: React.FC<IconSvgProps> = ({
  width = 21,
  height = 21,
  color = "white", // Asigna un color por defecto
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.48975 12.5L3.48975 7.5L4.88975 6.05L7.48975 8.65V0.5H9.48975V8.65L12.0897 6.05L13.4897 7.5L8.48975 12.5ZM2.48975 16.5C1.93975 16.5 1.46891 16.3042 1.07725 15.9125C0.685579 15.5208 0.489746 15.05 0.489746 14.5V11.5H2.48975V14.5H14.4897V11.5H16.4897V14.5C16.4897 15.05 16.2939 15.5208 15.9022 15.9125C15.5106 16.3042 15.0397 16.5 14.4897 16.5H2.48975Z"
        fill={color}
      />
    </svg>
  );
};

export default Download;
