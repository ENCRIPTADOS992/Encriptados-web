"use client";

import HeroBanner from "../component/templateApps/HeroBanner";
import HeroBannerMobile from "../component/templateApps/HeroBannerMobile";
import HeroBannerTablet from "../component/templateApps/HeroBannerTablet";
import ProductSection from "../component/templateApps/ProductSection";
import ProductSectionMobile from "../component/templateApps/ProductSectionMobile";
import ProductSectionTablet from "../component/templateApps/ProductSectionTablet";
import ProductFeaturesGrid from "../component/templateApps/ProductFeaturesGrid";
import ProductFeaturesGridMobile from "../component/templateApps/ProductFeaturesGridMobile";
import ProductFeaturesGridTablet from "../component/templateApps/ProductFeaturesGridTablet";
import ProductBenefitsGrid from "../component/templateApps/ProductBenefitsGrid";
import ProductBenefitsGridMobile from "../component/templateApps/ProductBenefitsGridMobile";
import ProductBenefitsGridTablet from "../component/templateApps/ProductBenefitsGridTablet";
import HeroVideoSection from "../component/templateApps/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateApps/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateApps/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateApps/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateApps/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateApps/FeaturedProductsTablet";
import FAQSection from "../component/templateApps/FAQSection";
import FAQSectionMobile from "../component/templateApps/FAQSectionMobile";
import FAQSectionTablet from "../component/templateApps/FAQSectionTablet";
import DownloadAppSection from "../component/templateApps/DownloadAppSection";
import DownloadAppSectionMobile from "../component/templateApps/DownloadAppSectionMobile";
import DownloadAppSectionTablet from "../component/templateApps/DownloadAppSectionTablet";
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
      image: "/images/apps/vault-chat/cipher-chat.png",
      title: "Chat Cifrado",
      description:
        "Privacidad blindada: OMEMO, ECC y AES-256 protegen mensajes, imágenes y audios. Sin acceso del servidor ni datos guardados. Seguridad total.",
    },
    {
      image: "/images/apps/vault-chat/encrypted-chats.png",
      title: "Llamadas Cifradas",
      description:
        "Vaultchat ofrece llamadas encriptadas con ZRTP, AES y autenticación adicional, asegurando la máxima privacidad y protección contra accesos no autorizados.",
    },
    {
      image: "/images/apps/vault-chat/self-destructing-messages.png",
      title: "Mensajes Autodestructivos",
      description:
        "Los mensajes que se autodestruyen tienen prioridad sobre todo. Configura tu temporizador para destruir todos los mensajes cuando se acabe el tiempo",
    },
    {
      image: "/images/apps/vault-chat/broadcast-lists.png",
      title: "Listas de difusión",
      description:
        "La lista de difusión permite enviar mensajes cifrados a varios contactos a la vez y, al guardarlas, evita seleccionar uno por uno en cada envío.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/vault-chat/icono.png",
      title: "Notificaciones privadas",
      description:
        "Mantén la confidencialidad de los tiempos y recuentos de llegada de los mensajes eligiendo que las notificaciones push se originen en nuestros servidores",
    },
    {
      icon: "/images/apps/vault-chat/icono.png",
      title: "Características de última generación",
      description:
        "VaultChat está repleto de funciones y seguridad. Ofrecemos productos de última generación para su uso.",
    },
    {
      icon: "/images/apps/vault-chat/icono.png",
      title: "Monitoreo 24/7",
      description:
        "El monitoreo de seguridad de la infraestructura brinda protección a la red con medidas preventivas para denegar el acceso no autorizado y la actividad maliciosa.",
    },
    {
      icon: "/images/apps/vault-chat/icono.png",
      title: "Datos Cifrados en Reposo",
      description:
        "Todos los datos almacenados en VaultChat se cifran mediante una base de datos cifrada personalizada con AES-256.",
    },
    {
      icon: "/images/apps/vault-chat/icono.png",
      title: "Protección de Contraseña",
      description:
        "Nuestra protección con contraseña requerida mantiene tus datos en VaultChat cifrados y protegidos, incluso si tu dispositivo está desbloqueado. Varios intentos incorrectos borrarán todos los datos.",
    },
    {
      icon: "/images/apps/vault-chat/icono.png",
      title: "Cifrado Multicapa",
      description:
        "Las comunicaciones entrantes y salientes se cifran de extremo a extremo y se transmiten a través de una red cifrada. Todos los datos almacenados en el dispositivo están protegidos y encriptados.",
    },        
  ];
  const Faqs =[
    {
      question: "¿Qué es VaultChat?",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Cuál es la diferencia de VaultChat con VaultSecure?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Qué ventajas se obtienen al usar VaultChat?",
      answer: "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
    },
  ]
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/vault-chat/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/vault-chat/hero-mobile.png" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/vault-chat/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <ProductSection
        title="VaultChat"
        description="Plataforma de comunicación cifrada optimizada con cifrado multicapa de alta gama."
        features={[
          "Verificaciones de usuario",
          "Mensajes autodestructivos",
          "Chats encriptados",
        ]}
        price="220$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/vault-chat/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionMobile
        title="VaultChat"
        description="Plataforma de comunicación cifrada optimizada con cifrado multicapa de alta gama."
        features={[
          "Verificaciones de usuario",
          "Mensajes autodestructivos",
          "Chats encriptados",
        ]}
        price="220$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/vault-chat/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionTablet
        title="VaultChat"
        description="Plataforma de comunicación cifrada optimizada con cifrado multicapa de alta gama."
        features={[
          "Verificaciones de usuario",
          "Mensajes autodestructivos",
          "Chats encriptados",
        ]}
        price="220$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/vault-chat/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <ProductBenefitsGrid 
        title="Cifrado multicapa de alta gama"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile 
        title="Cifrado multicapa de alta gama"
        benefits={benefits}
        />
      <ProductBenefitsGridTablet 
        title="Cifrado multicapa de alta gama"
        benefits={benefits}
        />
      <HeroVideoSection
        title={`Vault Chat, aplicación para comunicaciones encriptadas y privadas`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Vault Chat, aplicación para comunicaciones encriptadas y privadas`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Vault Chat, aplicación para comunicaciones encriptadas y privadas`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/vault-chat/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/vault-chat/phone.png",
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
          image: "/images/apps/vault-chat/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/vault-chat/phone.png",
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
          image: "/images/apps/vault-chat/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/vault-chat/phone.png",
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
