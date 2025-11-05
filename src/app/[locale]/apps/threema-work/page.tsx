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
  iconUrl: "/images/apps/threema-work/logo.png", 
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
      image: "/images/apps/threema-work/chat.png",
      title: "Mensajes de Texto y Voz",
      description:
        "Chatee de forma completamente anónima. Si prefieres ahorrar tiempo, los mensajes de voz son una alternativa muy práctica.",
    },
    {
      image: "/images/apps/threema-work/verificacion.png",
      title: "Verificación de Contacto",
      description:
        "Confirma tus contactos escaneando su código QR para protegerte de ataques de intermediarios.",
    },
    {
      image: "/images/apps/threema-work/grupos.png",
      title: "Grupos de chat",
      description:
        "Envía mensajes a varios destinatarios simultáneamente. La gestión es descentralizada, y solo los miembros conocen su identidad.",
    },
    {
      image: "/images/apps/threema-work/llamadas.png",
      title: "Llamadas de Voz y Video",
      description:
        "Realiza llamadas sin revelar tu número. Las llamadas en Threema están cifradas de extremo a extremo y ofrecen una calidad de sonido y video excepcionales.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/threema-work/icono.png",
      title: "Chats Privados",
      description:
        "Oculta tus conversaciones más confidenciales y protégelas con un PIN o huella digital.",
    },
    {
      icon: "/images/apps/threema-work/icono.png",
      title: "Chatea de Forma Anónima",
      description:
        "Disfruta de conversaciones sin revelar tu número de teléfono, garantizando así tu total privacidad.",
    },
    {
      icon: "/images/apps/threema-work/icono.png",
      title: "Editar y Borrar Mensajes",
      description:
        "Si cometes un error tipográfico, puedes editar tus mensajes enviados o eliminarlos para que los destinatarios no los vean.",
    },
    {
      icon: "/images/apps/threema-work/icono.png",
      title: "Anonimato Total sin Datos Personales",
      description:
        "En Threema, no necesitas un número de teléfono ni un correo electrónico. Tu ID de Threema garantiza tu anonimato, permitiéndote comunicarte sin dejar huellas digitales ni revelar tu red personal.",
    },
    {
      icon: "/images/apps/threema-work/icono.png",
      title: "Aplicación iOS Más Vendida",
      description:
        "Google & Apple reconocieron a Threema al incluirla en su prestigiosa lista de las mejores aplicaciones de seguridad en sus tiendas.",
    },
    {
      icon: "/images/apps/threema-work/icono.png",
      title: "Las Mejores Calificaciones",
      description:
        "Los usuarios prefieren a Threema. Es la aplicación con más usuarios y mayor alcance.",
    },        
  ];
  const Faqs =[
    {
      question: "¿Cómo funciona Threema.Work?",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Threema.Work puede ser hackeada?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Cuál es la diferencia de Threema.Work con Threema?",
      answer: "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
    },
  ]
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
        imageUrl="/images/apps/threema-work/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/threema-work/hero-mobile.png" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/threema-work/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Threema Work"
        description="Threema.Work ofrece todas las características que se esperan de un mensajero profesional de negocios"
        features={[
          "Chats grupales",
          "Llamadas cifradas",
          "Chats Anónimos",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/threema-work/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionMobile
        title="Threema Work"
        description="Threema.Work ofrece todas las características que se esperan de un mensajero profesional de negocios"
        features={[
          "Chats grupales",
          "Llamadas cifradas",
          "Chats Anónimos",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/threema-work/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionTablet
        title="Threema Work"
        description="Threema.Work ofrece todas las características que se esperan de un mensajero profesional de negocios"
        features={[
          "Chats grupales",
          "Llamadas cifradas",
          "Chats Anónimos",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/threema-work/banner.png"
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
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <ProductBenefitsGrid 
        title="Con la versión de Threema Work obtienes más beneficios"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile 
        title="Con la versión de Threema Work obtienes más beneficios"
        benefits={benefits}
        />
      <ProductBenefitsGridTablet 
        title="Con la versión de Threema Work obtienes más beneficios"
        benefits={benefits}
        />
      <HeroVideoSection
        title={`Threema.Work la aplicación de mensajería para organizaciones más segura y fácil de usar`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Threema.Work la aplicación de mensajería para organizaciones más segura y fácil de usar`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Threema.Work la aplicación de mensajería para organizaciones más segura y fácil de usar`}
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
          image: "/images/apps/threema-work/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/threema-work/phone.png",
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
          image: "/images/apps/threema-work/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/threema-work/phone.png",
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
          image: "/images/apps/threema-work/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/threema-work/phone.png",
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
