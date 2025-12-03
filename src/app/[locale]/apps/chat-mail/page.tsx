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
import { useModalPayment } from "@/providers/ModalPaymentProvider";

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
  const { openModal } = useModalPayment();
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

  const featuresGrid = [
    {
      image: "/images/apps/chat-mail/chat-delete-time.png",
      title: "Chat de texto y voz encriptado ",
      description:
        "Elimina mensajes sin conexión, marca favoritos y usa mensajes autodestructivos que se borran en todos los dispositivos tras el tiempo definido.",
    },
    {
      image: "/images/apps/chat-mail/chat-voice-note.png",
      title: "Chat grupal anónimo",
      description:
        "Envía mensajes a múltiples personas de manera fácil y segura, garantizando al mismo tiempo la protección de las identidades de todos los participantes.",
    },
    {
      image: "/images/apps/chat-mail/chat-protection.png",
      title: "Llamadas encriptadas",
      description:
        "Habla con hasta dos usuarios en ChatMail sin límites. Llamadas ultraseguras, nítidas y rápidas, diseñadas para proteger tu privacidad en todo momento.",
    },
    {
      image: "/images/apps/chat-mail/chat-mail.png",
      title: "Bloqueo de Notas:",
      description:
        "Protege tu información importante con un PIN personalizado. Además, realiza copias de seguridad y restaura de forma segura tus notas y contactos.",
    },
  ];
  const Faqs =[
    {
      question: "¿Es difícil usar un celular encriptado como ChatMail?",
      answer:
        "Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.",
    },
    {
      question: "¿Cómo funcionan los chat cifrados en ChatMail?",
      answer:
        "Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.",
    },
    {
      question: "¿Se puede hackear un celular encriptado?",
      answer:
        "OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa, lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.",
    },
  ];
   const securityFeaturesData = [
    {
      title: "Seguridad de clave privada",
      description:
        "En caso que tus claves privadas lleguen a manos de personas equivocadas, tu información personal seguridad están en riesgo ¡No te preocupes! Tienes control total de tus claves privadas",
    },
    {
      title: "Cifrado integrado multicapa",
      description:
        "Nuestra interfaz de usuario detecta a los usuarios internos y externos, para establecer de forma predeterminada el protocolo de cifrado más seguro disponible.",
    },
    {
      title: "Duress Password y Borrado bajo coacción:",
      description:
        "PPermite configurar una contraseña de coacción (duress password) que, al ingresarse, activa automáticamente el borrado total del dispositivo y reenvía una alerta de emergencia a contactos predefinidos.",
    },
    {
      title: "Interfaz de usuario unificada",
      description:
        "Hemos simplificado por completo la experiencia de usuario al desarrollar el software cifrado más avanzado, intuitivo y potente. Ya no tienes que cambiar entre aplicaciones.",
    },
    {
      title: "Las claves no salen del dispositivo",
      description:
        "Las claves privadas se crean en el dispositivo aleatoriamente para que sean lo más fuerte posible. Tu clave privada nunca deja tu dispositivo.",
    },
    {
      title: "Mensajes autodestructivos programados:",
      description:
        "Envía mensajes, notas, imágenes o archivos que se eliminen automáticamente de todos los dispositivos a una hora preconfigurada (hasta 30 días).",
    },
  ];
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

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
    <div>
      <HeroBanner
        imageUrl="/images/apps/chat-mail/hero-desktop.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/chat-mail/hero-mobile.jpg" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/chat-mail/hero-tablet.jpg" 
        alt="Armadillo Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="CHATMAIL"
        description="Comunicaciones cifradas con una interfaz fácil de usar"
        features={[
          "Mensajes cifrados con imágenes y voz",
          "Interfaz unificada",
          "Chats grupales cifrados",
        ]}
        price="649$ USD"
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
        title="CHATMAIL"
        description="Comunicaciones cifradas con una interfaz fácil de usar"
        features={[
          "Mensajes cifrados con imágenes y voz",
          "Interfaz unificada",
          "Chats grupales cifrados",
        ]}
        price="649$ USD"
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
        title="CHATMAIL"
        description="Comunicaciones cifradas con una interfaz fácil de usar"
        features={[
          "Mensajes cifrados con imágenes y voz",
          "Interfaz unificada",
          "Chats grupales cifrados",
        ]}
        price="649$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/chat-mail/banner.jpg"
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
        title="Protege tu identidad con una seguridad móvil encriptada."
        features={securityFeaturesData}
        imageUrl="/images/apps/chat-mail/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Protege tu identidad con una seguridad móvil encriptada."
        features={securityFeaturesData}
        imageUrl="/images/apps/chat-mail/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="Protege tu identidad con una seguridad móvil encriptada."
        features={securityFeaturesData}
        imageUrl="/images/apps/chat-mail/phoneSecurity.png"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      {/* <ProductBenefitsGrid benefits={benefits} />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/> */}
      <HeroVideoSection
        title={`Chatmail. Blinda tu celular, evita hackeos y protege tus comunicaciones`}
        videoUrl="https://www.youtube.com/embed/snXYLSWpLkg"
      />
      <HeroVideoSectionMobile
        title={`Chatmail. Blinda tu celular, evita hackeos y protege tus comunicaciones`}
        videoUrl="https://www.youtube.com/embed/snXYLSWpLkg"
      />
      <HeroVideoSectionTablet
        title={`Chatmail. Blinda tu celular, evita hackeos y protege tus comunicaciones`}
        videoUrl="https://www.youtube.com/embed/snXYLSWpLkg"
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
