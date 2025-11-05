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

import { usePriceVisibility } from "@/shared/hooks/usePriceVisibility";
import StickyPriceBannerDesktop from "../component/templateApps/StickyPriceBannerDesktop";
import StickyPriceBannerTablet from "../component/templateApps/StickyPriceBannerTablet";
import StickyPriceBannerMobile from "../component/templateApps/StickyPriceBannerMobile";

import { plans } from "./consts/plans";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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

  const featuresGrid = [
    {
      image: "/images/apps/silent-circle/self-destructing-messages.png",
      title: "Mensajes con autodestrucción",
      description:
        "Los mensajes se eliminan automáticamente de los dispositivos de envío y recepción después del tiempo que tú determines: desde 1 minuto hasta 90 días.",
    },
    {
      image: "/images/apps/silent-circle/encrypted-voice-notes.png",
      title: "Notas de voz encriptadas",
      description:
        "Notas de voz con la capacidad de grabar y proporcionar una alternativa segura al correo de voz. ",
    },
    {
      image: "/images/apps/silent-circle/secure-messages.png",
      title: "Mensajes seguros",
      description:
        "El cifrado asegura que solo el receptor lea el mensaje desde que presionas 'ENVIAR'. El remitente puede confirmar su recepción y lectura.",
    },
    {
      image: "/images/apps/silent-circle/files-and-documents.png",
      title: "Quemador de Mensaje",
      description:
        "Selecciona cualquier mensaje para borrarlo al instante. Se elimina de todos los dispositivos de quienes participan en la conversación.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Protocolo Seguro",
      description:
        "Las llamadas y chats en Silent Phone utilizan un protocolo diferente que asegura la encriptación de extremo a extremo, gestionando claves de manera confiable con ZRTP para comunicación VOIP segura.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Sin Puertas Traseras",
      description:
        "Silent Phone - Silent Circle no tiene puertas traseras. Las claves de cifrado están siempre en tus manos, garantizando la máxima seguridad para tu empresa.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Diseño Privado",
      description:
        "Creada por expertos en tecnología móvil y encriptación, nuestra tecnología establece el estándar más alto en privacidad y seguridad empresarial.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Cifrado Total",
      description:
        "Silent Phone ofrece cifrado de extremo a extremo para video y mensajería, asegurando que las conversaciones de tu equipo sean completamente privadas. Su implementación y uso son simples y efectivos.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Tecnología de Grado Militar",
      description:
        "ZRTP, desarrollado por Silent Phone - Silent Circle, garantiza un secreto perfecto al destruir las claves al finalizar la llamada.",
    },
    {
      icon: "/images/apps/silent-circle/icono.png",
      title: "Tecnología que Impulsa",
      description:
        "Nuestros servicios garantizan la seguridad de tus datos, posicionando a Silent Phone - Silent Circle como líder en comunicaciones móviles seguras.",
    },
  ];
  const Faqs = [
    {
      question:
        "¿Qué tan segura es la aplicación Silent Phone - Silent Circle?",
      answer:
        "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question:
        "¿En qué celular puedo instalar la aplicación Silent Phone de Silent Circle?",
      answer:
        "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿En qué celular puedo instalar la aplicación Silent Circle?",
      answer:
        "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
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
        imageUrl="/images/apps/silent-circle/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile
        imageUrl="/images/apps/silent-circle/hero-mobile.jpg"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerTablet
        imageUrl="/images/apps/silent-circle/hero-tablet.png"
        alt="Nord VPN Hero Banner"
      />
      <div ref={priceBlockRef}>
        <ProductSection
          title="Silent Phone "
          description="Es una app diseñada por las mejores mentes en tecnología móvil, centrado en mantener tus datos seguros en todo momento"
          features={[
            "Llamadas cifradas",
            "Sin permisos de ubicación",
            "Mensajes temporizados",
          ]}
          price="99$ USD"
          radioOptions={plans.map((p) => p.label)}
          selectedRadio={selected}
          onRadioChange={(val) => {}}
          onBuy={() => {}}
          onChat={() => {}}
          productImage="/images/apps/silent-circle/banner.png"
          appStoreUrl="https://apps.apple.com/app/armadillo-app"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
        />
        <ProductSectionMobile
          title="Silent Phone "
          description="Es una app diseñada por las mejores mentes en tecnología móvil, centrado en mantener tus datos seguros en todo momento"
          features={[
            "Llamadas cifradas",
            "Sin permisos de ubicación",
            "Mensajes temporizados",
          ]}
          price="99$ USD"
          radioOptions={plans.map((p) => p.label)}
          selectedRadio={selected}
          onRadioChange={(val) => {}}
          onBuy={() => {}}
          onChat={() => {}}
          productImage="/images/apps/silent-circle/banner.png"
          appStoreUrl="https://apps.apple.com/app/armadillo-app"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
        />
        <ProductSectionTablet
          title="Silent Phone "
          description="Es una app diseñada por las mejores mentes en tecnología móvil, centrado en mantener tus datos seguros en todo momento"
          features={[
            "Llamadas cifradas",
            "Sin permisos de ubicación",
            "Mensajes temporizados",
          ]}
          price="99$ USD"
          radioOptions={plans.map((p) => p.label)}
          selectedRadio={selected}
          onRadioChange={(val) => {}}
          onBuy={() => {}}
          onChat={() => {}}
          productImage="/images/apps/silent-circle/banner.png"
          appStoreUrl="https://apps.apple.com/app/armadillo-app"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
        />
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <StickyPriceBannerDesktop
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      {/* Tablet */}
      <div className="hidden sm:block lg:hidden">
        <StickyPriceBannerTablet
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      {/* Mobile */}
      <div className="block sm:hidden">
        <StickyPriceBannerMobile
          visible={!isVisible}
          productInfo={productInfo}
        />
      </div>

      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} />
      <ProductFeaturesGridTablet features={featuresGrid} />
      <ProductBenefitsGrid
        title="Te mantenemos conectado de forma segura y privada"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile
        title="Te mantenemos conectado de forma segura y privada"
        benefits={benefits}
      />
      <ProductBenefitsGridTablet
        title="Te mantenemos conectado de forma segura y privada"
        benefits={benefits}
      />
      <HeroVideoSection
        title={`Silent Phone, la aplicación cifrada que protegerá todos tus chats`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Silent Phone, la aplicación cifrada que protegerá todos tus chats`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Silent Phone, la aplicación cifrada que protegerá todos tus chats`}
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
          image: "/images/apps/silent-circle/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/silent-circle/phone.png",
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
          image: "/images/apps/silent-circle/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/silent-circle/phone.png",
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
          image: "/images/apps/silent-circle/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/silent-circle/phone.png",
        }}
      />
      <FAQSection faqs={Faqs} />
      <FAQSectionMobile faqs={Faqs} />
      <FAQSectionTablet faqs={Faqs} />
      {/* <DownloadAppSection />
      <DownloadAppSectionMobile/>
      <DownloadAppSectionTablet/> */}
    </div>
  );
};

export default Page;
