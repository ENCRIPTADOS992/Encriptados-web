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
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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

  const router = useRouter();
  const pathname = usePathname();
  const buildSimMoreInfoUrl = (productId: string) => {
    const basePath = `/our-products/sim-more-info?productId=${productId}`;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (!match) return basePath;

    const locale = match[1];
    if (basePath.startsWith(`/${locale}/`)) return basePath;

    return `/${locale}${basePath}`;
  };

  const handleMoreInfo = (productId: string) => {
    const href = buildSimMoreInfoUrl(productId);
    console.log("[ChatMail Page] 👉 Navegando a más info:", { productId, href });
    router.push(href);
  };

  const handleSimBuy = (productId: string) => {
    console.log("🛒 [ChatMail Page] Comprar SIM", {
      productid: productId,
      languageCode: "es",
    });
    openModal({ productid: productId, languageCode: "es" });
  };

  const productInfo = {
  title: "Silent Phone",
  price: "99$ USD",
  subtitle: "Comunicación cifrada y segura",
  iconUrl: "/images/apps/vnc-lagoon/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 38,
  productId: 134,
  onBuy: () => {
      openModal({
        productid: "134",          
        languageCode: "es",
        selectedOption: 38,        
      });
    },
  onChat: () => {
    console.log("chat telegram");
  },
};

  const featuresGrid = [
    {
      image: "/images/apps/vnc-lagoon/chat.png",
      title: "Chat seguro",
      description:
        "Chat individual o grupal  todo lo que necesita es un navegador.",
    },
    {
      image: "/images/apps/vnc-lagoon/audio.png",
      title: "Audio y Videoconferencia",
      description:
        "Perfecta calidad de audio e imagen. ¡Te sorprenderá este tipo de realidad virtual! Ahorre gastos de viaje y póngase en contacto con su equipo con un solo clic",
    },
    {
      image: "/images/apps/vnc-lagoon/chat.png",
      title: "Transfiere archivos",
      description:
        "Envía cualquier formato de archivo a tus contactos y accede a funciones como cámara, micrófono, datos, red, GPS y otros sensores.",
    },
    {
      image: "/images/apps/vnc-lagoon/videocalls.png",
      title: "Llamadas y videollamadas",
      description:
        "VNCmeet, como parte de VNCtalk, le permite iniciar videollamadas con usuarios invitados externos, que no necesitan una suscripción a VNCtalk. ",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/vnc-lagoon/icono.png",
      title: "Cifrado",
      description:
        "Cifrado de extremo a extremo para la máxima privacidad y secreto en sus comunicaciones.",
    },
    {
      icon: "/images/apps/vnc-lagoon/icono.png",
      title: "Funciona en dispositivos móviles",
      description:
        "No es necesario utilizar una laptop portátil o de escritorio. VNCtalk se ejecuta en cualquier navegador y como una aplicación.",
    },
    {
      icon: "/images/apps/vnc-lagoon/icono.png",
      title: "Pizarras blancas",
      description:
        "Colabora en pizarras blancas con imágenes, formas y texto.",
    },
    {
      icon: "/images/apps/vnc-lagoon/icono.png",
      title: "VNCtalk también es un producto OEM.",
      description:
        "Eso significa que los socios pueden agregar su logotipo, CD / CI y al mismo tiempo modificar la interfaz desde una perspectiva de UX (experiencia de usuario).",
    },
    {
      icon: "/images/apps/vnc-lagoon/icono.png",
      title: "VNCtalk, no tiene publicidad",
      description:
        "y está equipada con una serie de características interesantes como: pantalla compartida, colaboración de documentos en VNCpads y muchas más.",
    },
    {
      icon: "/images/apps/vnc-lagoon/icono.png",
      title: "VNCtalk es escalable",
      description:
        "hasta una gran cantidad de usuarios. Simplemente mejore el ancho de banda, agregue más instancias y listo.",
    },        
  ];
  const Faqs =[
    {
      question: "¿Qué es VNC?",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Cómo funciona VNC Lagoon?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Qué compatibilidad tiene VNC Lagoon?",
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
        imageUrl="/images/apps/vnc-lagoon/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/vnc-lagoon/hero-mobile.png" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/vnc-lagoon/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="VNC Lagoon"
        description="Cifrado de extremo a extremo para la máxima privacidad y secreto en sus comunicaciones."
        features={[
          "Videoconferencias seguras",
          "Llamadas seguras",
          "Mensajería segura",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/vnc-lagoon/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      
      <ProductSectionMobile
        title="VNC Lagoon"
        description="Cifrado de extremo a extremo para la máxima privacidad y secreto en sus comunicaciones."
        features={[
          "Videoconferencias seguras",
          "Llamadas seguras",
          "Mensajería segura",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/vnc-lagoon/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
     
      <ProductSectionTablet
        title="VNC Lagoon"
        description="Cifrado de extremo a extremo para la máxima privacidad y secreto en sus comunicaciones."
        features={[
          "Videoconferencias seguras",
          "Llamadas seguras",
          "Mensajería segura",
        ]}
        price="180$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/vnc-lagoon/banner.png"
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
        title="Aplicación de comunicación en tiempo real"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile 
        title="Aplicación de comunicación en tiempo real"
        benefits={benefits}
        />
      <ProductBenefitsGridTablet 
        title="Aplicación de comunicación en tiempo real"
        benefits={benefits}
        />
      <HeroVideoSection
        title={`Cuál es el sistema ideal para ti? Quieres seguir usando tu celular personal?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Cuál es el sistema ideal para ti? Quieres seguir usando tu celular personal?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Cuál es el sistema ideal para ti? Quieres seguir usando tu celular personal?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy("508"), 
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo("508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo("454"), 
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy("508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo("508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo("454"),
          image: "/images/apps/armadillo-v2/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => handleSimBuy("508"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => handleMoreInfo("508"),
          image: "/images/apps/armadillo-v2/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => handleMoreInfo("454"),
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
