import { useTranslations } from "next-intl";
import React from "react";
import KeyRotateResponsive from "./KeyRotateResponsive";
import Button from "@/shared/components/Button";
import SectionWrapper from "@/shared/components/SectionWrapper";

interface KeySecureEncryptedProps {
  onTestInit: () => void;
}

const KeySecureEncrypted: React.FC<KeySecureEncryptedProps> = ({ onTestInit }) => {
  const t = useTranslations("EncryptedTestPage");

  return (
    <SectionWrapper className="flex flex-col sm:flex-row items-center justify-between bg-[#161616] rounded-2xl p-6 min-h-[450px]">
      {/* Columna izquierda: SVG + Título*/}
      <div className="flex flex-col flex-1 w-full justify-center">
        {/* Icono + h1 en una línea */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <span className="flex-shrink-0">
            <svg
              width="150"
              height="150"
              viewBox="130 180 330 290"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_0_1"
                maskUnits="userSpaceOnUse"
                x="118"
                y="165"
                width="260"
                height="260"
              >
                <rect x="118" y="165" width="260" height="260" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_0_1)">
                <path
                  d="M231.75 240.833C231.75 234.875 233.871 229.774 238.114 225.531C242.357 221.288 247.458 219.167 253.417 219.167C259.375 219.167 264.476 221.288 268.719 225.531C272.962 229.774 275.083 234.875 275.083 240.833C275.083 246.792 272.962 251.893 268.719 256.136C264.476 260.379 259.375 262.5 253.417 262.5C247.458 262.5 242.357 260.379 238.114 256.136C233.871 251.893 231.75 246.792 231.75 240.833ZM253.417 425L204.667 376.25L220.917 354.584L204.667 332.917L220.917 309.896V297.167C211.167 291.389 203.312 283.58 197.354 273.74C191.396 263.899 188.417 252.931 188.417 240.833C188.417 222.778 194.736 207.431 207.375 194.792C220.014 182.153 235.361 175.833 253.417 175.833C271.472 175.833 286.819 182.153 299.458 194.792C312.097 207.431 318.417 222.778 318.417 240.833C318.417 252.931 315.437 263.899 309.479 273.74C303.521 283.58 295.667 291.389 285.917 297.167V392.5L253.417 425ZM210.083 240.833C210.083 250.945 213.153 259.837 219.292 267.511C225.43 275.184 233.194 280.285 242.583 282.813V316.667L231.479 332.375L248 354.584L233.104 373.813L253.417 394.125L264.25 383.292V282.813C273.639 280.285 281.403 275.184 287.542 267.511C293.68 259.837 296.75 250.945 296.75 240.833C296.75 228.917 292.507 218.715 284.021 210.229C275.535 201.743 265.333 197.5 253.417 197.5C241.5 197.5 231.298 201.743 222.812 210.229C214.326 218.715 210.083 228.917 210.083 240.833Z"
                  fill="url(#paint2_linear_0_1)"
                />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial_0_1"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(533.096 667.726) rotate(-131.424) scale(889.159 67429.4)"
                >
                  <stop offset="0.211607" stopColor="#35CDFB" />
                  <stop offset="1" stopColor="#00FFB3" />
                </radialGradient>
                <linearGradient
                  id="paint1_linear_0_1"
                  x1="330"
                  y1="49"
                  x2="330"
                  y2="541"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.525" />
                  <stop offset="1" stopColor="#002F21" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_0_1"
                  x1="253.417"
                  y1="175.833"
                  x2="253.417"
                  y2="425"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#35CDFB" />
                  <stop offset="1" stopColor="#00FFB3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <h1 className="ml-5 sm:ml-0 text-white font-bold text-2xl flex-wrap md:text-4xl lg:text-5xl mb-0">
            {t("tryPassowordSecure.title")}
          </h1>
        </div>
        {/* Subtítulo debajo */}
        <div className="ml-5 sm:ml-10">
          <h2 className="text-[#B2B2B2] text-base md:text-lg font-normal text-left">
            {t("tryPassowordSecure.description")}
          </h2>
        </div>
      </div>
      {/* Botón */}
      <div className="flex justify-center w-full sm:w-auto mt-6 md:mt-0 sm:ml-10 lg:mr-20">
        <Button
          onClick={onTestInit}
          rounded="full"
          customStyles="
            px-[30%] sm:px-8 py-4 text-base
            bg-[#E3F8FF] hover:bg-[#b6e8fb]
            !text-black
            font-bold
            transition
          "
          icon={<KeyRotateResponsive />}
          iconPosition="right"
        >
          {t("initTest")}
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default KeySecureEncrypted;
