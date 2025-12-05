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
  iconUrl: "/images/apps/salt/logo.png", 
  ctaLabel: "Comprar ahora",
  categoryId: 38,
  productId: 133,
  onBuy: () => {
      openModal({
        productid: "133",          
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
      image: "/images/apps/salt/chat.png",
      title: "Chat cifrado",
      description:
        "Nuestra solución a medida ofrece a los usuarios mensajería privada y segura en tiempo real y funcionalidad de chat grupal a sus contactos de Salt.",
    },
    {
      image: "/images/apps/salt/destructing-messages.png",
      title: "Mensajes Autodestructivos",
      description:
        "Control total de tu privacidad: borra la información de todos los dispositivos en un clic o programa su eliminación automática con la función de autodestrucción.",
    },
    {
      image: "/images/apps/salt/message-diffusion.png",
      title: "Llamadas Seguras",
      description:
        "Brindamos conferencias y llamadas individuales seguras, además de llamadas VoIP encriptadas en cualquier parte del mundo.",
    },
    {
      image: "/images/apps/salt/screenshot-protection.png",
      title: "Protección de Capturas",
      description:
        "Protege tu información: los administradores pueden impedir capturas de pantalla o notificar a los usuarios cuando se realicen, garantizando un entorno más seguro.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/salt/icono.png",
      title: "Habilitación del trabajo remoto seguro",
      description:
        "Muchas organizaciones de alto perfil en todo el mundo han implementado Salt para garantizar el más alto nivel de seguridad en las comunicaciones mientras trabajan de forma remota.",
    },
    {
      icon: "/images/apps/salt/icono.png",
      title: "Cifrado agnóstico",
      description:
        "Salt utiliza los últimos y mejores protocolos de encriptación para garantizar que ofrecemos a los clientes el más alto nivel de encriptación dentro de nuestra plataforma.",
    },
    {
      icon: "/images/apps/salt/icono.png",
      title: "Transparencia de las pruebas de seguridad",
      description:
        "Salt es una tecnología abierta y confiable que es verificada de manera rigurosa y rutinaria por partes independientes.",
    },
    {
      icon: "/images/apps/salt/icono.png",
      title: "Llamadas de voz seguras",
      description:
        "Ofrecemos conferencias y llamadas individuales seguras entre hasta 16 participantes a la vez, así como llamadas VoIP seguras y encriptadas en cualquier región del mundo.",
    },
    {
      icon: "/images/apps/salt/icono.png",
      title: "Mensajería segura",
      description:
        "Nuestra solución a medida ofrece a los usuarios mensajería privada y segura en tiempo real y funcionalidad de chat grupal a sus contactos de Salt.",
    },
    {
      icon: "/images/apps/salt/icono.png",
      title: "Mensajes autodestructivos",
      description:
        "Nuestra funcionalidad de autodestrucción permite a los usuarios borrar información de su dispositivo y de todos los destinatarios.",
    },
  ];
  const Faqs =[
    {
      question: "¿Cómo funciona Salt?",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Qué tan segura es la aplicación Salt?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Por qué mi empresa debería tener una aplicación como Salt?",
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
        imageUrl="/images/apps/salt/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/salt/hero-mobile.jpg" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/salt/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Salt"
        description="Mantén seguras tus comunicaciones más sensibles con el mejor blindaje "
        features={[
          "Mensajería segura",
          "Protección de captura de pantalla",
          "Llamadas de voz seguras",
        ]}
        price="90$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/salt/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
     
      <ProductSectionMobile
        title="Salt"
        description="Mantén seguras tus comunicaciones más sensibles con el mejor blindaje "
        features={[
          "Mensajería segura",
          "Protección de captura de pantalla",
          "Llamadas de voz seguras",
        ]}
        price="90$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/salt/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      
      <ProductSectionTablet
        title="Salt"
        description="Mantén seguras tus comunicaciones más sensibles con el mejor blindaje "
        features={[
          "Mensajería segura",
          "Protección de captura de pantalla",
          "Llamadas de voz seguras",
        ]}
        price="90$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/salt/banner.png"
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
        title="Mantén seguras tus comunicaciones más sensibles"
        benefits={benefits}
      />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/>
      <HeroVideoSection
        title={`Diferencias entre una Aplicación Encriptada y Whatsapp`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Diferencias entre una Aplicación Encriptada y Whatsapp`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Diferencias entre una Aplicación Encriptada y Whatsapp`}
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
