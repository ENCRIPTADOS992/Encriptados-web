import { useTranslations } from "next-intl";
import React from "react";

const PhoneSecureEncrypted = () => {
  const t = useTranslations("EncryptedTestPage");
  return (
    <div className="flex items-center space-x-4">
      <svg
        width="300"
        height="300"
        viewBox="0 0 576 591"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-83.5"
          y="0.5"
          width="590"
          height="590"
          rx="44.5"
          stroke="url(#paint0_radial_0_1)"
        />
        <rect
          x="84"
          y="49"
          width="492"
          height="492"
          rx="38"
          fill="url(#paint1_linear_0_1)"
        />
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
      <div className="text-xs md:text-4xl text-white">
        <h1 className="-translate-x-28 ml-4">{t("tryOurPhoneSecure.title")}</h1>
        <h2 className="text-[#B2B2B2] text-xs md:text-4xl  ml-4 -translate-x-28">
          {t("tryOurPhoneSecure.description")}
        </h2>
      </div>
    </div>
  );
};

export default PhoneSecureEncrypted;
