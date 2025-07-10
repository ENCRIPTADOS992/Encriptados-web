import { useTranslations } from "next-intl";
import React from "react";
import KeyRotateResponsive from "./KeyRotateResponsive";
import Button from "@/shared/components/Button";
import SectionWrapper from "@/shared/components/SectionWrapper";

interface PhoneSecureEncryptedProps {
  onTestInit: () => void;
}

const PhoneSecureEncrypted: React.FC<PhoneSecureEncryptedProps> = ({ onTestInit }) => {
  const t = useTranslations("EncryptedTestPage");

  return (
    <SectionWrapper className="flex flex-col md:flex-row items-center justify-between bg-[#161616] rounded-2xl p-6 min-h-[450px]">
      {/* Columna izquierda: SVG + Título*/}
      <div className="flex flex-col flex-1 w-full justify-center">
        {/* Icono + h1 en una línea */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <span className="flex-shrink-0">
            <svg
              width="150"
              height="150"
              viewBox="130 180 330 290" // <-- Ajusta los valores para el contenido real
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
                  d="M204.667 414.167C198.708 414.167 193.608 412.045 189.365 407.802C185.122 403.559 183 398.459 183 392.5V349.167H204.667V360H313V230H204.667V240.834H183V197.5C183 191.542 185.122 186.441 189.365 182.198C193.608 177.955 198.708 175.833 204.667 175.833H313C318.958 175.833 324.059 177.955 328.302 182.198C332.545 186.441 334.667 191.542 334.667 197.5V392.5C334.667 398.459 332.545 403.559 328.302 407.802C324.059 412.045 318.958 414.167 313 414.167H204.667ZM204.667 381.667V392.5H313V381.667H204.667ZM165.667 349.167L150.5 334L211.167 273.334H172.167V251.667H248V327.5H226.333V288.5L165.667 349.167ZM204.667 208.333H313V197.5H204.667V208.333Z"
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
                  <stop offset="0.6" />
                  <stop offset="1" stopColor="#00232E" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_0_1"
                  x1="242.583"
                  y1="175.833"
                  x2="242.583"
                  y2="414.167"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#35CDFB" />
                  <stop offset="1" stopColor="#00FFB3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <h1 className="ml-5 sm:ml-0 text-white font-bold text-2xl flex-wrap md:text-4xl lg:text-5xl mb-0">
            {t("tryOurPhoneSecure.title")}
          </h1>
        </div>
        {/* Subtítulo debajo */}
        <div className="ml-5 sm:ml-10">
          <h2 className="text-[#B2B2B2] text-base md:text-lg font-normal text-left">
            {t("tryOurPhoneSecure.description")}
          </h2>
        </div>
      </div>
      {/* Botón */}
      <div className="flex justify-center w-full md:w-auto mt-6 md:mt-0 md:ml-10 lg:mr-20">
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


export default PhoneSecureEncrypted;
