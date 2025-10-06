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
import { useEffect, useState } from "react";
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
  const featuresGrid = [
    {
      image: "/images/apps/nord-vpn/nordVPN.png",
      title: "¿Por qué NordVPN?",
      description:
        "Gracias a todo tipo de tecnologías de vanguardia, NordVPN mantiene tus dispositivos libres de malware y tu navegación a salvo.",
    },
    {
      image: "/images/apps/nord-vpn/navega.png",
      title: "Navega sin interrupciones",
      description:
        "Sabemos que tienes correos electrónicos que enviar, juegos que ganar y vídeos que ver, así que NordVPN te garantizará las mejores velocidades de conexión.",
    },
    {
      image: "/images/apps/nord-vpn/controla.png",
      title: "Controla tus datos privados",
      description:
        "Con NordVPN, puedes navegar como si nadie te estuviera viendo, porque nadie lo hace. No rastreamos lo que haces online.",
    },
    {
      image: "/images/apps/nord-vpn/dispositivos.png",
      title: "Multi dispositivos",
      description:
        "Conecta hasta 10 dispositivos y disfruta de un acceso seguro y privado a internet, incluso en una Wifi pública.",
    },
  ];
  const benefits = [
    {
      icon: "/images/apps/nord-vpn/icono.png",
      title: "Autenticación de terceros",
      description:
        "Conéctate a NordVPN Teams con tus credenciales empresariales. Nuestra VPN para pequeñas y grandes empresas integra autenticación segura con Azure AD, Google y Okta, garantizando acceso confiable y protección de datos corporativos.",
    },
    {
      icon: "/images/apps/nord-vpn/icono.png",
      title: "Navega protegido",
      description:
        "Solo se necesita un clic para cifrar todo el tráfico de datos en su dispositivo. Haga clic en cualquier puerta de enlace para conectarse o habilitar la función de conexión automática.",
    },
    {
      icon: "/images/apps/nord-vpn/icono.png",
      title: "Interruptor de muerte",
      description:
        "Evita exponer tus datos con Kill Switch: si la conexión VPN se cae, bloquea automáticamente todo el tráfico de Internet en tu dispositivo, protegiendo tu información incluso ante interrupciones de solo un segundo.",
    },
    {
      icon: "/images/apps/nord-vpn/icono.png",
      title: "Acceso remoto",
      description:
        "Acceda cómodamente a los recursos de la empresa sobre la marcha. Ya sea que esté trabajando desde casa, en un espacio de trabajo compartido o en una conferencia, una VPN le permite acceder a todos los datos comerciales de forma segura.",
    },
    {
      icon: "/images/apps/nord-vpn/icono.png",
      title: "Accede a más de 33 países",
      description:
        "Conéctate a miles de servidores compartidos en 33 países de todo el mundo. Elige entre más de 20 ubicaciones de servidores dedicados. Gracias a nuestra infraestructura global.",
    },
    {
      icon: "/images/apps/nord-vpn/icono.png",
      title: "Conexiones Encriptadas",
      description:
        "Las comunicaciones entrantes y salientes se cifran de extremo a extremo y se transmiten a través de una red cifrada. Todos los datos almacenados en el dispositivo están protegidos y encriptados.",
    },
  ];
  const Faqs =[
    {
      question: "NordVPN una de las mejores opciones del mercado",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Por qué es importante tener una VPN?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Cómo funciona NordVPN?",
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
        imageUrl="/images/apps/nord-vpn/hero-desktop.png"
        alt="Nord VPN Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/nord-vpn/hero-mobile.jpg" 
        alt="Nord VPN Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/nord-vpn/hero-tablet.png" 
        alt="Nord VPN Hero Banner" />
      <ProductSection
        title="Nord VPN"
        description="Navega seguro, rápido y protegido con NordVPN. Conecta hasta 10 dispositivos y accede a todo lo que quieras en la web."
        features={[
          "Conexión segura",
          "Interruptor de muerte",
          "Pasarelas privadas",
        ]}
        price="130$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/nord-vpn/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionMobile
        title="Nord VPN"
        description="Navega seguro, rápido y protegido con NordVPN. Conecta hasta 10 dispositivos y accede a todo lo que quieras en la web."
        features={[
          "Conexión segura",
          "Interruptor de muerte",
          "Pasarelas privadas",
        ]}
        price="130$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/nord-vpn/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionTablet
        title="Nord VPN"
        description="Navega seguro, rápido y protegido con NordVPN. Conecta hasta 10 dispositivos y accede a todo lo que quieras en la web."
        features={[
          "Conexión segura",
          "Interruptor de muerte",
          "Pasarelas privadas",
        ]}
        price="130$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/nord-vpn/banner.png"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <ProductBenefitsGrid benefits={benefits} />
      <ProductBenefitsGridMobile benefits={benefits}/>
      <ProductBenefitsGridTablet benefits={benefits}/>
      <HeroVideoSection
        title={`NordVPN una de las mejores opciones del mercado`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`NordVPN una de las mejores opciones del mercado`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`NordVPN una de las mejores opciones del mercado`}
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
          image: "/images/apps/nord-vpn/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/nord-vpn/phone.png",
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
          image: "/images/apps/nord-vpn/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/nord-vpn/phone.png",
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
          image: "/images/apps/nord-vpn/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/nord-vpn/phone.png",
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
