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
  iconUrl: "/images/apps/vault-chat/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 38,
  productId: 127,
  onBuy: () => {
    openModal({
      productid: "127",          
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
        imageUrl="/images/apps/vault-chat/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/vault-chat/hero-mobile.png" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/vault-chat/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <div ref={priceBlockRef}>
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
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
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
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
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
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/vault-chat/banner.png"
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
