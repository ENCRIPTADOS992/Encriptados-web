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
  iconUrl: "/images/apps/silent-circle/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 35,
  productId: 151,
  onBuy: () => {
      openModal({
        productid: "151",          
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
      image: "/images/apps/renati/chat-enmascarado.png",
      title: "Chats Cifrados",
      description:
        "Envía textos, imágenes, notas de voz y videos de manera segura y encriptada. Los mensajes no pueden ser reenviados, guardados ni marcados.",
    },
    {
      image: "/images/apps/renati/chat-cifrado.png",
      title: "Chat Grupal",
      description:
        "Los grupos anónimos ocultan la información de contacto y permiten fijar un tiempo para que toda la información se borre de forma automática.",
    },
    {
      image: "/images/apps/renati/chat-cifrados.png",
      title: "Llamadas Seguras",
      description:
        "Permite realizar llamadas de voz y mensajes de voz encriptados, además de incluir un cambiador de voz con un algoritmo seguro",
    },
    {
      image: "/images/apps/renati/mensajeria.png",
      title: "Mensajes Autodestructivos",
      description:
        "Temporizador que elimina automáticamente los chats en ambos dispositivos después de un tiempo establecido.",
    },
  ];
  const Faqs =[
    {
      question: "¿Qué es un Os?",
      answer:
        "Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.",
    },
    {
      question: "¿Por qué instalar Renati en mi teléfono?",
      answer:
        "Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.",
    },
    {
      question: "¿Cómo se instala Renati en mi celular?",
      answer:
        "OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa, lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.",
    },
  ];
   const securityFeaturesData = [
    {
      title: "Desactivación de Ubicación",
      description:
        "Hemos tomado medidas excepcionales para desactivar los servicios de ubicación en todos los niveles del sistema operativo.",
    },
    {
      title: "Seguridad de Datos",
      description:
        "La personalización de dispositivos y mejoras en la infraestructura garantizan la protección de sus datos ante herramientas forenses y vulnerabilidades remotas como Pegasus.",
    },
    {
      title: "Cifrado",
      description:
        "Para cada función utilizamos el cifrado más alto. Estos no se pueden descifrar sin sus claves y contraseñas. Tú controlas tu privacidad.",
    },
    {
      title: "Fortalecimiento del Dispositivo",
      description:
        "Renati refuerza todos los aspectos del dispositivo, incluso la arquitectura fundamental contra ataques digitales y de hardware.",
    },
    {
      title: "Bloc de notas",
      description:
        "Tendrás un Bloc de notas encriptado y no será posible tomar capturas de pantalla",
    },
    {
      title: "Lanzamiento y actualizaciones",
      description:
        "Actualizamos y mejoramos nuestros productos, seguimos lanzando nuevas actualizaciones con regularidad.",
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
        imageUrl="/images/apps/renati/hero-desktop.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/renati/hero-mobile.png" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/renati/hero-tablet.png" 
        alt="Armadillo Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Renati"
        description="Protégete con un sistema operativo móvil seguro y creado para comunicaciones encriptadas."
        features={[
          "Sin servicios de geolocalización. Bluetooth o NFC",
          "Bloc de notas encriptado",
          "Conversaciones encriptadas",
        ]}
        price="650$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/renati/banner.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionMobile
        title="Renati"
        description="Protégete con un sistema operativo móvil seguro y creado para comunicaciones encriptadas."
        features={[
          "Mensajes cifrados con imágenes y voz",
          "Interfaz unificada",
          "Chats grupales cifrados",
        ]}
        price="650$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/renati/banner.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionTablet
        title="Renati"
        description="Protégete con un sistema operativo móvil seguro y creado para comunicaciones encriptadas."
        features={[
          "Mensajes cifrados con imágenes y voz",
          "Interfaz unificada",
          "Chats grupales cifrados",
        ]}
        price="650$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/renati/banner.png"
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
        title="La tecnología de Renati es tu aliado sin obstáculos"
        features={securityFeaturesData}
        imageUrl="/images/apps/renati/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="La tecnología de Renati es tu aliado sin obstáculos"
        features={securityFeaturesData}
        imageUrl="/images/apps/renati/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="La tecnología de Renati es tu aliado sin obstáculos"
        features={securityFeaturesData}
        imageUrl="/images/apps/renati/phoneSecurity.png"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      {/* <ProductBenefitsGrid benefits={benefits} />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/> */}
      <HeroVideoSection
        title={`Blinda tu celular, evita hackeos y protege tus comunicaciones`}
        videoUrl="https://www.youtube.com/embed/gz1S-SEVqoI"
      />
      <HeroVideoSectionMobile
        title={`Blinda tu celular, evita hackeos y protege tus comunicaciones`}
        videoUrl="https://www.youtube.com/embed/gz1S-SEVqoI"
      />
      <HeroVideoSectionTablet
        title={`Blinda tu celular, evita hackeos y protege tus comunicaciones`}
        videoUrl="https://www.youtube.com/embed/gz1S-SEVqoI"
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
