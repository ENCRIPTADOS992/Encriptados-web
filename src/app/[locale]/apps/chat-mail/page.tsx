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
      image: "/images/apps/chat-mail/chat-delete-time.png",
      title: "Chat",
      description:
        "Puedes mantener seguras las comunicaciones profesionales e incorporar aplicaciones estándar para hablar con tu familia.",
    },
    {
      image: "/images/apps/chat-mail/chat-voice-note.png",
      title: "Chat",
      description:
        "Control absoluto de nuevas tecnologías. La tecnología a tu servicio y no al revés, para obtener el mayor control en protección y privacidad.",
    },
    {
      image: "/images/apps/chat-mail/chat-protection.png",
      title: "Protección",
      description:
        "Habla por teléfono con total tranquilidad, guarda y custodia la información confidencial y las bases de datos con total confianza.",
    },
    {
      image: "/images/apps/chat-mail/chat-mail.png",
      title: "ChatMail",
      description:
        "Es una solución patentada que bloquea cualquier intrusión y cualquier intercambio de información no autorizado.",
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
      title: "Seguridad de la red",
      description:
        "Un sofisticado programa de detección y respuesta de amenazas de red frustra los esfuerzos de los ciberatacantes.",
    },
    {
      title: "Control de cortafuegos",
      description:
        "Evita todas las conexiones no autenticadas y no cifradas, eliminando la posibilidad de exposiciones inapropiadas.",
    },
  ];
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

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
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
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
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
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
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/chat-mail/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <SecurityFeatures
        title="Nuestros dispositivos cuentan con programas y aplicaciones exclusivos"
        features={securityFeaturesData}
        imageUrl="/images/apps/chat-mail/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Nuestros dispositivos cuentan con programas y aplicaciones exclusivos"
        features={securityFeaturesData}
        imageUrl="/images/apps/chat-mail/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="Nuestros dispositivos cuentan con programas y aplicaciones exclusivos"
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
