"use client";
import Button from "@/shared/components/Button";
import { useTranslations } from "next-intl";
import React from "react";

interface SpiralLockProps {
  onTestInit: () => void;
}

const SpiralLock: React.FC<SpiralLockProps> = ({ onTestInit }) => {
  const t = useTranslations("EncryptedTestPage");

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:flex-row lg:gap-8">
      <div className="mb-6 lg:mb-0">
        <Button intent="support" onClick={onTestInit}>
          {t("initTest")}
        </Button>
      </div>
      <svg
        className="w-40 h-auto sm:w-72 lg:w-56"
        viewBox="0 0 320 472"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="236" cy="236" r="149.5" stroke="url(#paint0_linear_0_1)" />
        <circle cx="236" cy="236" r="235.5" stroke="url(#paint1_linear_0_1)" />
        <mask
          id="mask0_0_1"
          maskUnits="userSpaceOnUse"
          x="167"
          y="167"
          width="138"
          height="138"
        >
          <rect x="167" y="167" width="138" height="138" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_0_1)">
          <path
            d="M236 293.5C228.045 293.5 220.57 291.99 213.575 288.972C206.579 285.953 200.493 281.856 195.318 276.681C190.143 271.506 186.046 265.421 183.028 258.425C180.009 251.429 178.5 243.954 178.5 236H190C190 242.325 191.197 248.29 193.593 253.897C195.989 259.503 199.271 264.39 203.44 268.559C207.609 272.728 212.496 276.034 218.103 278.478C223.709 280.922 229.675 282.144 236 282.144C248.841 282.144 259.718 277.687 268.631 268.775C277.543 259.862 282 248.985 282 236.144C282 223.302 277.543 212.425 268.631 203.512C259.718 194.6 248.841 190.144 236 190.144C227.47 190.144 219.732 192.228 212.784 196.397C205.836 200.565 200.35 206.1 196.325 213H213V224.5H178.5V190H190V201.5C195.27 194.504 201.883 188.922 209.837 184.753C217.791 180.584 226.512 178.5 236 178.5C243.954 178.5 251.429 180.009 258.425 183.028C265.42 186.047 271.506 190.144 276.681 195.319C281.856 200.494 285.953 206.579 288.971 213.575C291.99 220.571 293.5 228.046 293.5 236C293.5 243.954 291.99 251.429 288.971 258.425C285.953 265.421 281.856 271.506 276.681 276.681C271.506 281.856 265.42 285.953 258.425 288.972C251.429 291.99 243.954 293.5 236 293.5ZM224.5 259C222.87 259 221.505 258.449 220.403 257.347C219.301 256.245 218.75 254.879 218.75 253.25V236C218.75 234.371 219.301 233.005 220.403 231.903C221.505 230.801 222.87 230.25 224.5 230.25V224.5C224.5 221.337 225.626 218.63 227.878 216.378C230.13 214.126 232.837 213 236 213C239.162 213 241.869 214.126 244.121 216.378C246.373 218.63 247.5 221.337 247.5 224.5V230.25C249.129 230.25 250.494 230.801 251.596 231.903C252.698 233.005 253.25 234.371 253.25 236V253.25C253.25 254.879 252.698 256.245 251.596 257.347C250.494 258.449 249.129 259 247.5 259H224.5ZM230.25 230.25H241.75V224.5C241.75 222.871 241.198 221.505 240.096 220.403C238.994 219.301 237.629 218.75 236 218.75C234.37 218.75 233.005 219.301 231.903 220.403C230.801 221.505 230.25 222.871 230.25 224.5V230.25Z"
            fill="url(#paint2_linear_0_1)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_0_1"
            x1="204.88"
            y1="423.665"
            x2="204.88"
            y2="26.6456"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.211607" stopColor="#35CDFB" />
            <stop offset="1" stopColor="#00FFB3" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_0_1"
            x1="186.918"
            y1="531.981"
            x2="186.918"
            y2="-94.1899"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.211607" stopColor="#35CDFB" />
            <stop offset="1" stopColor="#00FFB3" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_0_1"
            x1="236"
            y1="178.5"
            x2="236"
            y2="293.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#35CDFB" />
            <stop offset="1" stopColor="#00FFB3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SpiralLock;
