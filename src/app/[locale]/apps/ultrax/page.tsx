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
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

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
  const featuresGrid = [
    {
      image: "/images/apps/ultrax/chat-delete-time.png",
      title: "Chat de texto y voz encriptado ",
      description:
        "Elimina mensajes sin conexión, marca favoritos y usa mensajes autodestructivos que se borran en todos los dispositivos tras el tiempo definido.",
    },
    {
      image: "/images/apps/ultrax/chat-voice-note.png",
      title: "Chat grupal anónimo",
      description:
        "Envía mensajes a múltiples personas de manera fácil y segura, garantizando al mismo tiempo la protección de las identidades de todos los participantes.",
    },
    {
      image: "/images/apps/ultrax/chat-protection.png",
      title: "Llamadas encriptadas",
      description:
        "Habla con hasta dos usuarios en ChatMail sin límites. Llamadas ultraseguras, nítidas y rápidas, diseñadas para proteger tu privacidad en todo momento.",
    },
    {
      image: "/images/apps/ultrax/ultrax.png",
      title: "Bloqueo de Notas:",
      description:
        "Protege tu información importante con un PIN personalizado. Además, realiza copias de seguridad y restaura de forma segura tus notas y contactos.",
    },
  ];
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
      {/* <ProductBenefitsGrid benefits={benefits} />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/> */}
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
      <DownloadAppSection />
      <DownloadAppSectionMobile/>
      <DownloadAppSectionTablet/>
    </div>
  );
};

export default Page;
