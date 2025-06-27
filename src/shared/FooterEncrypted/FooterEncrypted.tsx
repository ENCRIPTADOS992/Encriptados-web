"use client";
import Link from "next/link";
import EncryptedLogoSvg from "../svgs/EncryptedLogoSvg";
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
import SectionWrapper from "../components/SectionWrapper";
import AppleSvgFooter from "../svgs/AppleSvgFooter";
import PlayStoreSvgFooter from "../svgs/PlayStoreSvgFooter";

export default function FooterEncrypted() {
  const t = useTranslations("FooterMenu");

  const sections = [
    {
      title: "SIM - eSIMs",
      items: [t("simEsims.encryptedSim"), "SIM TIM"],
    },
    {
      title: t("encryptedSims.title"),
      items: [
        "Silent phone",
        "VaultChat",
        "Armadillo",
        "Threema",
        "Threema Works",
        "VncLagon",
        "Salt",
        "Nord VPN",
      ],
    },
    {
      title: t("phoneEncrypted.title"),
      items: [
        "Secure MDM iphone",
        "Secure MDM Android",
        "Cryptcom",
        "Renati",
        "Chatmail",
        "Armadillo",
        "VaultChat",
        "UltraX",
        "Intact",
        "DecSecure",
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

  const TERMS_URL = "https://encriptados.io/pages/terminos-y-condiciones/";

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

  const APPS_LINKS: Record<string, string> = {
    "Silent phone": "/apps/silent-circle",
    "VaultChat": "/apps/vault-chat",
    "Armadillo": "/apps/armadillo",
    "Threema": "/apps/threema",
    "Threema Works": "/apps/threema-work",
    "VncLagon": "/apps/vnc-lagoon",
    "Salt": "/apps/salt",
    "Nord VPN": "/apps/nord-vpn",
  };

  const SYSTEMS_LINKS: Record<string, string> = {
    "Secure MDM iphone": "/apps/secure-mdm-iphone",
    "Secure MDM Android": "/apps/secure-mdm-android",
    "Cryptcom": "/apps/cryptcom",
    "Renati": "/apps/renati",
    "Chatmail": "/apps/chat-mail",
    "Armadillo": "/apps/armadillo-v2",
    "VaultChat": "/apps/vault-chat-v2",
    "UltraX": "/apps/ultrax",
    "Intact": "/apps/intact-phone",
    "DecSecure": "/apps/dec-secure",
  };


  return (
    <footer className="bg-black text-gray-300 text-base sm:text-sm md:text-sm lg:text-base">
      <SectionWrapper className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-1 mb-8 flex flex-col items-center sm:items-start">

              <EncryptedLogoSvg className="w-[150px] sm:w-[124px] md:w-[124px] lg:w-[160px] mb-2" />

            <p className="text-lg mb-4 text-center sm:text-left sm:text-sm md:text-sm">
              {t("downloadApp")}
            </p>
            <div className="flex flex-col space-y-2 items-center sm:items-start">
              <AppleSvgFooter />
              <PlayStoreSvgFooter />
              <div className="w-[124px]">
                <DownloadAPKNew width="100%" height="auto" />
              </div>
            </div>

            <div className="mt-4 flex justify-center sm:justify-start">
              <QRFooter />
            </div>
          </div>

          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="col-span-1 mb-8 text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4 md:text-left sm:text-sm md:text-sm">
                {section.title}
              </h3>
              <ul>
                {section.items.map((item) => {
                  const href =
                    sectionIndex === 1
                      ? APPS_LINKS[item]
                      : sectionIndex === 2
                        ? SYSTEMS_LINKS[item]
                        : "#";

                  return (
                    <li key={item}>
                      <Link href={href} className="text-[#787878] hover:text-white">
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="col-span-1 lg:col-span-1 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-left sm:text-sm md:text-sm">
              {t("securePay.title")}
            </h3>
            <div className="grid grid-cols-3 gap-1 sm:gap-1 md:gap-1 lg:gap-2 bg-[#131313] rounded-xl p-2 sm:p-3 md:p-3 lg:p-4">
              {paymentMethods.map(({ key, icon }) => (
                <div
                  key={key}
                  className="rounded flex items-center justify-center p-1 sm:p-1 md:p-1 lg:p-2"
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
            <Link href={TERMS_URL} className="hover:text-white">
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
      </SectionWrapper>
    </footer>
  );
}
