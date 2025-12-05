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
  productId: 139,
  onBuy: () => {
      openModal({
        productid: "139",          
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
      image: "/images/apps/cryptcom/chat.png",
      title: "Chat Cifrado",
      description:
        "Envía texto, imágenes, notas de voz y videos de forma segura y encriptada.",
    },
    {
      image: "/images/apps/cryptcom/chat-cifrado.png",
      title: "Chat grupal",
      description:
        "Con la opción de grupos anónimos de conocimiento cero, los usuarios no podrán ver ni recuperar la información de contacto de los miembros del grupo.",
    },
    {
      image: "/images/apps/cryptcom/mensajeria.png",
      title: "Llamadas Cifradas",
      description:
        "Mantén tus llamadas de voz y mensajería seguras y cifradas con un cambiador de voz que utiliza un algoritmo de alta protección.",
    },
    {
      image: "/images/apps/cryptcom/chat-enmascarado.png",
      title: "Encubrimiento",
      description:
        "Adapta la interfaz de usuario de tu aplicación para que parezca una aplicación popular como WhatsApp, ofreciendo así una mayor privacidad y discreción.",
    },
  ];
  const Faqs =[
     {
      question: "¿Cómo se hace la encriptación de un celular Cryptcom?",
      answer:
        "Al encriptar el celular con una licencia Cryptcom, se reemplaza el sistema operativo original por uno encriptado de grado militar, con características especiales como chats cifrados, llamadas seguras, destrucción remota, entre otras que puedes conocer en encriptados.io.",
    },
    {
      question:
        "¿Qué funcionalidades voy a tener al encriptar mi celular con Cryptcom?",
      answer:
        "Además de la seguridad y privacidad que ofrece el celular encriptado Cryptcom, tendrás funcionalidades como chats cifrados, borrado remoto, mail cifrado, mensajes temporizados, baúl en la nube y múltiples aplicaciones cifradas.",
    },
    {
      question:
        "¿Cómo funciona el borrado remoto en un celular encriptado como Cryptcom?",
      answer:
        "En caso de perder el teléfono o ser víctima de robo, se podrá enviar una combinación predeterminada de caracteres al propio chat de tu celular Cryptcom para eliminar toda la información. En otros casos, se podrá hacer contactando al proveedor de la licencia.",
    },
  ];
   const securityFeaturesData = [
    {
      title: "Integración de aplicaciones seguras",
      description:
        "Ofrece a los usuarios la posibilidad de incorporar aplicaciones como Signal, Threema y Silent Circle en el entorno seguro del dispositivo, garantizando una comunicación privada y confiable.",
    },
    {
      title: "Función de Limpieza Segura",
      description:
        "El dispositivo se borra automáticamente si se detectan acciones como la extracción de la SIM, la conexión de un cable USB o varios intentos fallidos de contraseña.",
    },
    {
      title: "Vault Encriptado:",
      description:
        "Incorpora un vault encriptado integral donde puedes guardar de forma segura documentos, imágenes, videos, notas de voz y más.",
    },
    {
      title: "Cifrado de alto nivel ECC, OMEMO, AES-256, XMPP",
      description:
        "Equivalente a más de 15 360 bits RSA.",
    },
    {
      title: "Sin ubicaciones fijas de servidores",
      description:
        "Los servidores se destruyen cada 24 horas después de la transferencia a uno sin dejar rastro.",
    },
    {
      title: "Protección ante coacción o manipulación:",
      description:
        "Función de borrado inmediato y alerta de coacción activable con combinación de PIN especial.",
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
        imageUrl="/images/apps/cryptcom/cryptcom-banner-desktop.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/cryptcom/cryptcom-banner-mobile.png" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/cryptcom/bannerIpad.png" 
        alt="Armadillo Hero Banner" />
      <div ref={priceBlockRef}>
      <ProductSection
        title="Cryptcom"
        description="Convierte tu teléfono inteligente en un dispositivo de comunicaciones altamente seguro."
        features={[
          "Cifrado alto nivel",
          "Vault cifrado en nube",
          "Encubrimiento de aplicaciones",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/cryptcom/phone-cryptcom-app.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionMobile
        title="Cryptcom"
        description="Convierte tu teléfono inteligente en un dispositivo de comunicaciones altamente seguro."
        features={[
          "Cifrado alto nivel",
          "Vault cifrado en nube",
          "Encubrimiento de aplicaciones",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/cryptcom/phone-cryptcom-app.png"
        appStoreUrl="https://apps.apple.com/app/chatmail-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.chatmail"
      />
      <ProductSectionTablet
        title="Cryptcom"
        description="Convierte tu teléfono inteligente en un dispositivo de comunicaciones altamente seguro."
        features={[
          "Cifrado alto nivel",
          "Vault cifrado en nube",
          "Encubrimiento de aplicaciones",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={productInfo.onBuy}
        onChat={productInfo.onChat}
        productImage="/images/apps/cryptcom/phone-cryptcom-app.png"
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
        title="Red Segura descentralizada Compatible con Pixel - Samsung"
        features={securityFeaturesData}
        imageUrl="/images/apps/cryptcom/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Red Segura descentralizada Compatible con Pixel - Samsung"
        features={securityFeaturesData}
        imageUrl="/images/apps/cryptcom/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="Red Segura descentralizada Compatible con Pixel - Samsung"
        features={securityFeaturesData}
        imageUrl="/images/apps/cryptcom/phoneSecurity.png"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <HeroVideoSection
        title={`Cryptcom El Sistema operativo que volverá inhackeable tu celular`}
        videoUrl="https://www.youtube.com/embed/BkT7D_akpyU"
      />
      <HeroVideoSectionMobile
        title={`Cryptcom El Sistema operativo que volverá inhackeable tu celular`}
        videoUrl="https://www.youtube.com/embed/BkT7D_akpyU"
      />
      <HeroVideoSectionTablet
        title={`Cryptcom El Sistema operativo que volverá inhackeable tu celular`}
        videoUrl="https://www.youtube.com/embed/BkT7D_akpyU"
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
