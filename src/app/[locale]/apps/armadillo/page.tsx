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
    iconUrl: "/images/apps/armadillo-v2/logo.png", 
    ctaLabel: "Comprar ahora",
    categoryId: 38,
    productId: 177,
    onBuy: () => {
      openModal({
        productid: "177",          
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
      image: "/images/apps/armadillo-v2/celular1.png",
      title: "Chats Encriptados",
      description:
        "Armadillo Chat utiliza cifrado de extremo a extremo, por lo que tus mensajes son ilegibles incluso si el servidor está comprometido.",
    },
    {
      image: "/images/apps/armadillo-v2/celular2.png",
      title: "Borrado Remoto y Automatizado",
      description:
        "Configure automáticamente temporizadores de autodestrucción, borre de forma remota mensajes individuales o conversaciones completas.",
    },
    {
      image: "/images/apps/armadillo-v2/celular3.png",
      title: "Comunicaciones Cifradas",
      description:
        "Puede comunicarse con mensajes de texto, imágenes, archivos, chats grupales o videollamadas de forma segura.",
    },
    {
      image: "/images/apps/armadillo-v2/celular4.png",
      title: "Verifica la identidad de tus contactos",
      description:
        "Puede utilizar varios métodos para verificar las identidades de sus amigos: escanear un código QR, hacer una pregunta, verificación de Wi-Fi o verificación de texto.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Acceso sencillo a la cuenta",
      description:
        "Active o renueve su cuenta de Armadillo Chat para asegurarse de tener el software, las comunicaciones y el soporte más seguros.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Soporte 24/7",
      description:
        "También puede hablar directamente con nuestros expertos en seguridad móvil a través de Armadillo Chat sobre sus preocupaciones de seguridad.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Interfaz sencilla",
      description:
        "Armadillo Chat no solo es una aplicación completamente segura, también es muy fácil de usar.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Privacidad y seguridad",
      description:
        "Armadillo Chat es una aplicación de mensajería instantánea de alta seguridad. Con actualizaciones constantes nos aseguramos que todas tus comunicaciones sean privadas.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Alertas sobre posibles impostores",
      description:
        "Armadillo Chat le advierte automáticamente sobre posibles impostores en su lista de contactos y otros dispositivos conectados a su cuenta.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Notificaciones Push",
      description:
        "Armadillo Chat no solo es una aplicación completamente segura, también es muy fácil de usar.",
    },
  ];
  const Faqs =[
    {
      question: "¿Cómo funciona Armadillo Chat?",
      answer: "Armadillo Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿En qué celular puedo instalar Armadillo Chat?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Por qué usar Armadillo Chat?",
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
        imageUrl="/images/apps/armadillo-v2/armadillo_app.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/armadillo/bannermobile.png" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/armadillo-v2/bannertablet.png" 
        alt="Armadillo Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Armadillo"
        description="Aplicación de mensajería instantánea de alta seguridad que respeta tu privacidad"
        features={[
          "Borrado remoto y automatizado",
          "Alertas de posibles impostores",
          "Llamadas encriptadas",
        ]}
        price="99$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/armadillo-v2/productImage.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionMobile
        title="Armadillo"
        description="Aplicación de mensajería instantánea de alta seguridad que respeta tu privacidad"
        features={[
          "Borrado remoto y automatizado",
          "Alertas de posibles impostores",
          "Llamadas encriptadas",
        ]}
        price="99$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/armadillo-v2/productImage.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionTablet
        title="Armadillo"
        description="Aplicación de mensajería instantánea de alta seguridad que respeta tu privacidad"
        features={[
          "Borrado remoto y automatizado",
          "Alertas de posibles impostores",
          "Llamadas encriptadas",
        ]}
        price="99$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/armadillo-v2/productImage.png"
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
        title="Asegura tus comunicaciones"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/>
      <HeroVideoSection
        title={`Armadillo Chat.\nAplicación de mensajería instantánea de alta seguridad`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Armadillo Chat.\nAplicación de mensajería instantánea de alta seguridad`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Armadillo Chat.\nAplicación de mensajería instantánea de alta seguridad`}
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
