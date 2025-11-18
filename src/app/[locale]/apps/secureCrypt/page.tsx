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
import { useModalPayment } from "@/providers/ModalPaymentProvider";

import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import StickyPriceBannerDesktop from "../component/templateApps/StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "../component/templateApps/StickyPriceBannerTablet";
import StickyPriceBannerMobile from "../component/templateApps/StickyPriceBannerMobile";

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
  productId: 174,
  onBuy: () => {
      openModal({
        productid: "174",          
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
      image: "/images/apps/secureCrypt/imagen_setup.png",
      title: "Cifrado ECC",
      description:
        "El protocolo de encriptación SecureCrypt usa encriptación ECC de 512 bits, que es equivalente a RSA de 15,360 bits. Nuevas claves ECC para cada mensaje.",
    },
    {
      image: "/images/apps/secureCrypt/phone_image.png",
      title: "Mensajes temporizados",
      description:
        "Permite configurar un temporizador para que el mensaje se autodestruya automáticamente en los dispositivos del remitente y del destinatario.",
    },
    {
      image: "/images/apps/secureCrypt/mensajes.png",
      title: "Enmascaramiento de Chat",
      description:
        "Con un toque, tus conversaciones se transforman en mensajes aleatorios, asegurando que permanezcan ocultas y protegidas de miradas curiosas.",
    },
    {
      image: "/images/apps/secureCrypt/llamadas.png",
      title: "Llamadas Encriptadas",
      description:
        "Comunicación de voz segura con cifrado extremo a extremo, protegiendo la privacidad de tus conversaciones.",
    },
  ];
  const Faqs = [
    {
      question: "¿Qué archivos puedo proteger con la Aplicación SecureCrypt?",
      answer:
        "Puedes proteger mensajes, archivos, contactos y llamadas de voz. Toda tu información viaja cifrada de extremo a extremo.",
    },
    {
      question:
        "¿Por qué debería usar la aplicación SecureCrypt en mi empresa?",
      answer:
        "Porque ofrece máxima seguridad, protección contra intrusiones y cifrado total, evitando fugas de información corporativa.",
    },
    {
      question:
        "¿Por qué debería usar una aplicación cifrada como SecureCrypt en vez de una convencional?",
      answer:
        "Las apps convencionales no ofrecen protección real ante espionaje, SecureCrypt garantiza privacidad y confidencialidad absoluta.",
    },
  ];
  const securityFeaturesData = [
    {
      title: "Chat encriptado",
      description:
        "Tus mensajes están protegidos con cifrado de extremo a extremo, lo que mantiene la privacidad y seguridad de cada conversación.",
    },
    {
      title: "Borrado remoto",
      description:
        "Elimina y sobrescribe todos los datos del dispositivo, garantizando que no puedan recuperarse, ni siquiera con herramientas forenses avanzadas.",
    },
    {
      title: "Contraseña de coacción",
      description:
        "Ingresa una contraseña secundaria de pánico que elimina instantáneamente la aplicación evitando que sea comprometida",
    },
    {
      title: "Detección de Cables",
      description:
        "Si se conecta algún cable no autorizado al dispositivo donde está instalada la aplicación, esta se desactivará automáticamente evitando que se pueda abrir",
    },
    {
      title: "Copias de seguridad cifrada",
      description:
        "Almacena información crítica de forma segura en nuestra bóveda encriptada y protegida.",
    },
    {
      title: "Cámara Encriptada",
      description:
        "Priorizamos su privacidad con copias de seguridad cifradas que solo cubren sus contactos y bóveda, nunca sus mensajes.",
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
        imageUrl="/images/apps/secureCrypt/banner.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile
        imageUrl="/images/apps/secureCrypt/mobile.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerTablet
        imageUrl="/images/apps/secureCrypt/banner.png"
        alt="Armadillo Hero Banner"
      />
      <div ref={priceBlockRef}>
      <ProductSection
        title="SecureCrypt"
        description="SecureCrypt utiliza servidores globales descentralizados que se autodestruyen cada 24 horas. Para Android y iPhone (iOS)"
        features={[
          "Chat Encriptado",
          "Bóveda encriptada ",
          "Llamadas Encriptadas",
        ]}
        price="375$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/secureCrypt/Group_fondo.png"
        appStoreUrl="https://apps.apple.com/app/securecrypt-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.securecrypt"
      />
      
      <ProductSectionMobile
        title="SecureCrypt"
        description="SecureCrypt utiliza servidores globales descentralizados que se autodestruyen cada 24 horas. Para Android y iPhone (iOS)"
        features={[
          "Chat Encriptado",
          "Bóveda encriptada ",
          "Llamadas Encriptadas",
        ]}
        price="375$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/secureCrypt/Group_fondo.png"
        appStoreUrl="https://apps.apple.com/app/securecrypt-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.securecrypt"
      />
     
      <ProductSectionTablet
        title="SecureCrypt"
        description="SecureCrypt utiliza servidores globales descentralizados que se autodestruyen cada 24 horas. Para Android y iPhone (iOS)"
        features={[
          "Chat Encriptado",
          "Bóveda encriptada ",
          "Llamadas Encriptadas",
        ]}
        price="375$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/secureCrypt/Group_fondo.png"
        appStoreUrl="https://apps.apple.com/app/securecrypt-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.securecrypt"
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
        title="Te mantenemos conectado con encriptación de inicio a fin"
        features={securityFeaturesData}
        imageUrl="/images/apps/secureCrypt/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Te mantenemos conectado con encriptación de inicio a fin"
        features={securityFeaturesData}
        imageUrl="/images/apps/secureCrypt/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="Te mantenemos conectado con encriptación de inicio a fin"
        features={securityFeaturesData}
        imageUrl="/images/apps/secureCrypt/phoneSecurity.png"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} />
      <ProductFeaturesGridTablet features={featuresGrid} />
      <HeroVideoSection
        title={`SecureCrypt App, comunicaciones seguras y encriptadas para chatear en secreto`}
        videoUrl="https://www.youtube.com/embed/YvuaT5-uaUg"
      />
      <HeroVideoSectionMobile
        title={`SecureCrypt App, comunicaciones seguras y encriptadas para chatear en secreto`}
        videoUrl="https://www.youtube.com/embed/YvuaT5-uaUg"
      />
      <HeroVideoSectionTablet
        title={`SecureCrypt App, comunicaciones seguras y encriptadas para chatear en secreto`}
        videoUrl="https://www.youtube.com/embed/YvuaT5-uaUg"
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
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
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
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
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
