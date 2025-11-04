"use client";

import HeroBanner from "../component/templateSoftware/HeroBanner";
import HeroBannerMobile from "../component/templateSoftware/HeroBannerMobile";
import HeroBannerTablet from "../component/templateSoftware/HeroBannerTablet";
import ProductSection from "../component/templateSoftware/ProductSection";
import ProductSectionMobile from "../component/templateSoftware/ProductSectionMobile";
import ProductSectionTablet from "../component/templateSoftware/ProductSectionTablet";
import ProductFeaturesGrid from "../component/templateSoftware/ProductFeaturesGrid";
import ProductFeaturesGridMobile from "../component/templateSoftware/ProductFeaturesGridMobile";
import ProductFeaturesGridTablet from "../component/templateSoftware/ProductFeaturesGridTablet";
import ProductBenefitsGrid from "../component/templateSoftware/ProductBenefitsGrid";
import ProductBenefitsGridMobile from "../component/templateSoftware/ProductBenefitsGridMobile";
import ProductBenefitsGridTablet from "../component/templateSoftware/ProductBenefitsGridTablet";
import HeroVideoSection from "../component/templateSoftware/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateSoftware/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateSoftware/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateSoftware/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateSoftware/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateSoftware/FeaturedProductsTablet";
import SecurityFeatures from "../component/templateSoftware/SecurityFeatures";
import SecurityFeaturesTablet from "../component/templateSoftware/SecurityFeaturesTablet";
import SecurityFeaturesMobile from "../component/templateSoftware/SecurityFeaturesMobile";
import FAQSection from "../component/templateSoftware/FAQSection";
import FAQSectionMobile from "../component/templateSoftware/FAQSectionMobile";
import FAQSectionTablet from "../component/templateSoftware/FAQSectionTablet";
import DownloadAppSection from "../component/templateSoftware/DownloadAppSection";
import DownloadAppSectionMobile from "../component/templateSoftware/DownloadAppSectionMobile";
import DownloadAppSectionTablet from "../component/templateSoftware/DownloadAppSectionTablet";
import { plans } from "./consts/plans";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import StickyPriceBannerDesktop from "../component/templateApps/StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "../component/templateApps/StickyPriceBannerTablet";
import StickyPriceBannerMobile from "../component/templateApps/StickyPriceBannerMobile";

const prices: Record<string, string> = {
  "6": "349$ USD",
  "12": "595$ USD",
  "12.1": "1495$ USD",
};

const Page = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const productId = searchParams.get("productId");
  const selected = plan || plans[0].value;
  const [product, setProduct] = useState<ProductById | null>(null);
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const productInfo = {
  title: "Silent Phone",
  price: "99$ USD",
  subtitle: "Comunicación cifrada y segura",
  iconUrl: "/images/apps/silent-circle/logo.png", 
  ctaLabel: "Comprar ahora",
  onBuy: () => {
    console.log("comprar");
  },
  onChat: () => {
    console.log("chat telegram");
  },
};

  const Faqs =[
    {
      question: "¿Cómo se hace la encriptación de un celular?",
      answer:
        "Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.",
    },
    {
      question: "¿Qué funcionalidades voy a tener al encriptar mi celular?",
      answer:
        "Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.",
    },
    {
      question: "¿Cómo funciona el borrado remoto en un celular encriptado?",
      answer:
        "OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa, lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.",
    },
  ];
   const securityFeaturesData = [
    {
      title: "X- Safe",
      description:
        "Es la tienda de aplicaciones oficial del Celular. Encuentra diferentes Aplicaciones para comunicarte con Compañeros, familiares y amigos.",
    },
    {
      title: "X-Control",
      description:
        "Lleva el control completo de todas tus Aplicaciones. Puedes adicionar patrones De desbloqueo, cambiar el Android ID.",
    },
    {
      title: "X‑Shield:",
      description:
        "Con X‑Shield, UltraX te ofrece un control granular sobre el tráfico de tu dispositivo. Puedes configurar reglas personalizadas de firewall, controlando el acceso a datos sensibles, Wi‑Fi, GPS, cámara y micrófono.",
    },
    {
      title: "X-Mail",
      description:
        "Correo electrónico seguro y noticias en cualquier parte del mundo. Notificaciones Push, Archivo de mensajes y atajos de teclado.",
    },
    {
      title: "X-Change",
      description:
        "Cambia tu MAC ID para tus conexiones A internet y mantente seguro y protegido.",
    },
    {
      title: "X‑Detect:",
      description:
        "Sistema capaz de identificar y bloquear intentos de triangulación o intercepción través de dispositivos IMSI‑Catcher (también conocidos como Stingrays o fake towers).",
    },
    {
      title: "Sistema Operativo OS",
      description:
        "Es una solución patentada que bloquea cualquier intrusión y cualquier intercambio de información no autorizado.",
    },
    {
      title: "Versatilidad",
      description:
        "Puedes mantener seguras las comunicaciones profesionales e incorporar aplicaciones estándar para hablar con tu familia",
    },
    {
      title: "Protección",
      description:
        "Habla por teléfono con total tranquilidad, guarda y custodia la información confidencial y las bases de datos con total confianza.",
    }
  ];
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/ultrax/hero-desktop.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/ultrax/hero-mobile.png" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/ultrax/hero-tablet.png" 
        alt="Armadillo Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="ULTRA X"
        description="Seguridad para tus comunicaciones con un sistema operativo versátil y seguro"
        features={[
          "Detector de IMSI catcher",
          "Sistema operativo propio",
          "Cambiador de MAC ID",
        ]}
        price="395$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/ultrax/banner.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionMobile
        title="ULTRA X"
        description="Seguridad para tus comunicaciones con un sistema operativo versátil y seguro"
        features={[
          "Detector de IMSI catcher",
          "Sistema operativo propio",
          "Cambiador de MAC ID",
        ]}
        price="395$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/ultrax/banner.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionTablet
        title="ULTRA X"
        description="Seguridad para tus comunicaciones con un sistema operativo versátil y seguro"
        features={[
          "Detector de IMSI catcher",
          "Sistema operativo propio",
          "Cambiador de MAC ID",
        ]}
        price="395$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/ultrax/banner.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      </div>
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
      <SecurityFeatures
        title="Te da protección avanzada contra piratería y ciber ataques"
        features={securityFeaturesData}
        imageUrl="/images/apps/ultrax/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Te da protección avanzada contra piratería y ciber ataques"
        features={securityFeaturesData}
        imageUrl="/images/apps/ultrax/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="Te da protección avanzada contra piratería y ciber ataques"
        features={securityFeaturesData}
        imageUrl="/images/apps/ultrax/phoneSecurity.png"
      />
      <HeroVideoSection
        title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
        videoUrl="https://www.youtube.com/embed/ppr6zQOdINI"
      />
      <HeroVideoSectionMobile
        title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
        videoUrl="https://www.youtube.com/embed/ppr6zQOdINI"
      />
      <HeroVideoSectionTablet
        title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
        videoUrl="https://www.youtube.com/embed/ppr6zQOdINI"
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FAQSection faqs={Faqs}/>
      <FAQSectionMobile faqs={Faqs}/>
      <FAQSectionTablet faqs={Faqs}/>
      {/* <DownloadAppSection />
      <DownloadAppSectionMobile/>
      <DownloadAppSectionTablet/> */}
    </div>
  );
};

export default Page;
