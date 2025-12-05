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
  productId: 188,
  onBuy: () => {
      openModal({
        productid: "188",          
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
      image: "/images/apps/intact-phone/vpn-active.png",
      title: "VPN Siempre Activa",
      description:
        "Secure Call no funcionará si no se puede establecer una conexión VPN segura, lo que garantiza que tus comunicaciones nunca se envíen expuestas.",
    },
    {
      image: "/images/apps/intact-phone/call.png",
      title: "Contenedor Dedicado",
      description:
        "Se requiere la instalación de Secure Call dentro de un contenedor dedicado, protegiendo los datos y el uso de la aplicación contra el espionaje inapropiado. La lista de contactos de Secure Call dedicada es inaccesible desde fuera de la aplicación, lo que mantiene tus contactos de Secure Call privados y discretos.",
    },
    {
      image: "/images/apps/intact-phone/secure-call.png",
      title: "INTACT PHONE Call",
      description:
        "INTACT PHONE Call te ofrece todo lo que esperas en una aplicación de comunicaciones seguras, incluido el cifrado AES-256 siempre activo; llamadas de voz individuales y grupales, videollamadas y mensajería Sus comunicaciones son 100% privadas, no podemos escuchar tus llamadas ni leer tus mensajes bajo ninguna circunstancia, y no se almacena nada en nuestros servidores.",
    },
    {
      image: "/images/apps/intact-phone/call.png",
      title: "Conferencia y llamadas grupales",
      description:
        "Las llamadas de video y de voz múltiple totalmente encriptadas de hasta 10 participantes te permiten utilizar una única plataforma para todas tus comunicaciones seguras.",
    },
  ];
  const Faqs = [
    {
      question: "¿Qué es y para qué sirve el celular IntactPhone?",
      answer:
        "Intactphone es un celular cifrado de grado militar con un hardware y software fuertes. No solo protege el dispositivo de ataques cibernéticos o brechas de seguridad sino contra situaciones ambientales como agua, caídas o golpes.",
    },
    {
      question: "¿IntactPhone, cuál es el precio?",
      answer:
        "El precio del celular Intactphone varía de acuerdo a su modelo y licencia. Se puede adquirir en Encriptados.io desde un valor aproximado de $1000 USD.",
    },
    {
      question: "¿IntactPhone, quién lo fabrica?",
      answer:
        "CommuniTake, la casa madre de Intact, manufactura completamente el dispositivo. Desde el hardware hasta el sistema operativo. Esto buscando prevenir la sustitución de código por parte de malintencionados y las brechas de información. Conócelo.",
    },
  ];
  const securityFeaturesData = [
    {
      title: "Seguridad",
      description: "Elimina la totalidad de brechas de seguridad.",
    },
    {
      title: "Control",
      description:
        "Los controles facilitan el manejo de la inteligencia central y de la seguridad avanzada.",
    },
    {
      title: "Ciberataques",
      description: "Minimiza los ciberataques.",
    },
    {
      title: "Alertas",
      description: "Previene ataques por medio de detección de alertas.",
    },
    {
      title: "Hardware Confiable",
      description:
        "Funciona solamente con hardware confiable y drivers oficiales, asegurando seguridad en todo momento.",
    },
    {
      title: "Conexión Estable",
      description:
        "Asegura una conexión estable en todo momento en los dispositivos que estén operacionales.",
    },
    {
      title: "Control Remoto",
      description: "IntactPhone garantiza el funcionamiento óptimo de tu dispositivo con una aplicación segura que resuelve problemas de forma autónoma y ofrece control remoto.",
    },
    {
      title: "Hardware Seguro",
      description:
        "Este teléfono inteligente de alta gama está desarrollado desde cero con drivers oficiales para ofrecer una mayor protección contra el cibercrimen móvil.",
    },
    {
      title: "Datos Cifrados",
      description:
        "El cifrado de disco de IntactPhone permite que solo el propietario acceda a los datos mediante una contraseña o PIN exclusivo.",
    }
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
        imageUrl="/images/apps/intact-phone/hero-desktop.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile
        imageUrl="/images/apps/intact-phone/hero-mobile.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerTablet
        imageUrl="/images/apps/intact-phone/banner_ipad.png"
        alt="Armadillo Hero Banner"
      />
      <div ref={priceBlockRef}>
      <ProductSection
        title="INTACT PHONE"
        description="Seguridad completa desde el hardware hasta el sistema operativo para comunicaciones seguras."
        features={[
          "Llamadas de voz seguras",
          "Mensajería encriptada",
          "Envío de archivos adjuntos protegidos",
        ]}
        price="150$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/intact-phone/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/intact-phone-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.intact-phone"
      />
     
      <ProductSectionMobile
        title="INTACT PHONE"
        description="Seguridad completa desde el hardware hasta el sistema operativo para comunicaciones seguras."
        features={[
          "Llamadas de voz seguras",
          "Mensajería encriptada",
          "Envío de archivos adjuntos protegidos",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/intact-phone/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/intact-phone-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.intact-phone"
      />
      
      <ProductSectionTablet
        title="INTACT PHONE"
        description="Seguridad completa desde el hardware hasta el sistema operativo para comunicaciones seguras."
        features={[
          "Llamadas de voz seguras",
          "Mensajería encriptada",
          "Envío de archivos adjuntos protegidos",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/intact-phone/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/intact-phone-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.intact-phone"
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
        title="IntactPhone construye todo el hardware y software"
        features={securityFeaturesData}
        imageUrl="/images/apps/intact-phone/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="IntactPhone construye todo el hardware y software"
        features={securityFeaturesData}
        imageUrl="/images/apps/intact-phone/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="IntactPhone construye todo el hardware y software"
        features={securityFeaturesData}
        imageUrl="/images/apps/intact-phone/phoneSecurity.png"
      />

      <HeroVideoSection
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2025`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />
      <HeroVideoSectionMobile
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2025`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />
      <HeroVideoSectionTablet
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2025`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
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
      <FAQSection faqs={Faqs} />
      <FAQSectionMobile faqs={Faqs} />
      <FAQSectionTablet faqs={Faqs} />
      <DownloadAppSection />
      <DownloadAppSectionMobile />
      <DownloadAppSectionTablet />
    </div>
  );
};

export default Page;
