// src/shared/svgs/EthFooter.tsx
import React from "react";

interface EthFooterProps extends React.SVGProps<SVGSVGElement> {
  fillColor?: string;
}

const EthFooter: React.FC<EthFooterProps> = ({
  fillColor = "#6E6E6E",
  width = 45,
  height = 45,
  ...props
}) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fillRule="evenodd">
      <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z" />
      <g fillRule="nonzero">
        <path
          fillOpacity=".298"
          d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"
        />
        <path
          fillOpacity=".801"
          d="M16.498 20.573l7.497-4.353-7.497-3.348z"
        />
        <path
          fillOpacity=".298"
          d="M9 16.22l7.498 4.353v-7.701z"
        />
      </g>
    </g>
  </svg>
);

export default EthFooter;
