"use client";
import Link from "next/link";
import Image from "next/image";
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
import { useTranslations, useLocale } from "next-intl";
import Marquee from "react-fast-marquee";
import DownloadAPKNew from "@/app/[locale]/our-products/components/svgs/DownloadAPKNew";
import SectionWrapper from "../components/SectionWrapper";
import AppleSvgFooter from "../svgs/AppleSvgFooter";
import PlayStoreSvgFooter from "../svgs/PlayStoreSvgFooter";

export default function FooterEncrypted() {
  const t = useTranslations("FooterMenu");
  const locale = useLocale();

  const sections = [
    {
      title: "SIM - eSIMs",
      items: [t("simEsims.encryptedSim"), t("simEsims.simTim")],
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
  const APPS_NAME_MAP: Record<string, string> = {
    "Silent Circle": "Silent phone",
    "Vnclagoon": "VncLagon",
    "Threema Work": "Threema Works",
    "NordVPN": "Nord VPN",
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
    "Secure Crypt": "/apps/secure-crypt",
  };
  const SYSTEMS_NAME_MAP: Record<string, string> = {
    "DEC Secure": "DecSecure",
  };

  const SIMS_LINKS: Record<string, string> = {
    [t("simEsims.encryptedSim")]: `/${locale}?selectedOption=40#buysimappsection`,
    [t("simEsims.simTim")]: `/${locale}?selectedOption=40&provider=tim#buysimappsection`,
  };

  const simEsimsLinks = [
    { name: "SIM Encriptada", href: "/sim-encriptada" },
    { name: "SIM TIM", href: "/tim-sim" },
  ];
  const aplicacionesLinks = [
    { name: "Silent phone", href: "/apps/silent-circle" },
    { name: "VaultChat", href: "/apps/vault-chat" },
    { name: "Armadillo", href: "/apps/armadillo" },
    { name: "Threema", href: "/apps/threema" },
    { name: "ThreemaWork", href: "/apps/threema-work" },
    { name: "VNClagoon", href: "/apps/vnc-lagoon" },
    { name: "Salt", href: "/apps/salt" },
    { name: "Nord VPN", href: "/apps/nord-vpn" },
  ];
  const sistemasLinks = [
    { name: "Secure MDM iPhone", href: "/apps/secure-mdm-iphone" },
    { name: "Secure MDM Android", href: "/apps/secure-mdm-android" },
    { name: "Cryptcom", href: "/apps/cryptcom" },
    { name: "Renati", href: "/apps/renati" },
    { name: "ChatMail", href: "/apps/chat-mail" },
    { name: "Armadillo", href: "/apps/armadillo-v2" },
    { name: "VaultChat", href: "/apps/vault-chat-v2" },
    { name: "Ultra X", href: "/apps/ultrax" },
    { name: "Intact Phone", href: "/apps/intact-phone" },
    { name: "DEC Secure", href: "/apps/dec-secure" },
    { name: "SecureCrypt", href: "/apps/secureCrypt" },
  ];
  const routersLinks = [{ name: "Router Camaleón", href: "/router" }];


  return (
    <footer className="bg-[#000000] text-white overflow-x-hidden">
      <SectionWrapper className="!max-w-none !w-full !px-0 pt-16 !pb-0">
        <div className="w-full">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-6 lg:gap-10 px-4 sm:px-6 md:px-12">
          <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left lg:w-[220px] flex-shrink-0">
            <Image src="/images/footer/encriptados-logo-201.png" alt="Encriptados Logo" width={180} height={30} className="h-6 w-auto" />
            <p className="text-[#787878] text-sm leading-relaxed">{t("lead")}</p>
            <Link href="https://www.youtube.com/@encriptados_io" target="_blank" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <Image src="/images/footer/logo-youtube.png" alt="YouTube" width={180} height={50} className="h-8 md:h-7 lg:h-10 w-auto" />
            </Link>
            <Image src="/images/footer/qr.png" alt="QR Code Telegram" width={150} height={150} className="w-28 md:w-24 h-auto hidden md:block" />
          </div>

            <div className="flex flex-col gap-4 flex-1">
            <div className="rounded-xl px-4 pt-5 pb-0 sm:px-6 sm:pt-6 sm:pb-0 grid grid-cols-2 gap-3 overflow-hidden w-full max-w-[390px] mx-auto" style={{ background: "linear-gradient(180deg, #111111 43.75%, #2A2A2A 100%)" }}>
              <div className="flex flex-col gap-3 min-w-0">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8333 22.1667L22.1667 15.8333L19.95 13.6167L17.4167 16.15V9.5H14.25V16.15L11.7167 13.6167L9.5 15.8333L15.8333 22.1667ZM15.8333 31.6667C13.6431 31.6667 11.5847 31.251 9.65833 30.4198C7.73194 29.5885 6.05625 28.4604 4.63125 27.0354C3.20625 25.6104 2.07812 23.9347 1.24687 22.0083C0.415625 20.0819 0 18.0236 0 15.8333C0 13.6431 0.415625 11.5847 1.24687 9.65833C2.07812 7.73194 3.20625 6.05625 4.63125 4.63125C6.05625 3.20625 7.73194 2.07812 9.65833 1.24687C11.5847 0.415625 13.6431 0 15.8333 0C18.0236 0 20.0819 0.415625 22.0083 1.24687C23.9347 2.07812 25.6104 3.20625 27.0354 4.63125C28.4604 6.05625 29.5885 7.73194 30.4198 9.65833C31.251 11.5847 31.6667 13.6431 31.6667 15.8333C31.6667 18.0236 31.251 20.0819 30.4198 22.0083C29.5885 23.9347 28.4604 25.6104 27.0354 27.0354C25.6104 28.4604 23.9347 29.5885 22.0083 30.4198C20.0819 31.251 18.0236 31.6667 15.8333 31.6667ZM15.8333 28.5C19.3694 28.5 22.3646 27.2729 24.8187 24.8187C27.2729 22.3646 28.5 19.3694 28.5 15.8333C28.5 12.2972 27.2729 9.30208 24.8187 6.84792C22.3646 4.39375 19.3694 3.16667 15.8333 3.16667C12.2972 3.16667 9.30208 4.39375 6.84792 6.84792C4.39375 9.30208 3.16667 12.2972 3.16667 15.8333C3.16667 19.3694 4.39375 22.3646 6.84792 24.8187C9.30208 27.2729 12.2972 28.5 15.8333 28.5Z" fill="#35CCFA" />
                </svg>
                <h3 className="text-white font-bold text-lg">{t("downloadAppTitle")}</h3>
                <p className="text-[#787878] text-sm">{t("downloadAppDescription")}</p>
              </div>
              <div className="relative flex items-start justify-end w-full">
                <Image src="/images/footer/movil.png" alt="Encriptados App" width={390} height={780} quality={95} sizes="180px" className="w-full h-auto object-contain object-top" />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="#" className="hover:opacity-80 transition-opacity"><Image src="/images/footer/app-store.svg" alt="App Store" width={116} height={35} className="h-8 md:h-7 lg:h-9 w-auto" /></Link>
              <Link href="#" className="hover:opacity-80 transition-opacity"><Image src="/images/footer/google-play.svg" alt="Google Play" width={119} height={35} className="h-8 md:h-7 lg:h-9 w-auto" /></Link>
              <Link href="#" className="hover:opacity-80 transition-opacity"><Image src="/images/footer/apk.svg" alt="Descargar APK" width={119} height={35} className="h-8 md:h-7 lg:h-9 w-auto" /></Link>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 flex-shrink-0">
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold text-sm">{t("headings.simEsims")}</h3>
              <ul className="flex flex-col gap-2">{simEsimsLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold text-sm">{t("headings.apps")}</h3>
              <ul className="flex flex-col gap-2">{aplicacionesLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold text-sm">{t("headings.systems")}</h3>
              <ul className="flex flex-col gap-2">{sistemasLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold text-sm">{t("headings.routers")}</h3>
              <ul className="flex flex-col gap-2">{routersLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul>
            </div>
          </div>
        </div>

        <div className="hidden md:block lg:hidden mt-10">
          <div className="w-full h-px bg-[#2C2C2C] scale-y-[0.5] origin-top"></div>
          <div className="py-8">
          <div className="grid grid-cols-4 gap-8 justify-items-center">
            <div className="flex flex-col gap-3 items-center text-center"><h3 className="text-white font-semibold text-sm">{t("headings.simEsims")}</h3><ul className="flex flex-col gap-2">{simEsimsLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
            <div className="flex flex-col gap-3 items-center text-center"><h3 className="text-white font-semibold text-sm">{t("headings.apps")}</h3><ul className="flex flex-col gap-2">{aplicacionesLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
            <div className="flex flex-col gap-3 items-center text-center"><h3 className="text-white font-semibold text-sm">{t("headings.systems")}</h3><ul className="flex flex-col gap-2">{sistemasLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
            <div className="flex flex-col gap-3 items-center text-center"><h3 className="text-white font-semibold text-sm">{t("headings.routers")}</h3><ul className="flex flex-col gap-2">{routersLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
          </div>
          </div>
        </div>

        <div className="md:hidden mt-8">
          <div className="grid grid-cols-2 justify-items-center gap-2 sm:gap-x-8 sm:gap-y-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3"><h3 className="text-white font-semibold text-sm">{t("headings.simEsims")}</h3><ul className="flex flex-col gap-2">{simEsimsLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
              <div className="flex flex-col gap-3"><h3 className="text-white font-semibold text-sm">{t("headings.apps")}</h3><ul className="flex flex-col gap-2">{aplicacionesLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3"><h3 className="text-white font-semibold text-sm">{t("headings.systems")}</h3><ul className="flex flex-col gap-2">{sistemasLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
              <div className="flex flex-col gap-3"><h3 className="text-white font-semibold text-sm">{t("headings.routers")}</h3><ul className="flex flex-col gap-2">{routersLinks.map((l) => (<li key={l.name}><Link href={l.href} className="text-[#787878] hover:text-white text-sm transition-colors">{l.name}</Link></li>))}</ul></div>
              <Image src="/images/footer/qr.png" alt="QR Code Telegram" width={150} height={150} className="w-36 h-auto mt-4" />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="w-full h-px bg-[#2C2C2C] scale-y-[0.5] origin-top"></div>
          <div className="py-4 flex flex-col md:flex-row flex-wrap items-center gap-3 md:gap-6 justify-center md:justify-center">
            <span className="text-[#787878] text-sm">{t("paymentMethodsTitle")}</span>
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start w-full md:w-auto max-w-[320px] md:max-w-none gap-2 sm:gap-3 md:gap-6 lg:gap-8 bg-[#000000] rounded-xl p-1 sm:p-2">
              {paymentMethods.map(({ key, icon }) => (
                <div key={key} className="rounded flex items-center justify-center p-0.5 sm:p-1 h-7 sm:h-9 [&>svg]:h-full [&>svg]:w-auto [&>img]:h-full [&>img]:w-auto">{icon}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-px bg-[#2C2C2C] scale-y-[0.5] origin-top"></div>
          <div className="py-8 flex flex-wrap items-center justify-center gap-4 text-[#787878] text-sm">
            <Link href={TERMS_URL} className="hover:text-white transition-colors">{t("termsAndConditions")}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t("dataProcesing")}</Link>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-px bg-[#2C2C2C] scale-y-[0.5] origin-top"></div>
          <div className="max-w-[800px] mx-auto">
            <Marquee direction="left" speed={50} gradient={false} delay={0}>
              <div className="flex justify-center">
                {countries.map((country, index) => (
                  <div key={index} className="flex items-center justify-center mb-2 cursor-grab gap-2">
                    <div className="flex justify-center items-center">
                      <div className="w-20 h-14 md:w-16 md:h-16 flex items-center justify-center">{country.flag}</div>
                      <p className="text-xs whitespace-nowrap text-[#787878]">{country.name}</p>
                    </div>
                  </div>
                ))}
                {countries.map((country, index) => (
                  <div key={`duplicate-${index}`} className="flex items-center justify-center mb-2 cursor-grab gap-2">
                    <div className="flex justify-center items-center">
                      <div className="w-20 h-14 md:w-16 md:h-16 flex items-center justify-center">{country.flag}</div>
                      <p className="text-xs whitespace-nowrap text-[#787878]">{country.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
