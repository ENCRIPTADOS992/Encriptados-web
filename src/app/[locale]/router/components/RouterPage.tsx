"use client";
import { useEffect, useState, useRef } from "react";

import RouterProduct from "./RouterProduct";
import RouterDescription from "./RouterDescription";
import RouterBenefits from "./RouterBenefits";
import RouterFeatures from "./RouterFeatures";
import RouterSystemFeatures from "./RouterSystemFeatures";
import RouterVideo from "./RouterVideo";
import RouterSims from "./RouterSims";
import RouterFaq from "./RouterFaq";
import HeroBanner from "./HeroBanner";
import HeroBannerMobile from "./HeroBannerMobile";
import HeroBannerTablet from "./HeroBannerTablet";
import ProductSection from "./ProductSection";
import ProductSectionMobile from "./ProductSectionMobile";
import ProductSectionTablet from "./ProductSectionTablet";
import StickyPriceBannerDesktop from "./StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "./StickyPriceBannerTablet";
import StickyPriceBannerMobile from "./StickyPriceBannerMobile";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useSearchParams } from "next/navigation";
import { plans } from "../consts/plans";
import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";

const RouterPage = () => {
  const searchParams = useSearchParams();
  const { openModal } = useModalPayment();
  const plan = searchParams.get("plan");
  const priceBlockRef = useRef<HTMLDivElement | null>(null);

  const selected = plan || plans[0].value;
  const { isVisible } = usePriceVisibility(priceBlockRef);
  
  const productInfo = {
  title: "Silent Phone",
  price: "99$ USD",
  subtitle: "Comunicación cifrada y segura",
  iconUrl: "/images/apps/silent-circle/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 35,
  productId: 142,
  onBuy: () => {
      openModal({
        productid: "142",          
        languageCode: "es",
        selectedOption: 35,        
      });
    },
  onChat: () => {
    console.log("chat telegram");
  },
};

const handleRadioChange = (val: string) => {
        console.log("Cambio radio a:", val);
        setSelectedRadio(val);
      };
      
        const [selectedRadio, setSelectedRadio] = useState<string>("");
        useEffect(() => {
        if (
          plans.length > 0 &&
          (!selectedRadio || !plans.some((p) => p.label === selectedRadio))
        ) {
          console.log("Inicializa selectedRadio con:", plans[0].label);
          setSelectedRadio(plans[0].label);
        }
      }, [plans]);

  return (
    <main className="bg-white min-h-screen">
      <HeroBanner
      imageUrl="/images/router/routerCamaleon.png"
        alt="Armadillo Hero Banner"
         />

      <HeroBannerMobile
      imageUrl="/images/router/routerCamaleon.png"
        alt="Armadillo Hero Banner" />

      <HeroBannerTablet
      imageUrl="/images/router/routerCamaleon.png"
        alt="Armadillo Hero Banner" />

      <ProductSection
        title="Camaleón Router"
        description="El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."
        features={[
          "Cambio de IMEI ",
          "Doble VPN",
          "Conexión segura",
        ]}
        price="750$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionMobile
        title="Camaleón Router"
        description="El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."
        features={[
          "Cambio de IMEI ",
          "Doble VPN",
          "Conexión segura",
        ]}
        price="750$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionTablet
        title="Camaleón Router"
        description="El Router Camaleón es la solución ideal para aquellos que buscan privacidad total y una conexión segura a Internet."
        features={[
          "Cambio de IMEI ",
          "Doble VPN",
          "Conexión segura",
        ]}
        price="750$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      {/* <RouterProduct /> */}
      <div className="hidden lg:block">
        <StickyPriceBannerDesktop
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <StickyPriceBannerTablet
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <StickyPriceBannerMobile
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>
      <RouterDescription/>
      <RouterBenefits />
      <RouterFeatures />
      <RouterSystemFeatures />
      <RouterVideo />
      <RouterSims />
      <RouterFaq />
    </main>
  );
};

export default RouterPage;