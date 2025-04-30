"use client";
import Link from "next/link";
import EncryptedLogoSvg from "../svgs/EncryptedLogoSvg";
import AppleSvg from "../svgs/AppleSvg";
import PlayStoreSvg from "../svgs/PlayStoreSvg";
import QRFooter from "./icon/QRFooter";
import YoutubeFooter from "./icon/YoutubeFooter";
import ColombiaFooterFlag from "./icon/ColombiaFooterFlag";
import ChileFooterFlag from "./icon/ChileFooterFlag";
import MexicoFooterFlag from "./icon/MexicoFooterFlag";
import PeruFooterFlag from "./icon/PeruFooterFlag";
import CostaRicaFooterFlag from "./icon/CostaRicaFooterFlag";
import ElSalvadorFooterFlag from "./icon/ElSalvadorFooterFlag";
import BrasilFooterFlag from "./icon/BrasilFooterFlag";
import BancolombiaFooter from "./payicon/BancolombiaFooter";
import VisaFooter from "./payicon/VisaFooter";
import MasterCardRedYellowFooter from "./payicon/MasterCardRedYellowFooter";
import MasterCardRedBlueFooter from "./payicon/MasterCardRedBlueFooter";
import AmericanExpressFooter from "./payicon/AmericanExpressFooter";
import PSEFooter from "./payicon/PSEFooter";
import BitCoinFooter from "./payicon/BitCoinFooter";
import TFooter from "./payicon/TFooter";
import EthFooter from "./payicon/EthFooter";
import DollarBlueFooter from "./payicon/DollarBlueFooter";
import DFooter from "./payicon/DFooter";
import LFooter from "./payicon/LFooter";
import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";
import DownloadAPKNew from "@/app/[locale]/our-products/components/svgs/DownloadAPKNew";

export default function FooterEncrypted() {
  const t = useTranslations("FooterMenu");

  const sections = [
    {
      title: "SIM - eSIMs",
      items: [t("simEsims.encryptedSim"), "SIM IRA", "SIM TIM"],
    },
    {
      title: t("encryptedSims.title"),
      items: [
        "Silent phone",
        "VncLagon",
        "Threema",
        "Threema Works",
        "Salt",
        "VaultChat",
        "Armadillo",
        "SecureCrypt",
        "Elon",
      ],
    },
    {
      title: t("phoneEncrypted.title"),
      items: [
        "SecureCrypt",
        "Armadillo",
        "UltraX",
        "Intact",
        "DecSecure",
        "Renati",
        "Chatmail",
        "Cryptcom",
        "Secure MDM iphone",
        "Secure MDM Android",
        "VaultChat",
        "T2 Comunicador",
      ],
    },
  ];

  const socialMedia = [
    {
      name: "YouTube",
      icon: <YoutubeFooter />,
      link: "https://www.youtube.com/@encriptados_io",
    },
  ];

  const countries = [
    { name: "Colombia", flag: <ColombiaFooterFlag /> },
    { name: "Chile", flag: <ChileFooterFlag /> },
    { name: "México", flag: <MexicoFooterFlag /> },
    { name: "Perú", flag: <PeruFooterFlag /> },
    { name: "Costa Rica", flag: <CostaRicaFooterFlag /> },
    { name: "El Salvador", flag: <ElSalvadorFooterFlag /> },
    { name: "Brasil", flag: <BrasilFooterFlag /> },
  ];

  const paymentMethods = [
    { key: "bancolombia", icon: <BancolombiaFooter /> },
    { key: "visa", icon: <VisaFooter /> },
    { key: "mastercardRedYellow", icon: <MasterCardRedYellowFooter /> },
    { key: "pse", icon: <PSEFooter /> },
    { key: "americanExpress", icon: <AmericanExpressFooter /> },
    { key: "mastercardRedBlue", icon: <MasterCardRedBlueFooter /> },
    { key: "bitcoin", icon: <BitCoinFooter /> },
    { key: "tether", icon: <TFooter /> },
    { key: "ethereum", icon: <EthFooter /> },
    { key: "dollarBlue", icon: <DollarBlueFooter /> },
    { key: "dFooter", icon: <DFooter /> },
    { key: "lFooter", icon: <LFooter /> },
  ];

  return (
    <footer className="bg-black text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto gap-x-6">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-1 mb-8 flex flex-col items-center md:items-start">
            <EncryptedLogoSvg width={150} height={50} />
            <p className="text-lg mb-4 text-center md:text-left">
              {t("downloadApp")}
            </p>
            <div className="flex flex-col space-y-2 items-center md:items-start">
              <AppleSvg />
              <PlayStoreSvg />
              <DownloadAPKNew width="187" height="55" />
            </div>

            <div className="mt-4 flex justify-center md:justify-start">
              <QRFooter />
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="col-span-1 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                {section.title}
              </h3>
              <ul className="space-y-2 text-center md:text-left">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link href="#" className="hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-1 lg:col-span-1 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
              {t("securePay.title")}
            </h3>
            <div className="grid grid-cols-3 gap-2 bg-[#131313] rounded-xl p-4">
              {paymentMethods.map(({ key, icon }) => (
                <div
                  key={key}
                  className="rounded p-2 flex items-center justify-center"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 mt-8 flex-wrap">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.link}
              className="flex items-center space-x-3 text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
              <div>
                <h1 className="text-sm font-semibold">
                  Sigue nuestro canal de Youtube
                </h1>
                <span className="sr-only">{social.name}</span>
              </div>
            </a>
          ))}
        </div>

        <hr className="w-full border-t border-[#464646] mt-8 mb-4" />
        <div className="flex justify-between items-center text-sm">
          <div>
            <Link href="#" className="hover:text-white">
              Términos y condiciones
            </Link>
            {" | "}
            <Link href="" className="hover:text-white">
              Política y tratamiento de datos.
            </Link>
          </div>
          <p>{t("copyRight")}</p>
        </div>
        <hr className="w-full border-t border-[#464646] mt-4 mb-4" />
        <div>
          <Marquee direction="left" speed={50} gradient={false} delay={0}>
            <div className="flex">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center mb-2 cursor-grab"
                  style={{ width: "120px" }}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-20 h-14 md:w-16 md:h-16 flex items-center justify-center">
                      {country.flag}
                    </div>
                    <p className="text-xs">{country.name}</p>
                  </div>
                </div>
              ))}
              {countries.map((country, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex items-center justify-center mb-2 cursor-grab"
                  style={{ width: "120px" }}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-20 h-14 md:w-16 md:h-16 flex items-center justify-center">
                      {country.flag}
                    </div>
                    <p className="text-xs">{country.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </footer>
  );
}
