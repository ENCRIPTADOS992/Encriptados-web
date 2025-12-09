"use client";
import React from "react";
import BannerDeliveries from "./BannerDeliveries";
import BannerDeliveriesIpad from "./BannerDeliveriesIpad";
import BannerDeliveriesMobile from "./BannerDeliveriesMobile";
import DeliveriesMap from "./DeliveriesMap";
import HowItWorksDeliveries from "./HowItWorksDeliveries";
import HowItWorksDeliveriesTablet from "./HowItWorksDeliveriesTablet";
import HowItWorksDeliveriesMobile from "./HowItWorksDeliveriesMobile";
import FeaturedProductsDeliveries from "./FeaturedProductsDeliveries";
import ModalJoinUsDeliveries from "./ModalJoinUsDeliveries";
import FAQSection from "./FAQSection";
import FAQSectionMobile from "./FAQSectionMobile";
import FAQSectionTablet from "./FAQSectionTablet";
import { JoinUsModalProvider } from "../context/JoinUsModalContext";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import LogoCarousel from "./LogoCarousel";
import RenatiEncryptedCellphone from "./RenatiEncryptedCellphone";
import RenatiEncryptedCellphoneIpad from "./RenatiEncryptedCellphoneIpad";
import RenatiEncryptedCellphoneMobil from "./RenatiEncryptedCellphoneMobil";
import ProductCarouselTablet from "./ProductCarouselTablet";
import ProductCarouselMobile from "./ProductCarouselMobile";
import TelegramButton from "@/shared/components/TelegramButton";

import DownloadAppBanner from "./DownloadAppBanner";

const DeliveriesPage = () => {
  const Faqs = [
    {
      question:
        "¿Qué es la Entrega Rápida de Encriptados?",
      answer:
        "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question:
        "¿Qué productos puedo comprar con Entrega Rápida?",
      answer:
        "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Qué costo tiene la Entrega Rápida de Encriptados?",
      answer:
        "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
    },
  ];
  return (
    <>
      <BasicFormProvider>
        <JoinUsModalProvider>
          <ModalJoinUsDeliveries />
          <BannerDeliveries />
          <BannerDeliveriesIpad/>
          <BannerDeliveriesMobile/>
          <div id="deliveries-map">
            <DeliveriesMap />
          </div>
          <section className="w-full flex justify-center py-10">
            <TelegramButton />
          </section>
          <HowItWorksDeliveries />
          <HowItWorksDeliveriesTablet />
          <HowItWorksDeliveriesMobile />
          <RenatiEncryptedCellphone />
          <RenatiEncryptedCellphoneIpad/>
          <RenatiEncryptedCellphoneMobil />
          <FeaturedProductsDeliveries />
          <ProductCarouselTablet/>
          <ProductCarouselMobile/>
          <LogoCarousel />
          <FAQSection faqs={Faqs} />
          <FAQSectionMobile faqs={Faqs} />
          <FAQSectionTablet faqs={Faqs} />
          {/* <DownloadAppBanner/> */}
        </JoinUsModalProvider>
      </BasicFormProvider>
      <div className="rotate-warning">
        <div className="rotate-warning__box">
          <p className="rotate-warning__title">Gira tu dispositivo</p>
          <p className="rotate-warning__text">
            Esta página está optimizada para verse en orientación vertical.
            Por favor, gira tu teléfono para continuar.
          </p>
        </div>
      </div>
    </>
    
  );
};

export default DeliveriesPage;
