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

import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import StickyPriceBannerDesktop from "../component/templateApps/StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "../component/templateApps/StickyPriceBannerTablet";
import StickyPriceBannerMobile from "../component/templateApps/StickyPriceBannerMobile";

const prices: Record<string, string> = {
  "6": "415$ USD",
  "12": "595$ USD",
  "12.1": "1495$ USD",
};

const Page = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const plan = searchParams.get("plan");
  const [product, setProduct] = useState<ProductById | null>(null);
  const priceBlockRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = usePriceVisibility(priceBlockRef);
  const productInfo = {
  title: "Silent Phone",
  price: "99$ USD",
  subtitle: "Comunicación cifrada y segura",
  iconUrl: "/images/apps/vault-chat-v2/logo.png", 
  ctaLabel: "Comprar ahora",
  onBuy: () => {
    console.log("comprar");
  },
  onChat: () => {
    console.log("chat telegram");
  },
};

  const Faqs = [
    {
      question: "¿Qué es VaultChat?",
      answer:
        "Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.",
    },
    {
      question: "¿Cuál es la diferencia de VaultChat con VaultSecure?",
      answer:
        "Puedes adquirir tu celular Vault chat Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.",
    },
    {
      question: "¿Qué ventajas se obtienen al usar VaultChat?",
      answer:
        "OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.",
    },
  ];
  const securityFeaturesData = [
    {
      title: "Red Privada",
      description:
        "Usamos múltiples redes para nuestras plataformas. Todos nuestros servidores están instalados por separado y no están vinculados a un dispositivo, cuenta o aplicación.",
    },
    {
      title: "Protección",
      description:
        "Todos los dispositivos están protegidos contra fuerza bruta y no pueden ser pirateados. Si es necesario, podemos borrar tu dispositivo de forma remota.",
    },
    {
      title: "Cifrado",
      description:
        "Para cada función utilizamos el cifrado más alto. Estos no se pueden descifrar sin sus claves y contraseñas. Tú controlas tu privacidad.",
    },
    {
      title: "Claves de cifrado en el dispositivo",
      description:
        "Sus claves de cifrado para correo electrónico, chat y llamadas se generan en su dispositivo. Estas claves no salen del dispositivo y se pueden volver a generar en cualquier momento.",
    },
    {
      title: "Seguridad en todos tus dispositivos",
      description:
        "Protege cada equipo con monitoreo constante y defensas avanzadas. Si es necesario, elimina el dispositivo de forma remota y sin dejar rastro.",
    },
    {
      title: "Lanzamiento y actualizaciones",
      description:
        "Actualizamos y mejoramos nuestros productos, seguimos lanzando nuevas actualizaciones con regularidad.",
    }
    
  ];
  const featuresGrid = [
    {
      image: "/images/apps/vault-chat-v2/chats_cifrados.png",
      title: "Chats Cifrados",
      description:
        "Usamos OMEMO, ECC y AES256: ningún mensaje es accesible en el servidor. Sin almacenar datos, ciframos imágenes y notas de voz para mayor seguridad.",
    },
    {
      image: "/images/apps/vault-chat-v2/correo_PGP.png",
      title: "Correo PGP",
      description:
        "Usamos OMEMO, ECC y AES256: ningún mensaje es accesible en el servidor. Sin almacenar datos, ciframos imágenes y notas de voz para mayor seguridad.",
    },
    {
      image: "/images/apps/vault-chat-v2/llamadas_cifradas.png",
      title: "Llamadas Cifradas",
      description:
        "Implementamos la máxima encriptación con ZRTP, autenticación adicional y AES, garantizando la privacidad de tus conversaciones .",
    },
    {
      image: "/images/apps/vault-chat-v2/mensajeria.png",
      title: "Mensajes Autodestructivos",
      description:
        "Los mensajes autodestructivos son prioritarios. Configura un temporizador para eliminarlos al finalizar el tiempo.",
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


  console.log("plans:", plans);
  console.log("selectedRadio:", selectedRadio);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/vault-chat-v2/hero-desktop.jpg"
        alt="Vault chat Hero Banner"
      />
      <HeroBannerMobile
        imageUrl="/images/apps/vault-chat-v2/hero-mobile.jpg"
        alt="Vault chat Hero Banner"
      />
      <HeroBannerTablet
        imageUrl="/images/apps/vault-chat-v2/hero-tablet.jpg"
        alt="Vault chat Hero Banner"
      />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Vault chat"
        description="Comunicación y servidores totalmente cifrados. Todo desarrollado en una interfaz moderna."
        features={[
          "Mensajería cifrada",
          "Red privada descentralizada",
          "Mail y llamadas privadas",
        ]}
        price="415$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/vault-chat-v2/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionMobile
        title="Vault chat"
        description="Comunicación y servidores totalmente cifrados. Todo desarrollado en una interfaz moderna."
        features={[
          "Mensajería cifrada",
          "Red privada descentralizada",
          "Mail y llamadas privadas",
        ]}
        price="415$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/vault-chat-v2/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionTablet
        title="Vault chat"
        description="Comunicación y servidores totalmente cifrados. Todo desarrollado en una interfaz moderna."
        features={[
          "Mensajería cifrada",
          "Red privada descentralizada",
          "Mail y llamadas privadas",
        ]}
        price="415$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/vault-chat-v2/banner.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
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
        title="Comunícate de forma segura y cifrada."
        features={securityFeaturesData}
        imageUrl="/images/apps/vault-chat-v2/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Comunícate de forma segura y cifrada."
        features={securityFeaturesData}
        imageUrl="/images/apps/vault-chat-v2/phoneSecurity.png"
      />

      <SecurityFeaturesMobile
        title="Comunícate de forma segura y cifrada."
        features={securityFeaturesData}
        imageUrl="/images/apps/vault-chat-v2/phoneSecurity.png"
      />

      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>

      <HeroVideoSection
        title={`VaultChat: Aplicación para comunicaciones encriptadas y privadas`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`VaultChat: Aplicación para comunicaciones encriptadas y privadas`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`VaultChat: Aplicación para comunicaciones encriptadas y privadas`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/vault-chat-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/vault-chat-v2/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/vault-chat-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/vault-chat-v2/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/vault-chat-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/vault-chat-v2/phone.png",
        }}
      />
      <FAQSection faqs={Faqs} />
      <FAQSectionMobile faqs={Faqs} />
      <FAQSectionTablet faqs={Faqs} />
      {/* <DownloadAppSection />
      <DownloadAppSectionMobile />
      <DownloadAppSectionTablet /> */}
    </div>
  );
};

export default Page;
