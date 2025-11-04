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
  iconUrl: "/images/apps/threema/logo.png", 
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
      image: "/images/apps/threema/chat-cifrado.png",
      title: "Chat Cifrado Extremo",
      description:
        "Habla y chatea con total tranquilidad: tu comunicación está protegida con cifrado de extremo a extremo y la tecnología más segura de código abierto.",
    },
    {
      image: "/images/apps/threema/ver-cont.png",
      title: "Verificación de Contacto",
      description:
        "Confirma tus contactos escaneando su código QR para protegerte de ataques de intermediarios.",
    },
    {
      image: "/images/apps/threema/chat-grupal.png",
      title: "Chat Grupal",
      description:
        "Envía mensajes a varios destinatarios simultáneamente. La gestión es descentralizada, y solo los miembros conocen su identidad.",
    },
    {
      image: "/images/apps/threema/voz-video.png",
      title: "Llamadas de Voz y Video",
      description:
        "Realiza llamadas sin revelar tu número. Las llamadas en Threema están cifradas de extremo a extremo y ofrecen una calidad de sonido y video excepcionales.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/threema/icono.png",
      title: "Principio de Cero",
      description:
        "La arquitectura de cero conocimiento garantiza que solo los destinatarios accedan al contenido. Ni terceros ni Threema pueden leer tus mensajes, asegurando la privacidad total.",
    },
    {
      icon: "/images/apps/threema/icono.png",
      title: "Anonimato",
      description:
        "Threema protege tu privacidad: no necesitas número ni correo. Con tu ID puedes comunicarte de forma segura, sin exponer tu identidad ni tu red personal.",
    },
    {
      icon: "/images/apps/threema/icono.png",
      title: "Protección Máxima",
      description:
        "Los mensajes se eliminan de nuestros servidores tras la entrega y las listas de contactos se mantienen en tu dispositivo, dejando pocas huellas digitales y protegiendo tu identidad.",
    },
    {
      icon: "/images/apps/threema/icono.png",
      title: "Libre de Publicidad",
      description:
        "Threema opera sin redes publicitarias ni Big Tech. No vende datos ni utiliza publicidad, garantizando comunicación confiable y privada en todo momento.",
    },
    {
      icon: "/images/apps/threema/icono.png",
      title: "Aplicación premiada",
      description:
        "Google & Apple reconocieron a Threema al incluirla en su prestigiosa lista de las mejores aplicaciones de seguridad en sus tiendas.",
    },
    {
      icon: "/images/apps/threema/icono.png",
      title: "Las Mejores Calificaciones",
      description:
        "Los usuarios prefieren a Threema. Es la aplicación con más usuarios y mayor alcance.",
    },        
  ];
  const Faqs =[
    {
      question: "¿Para qué sirve la aplicación Threema?",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Cómo funciona la aplicación Threema?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Qué tal es la seguridad y privacidad de la aplicación Threema?",
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
        imageUrl="/images/apps/threema/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/threema/hero-mobile.png" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/threema/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Threema App"
        description="Disponible para Android: descarga el APK y accede ingresando tu código de activación."
        features={[
          "Cifrado de extremo a extremo",
          "Ocultamiento de chats con PIN",
          "Llamadas privadas",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/threema/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionMobile
        title="Threema App"
        description="Disponible para Android: descarga el APK y accede ingresando tu código de activación."
        features={[
          "Cifrado de extremo a extremo",
          "Ocultamiento de chats con PIN",
          "Llamadas privadas",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/threema/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      </div>
      <div ref={priceBlockRef}>
      <ProductSectionTablet
        title="Threema App"
        description="Disponible para Android: descarga el APK y accede ingresando tu código de activación."
        features={[
          "Cifrado de extremo a extremo",
          "Ocultamiento de chats con PIN",
          "Llamadas privadas",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/threema/banner.png"
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
        title="Mensajería privada. Simple y Segura."
        benefits={benefits}
      />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/>
      <HeroVideoSection
        title={`Threema, la aplicación cifrada más vendida del mundo`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Threema, la aplicación cifrada más vendida del mundo`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Threema, la aplicación cifrada más vendida del mundo`}
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
          image: "/images/apps/threema/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/threema/phone.png",
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
          image: "/images/apps/threema/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/threema/phone.png",
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
          image: "/images/apps/threema/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/threema/phone.png",
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
