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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";

const Page = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const productId = searchParams.get("productId");
  const selected = plan || plans[0].value;
  const [product, setProduct] = useState<ProductById | null>(null);
  const featuresGrid = [
    {
      image: "/images/apps/dec-secure/vpn-active.png",
      title: "VPN Siempre Activa",
      description:
        "Secure Call no funcionará si no se puede establecer una conexión VPN segura, lo que garantiza que tus comunicaciones nunca se envíen expuestas.",
    },
    {
      image: "/images/apps/dec-secure/call.png",
      title: "Contenedor Dedicado",
      description:
        "La app se instala en un contenedor seguro para evitar espionaje. Los contactos quedan inaccesibles fuera de la app, protegiendo la privacidad.",
    },
    {
      image: "/images/apps/dec-secure/secure-call.png",
      title: "DEC Secure Call",
      description:
        "Cifrado AES-256 siempre activo para voz, video y mensajes. Comunicaciones 100% privadas: sin acceso a tus datos y sin almacenamiento en servidores.",
    },
    {
      image: "/images/apps/dec-secure/call.png",
      title: "Conferencia y llamadas grupales",
      description:
        "Llamadas de voz y video encriptadas, con hasta 10 participantes, te permiten centralizar todas tus comunicaciones seguras en una sola plataforma.",
    },
  ];

  const Faqs =[
    {
          "question": "¿Qué archivos puedo proteger con la Aplicación dec-secure?",
          "answer": "Puedes proteger mensajes, archivos, contactos y llamadas de voz. Toda tu información viaja cifrada de extremo a extremo."
        },
        {
          "question": "¿Por qué debería usar la aplicación dec-secure en mi empresa?",
          "answer": "Porque ofrece máxima seguridad, protección contra intrusiones y cifrado total, evitando fugas de información corporativa."
        },
        {
          "question": "¿Por qué debería usar una aplicación cifrada como dec-secure en vez de una convencional?",
          "answer": "Las apps convencionales no ofrecen protección real ante espionaje, dec-secure garantiza privacidad y confidencialidad absoluta."
        }
  ];
  const securityFeaturesData = [
    {
      title: "Hardware – Dispositivos móviles confiables",
      description:
        "Dispositivos móviles encriptados diseñados, ensamblados y probados para garantizar su integridad. Óptimo funcionamiento con el sistema operativo.",
    },
    {
      title: "Sistema operativo Seguro",
      description:
        "Sistema operativo con tecnología de ciberseguridad indescifrable, parches de seguridad, actualizadas contra las amenazas emergentes e interfaz de usuario intuitiva. Cifrado de disco completo.",
    },
    {
      title: "Múltiples capas de seguridad de grado militar",
      description:
        "Desarrollamos continuamente capas adicionales de seguridad, haciendo el robo de información prácticamente imposible.",
    },
    {
      title: "Seguridad de la red",
      description:
        "Un sofisticado programa de seguridad de red y detección y respuesta de amenazas frustra los esfuerzos de los ciberatacantes.",
    },
    {
      title: "Control de cortafuegos",
      description:
        "Evita todas las conexiones no autenticadas y no cifradas, eliminando la posibilidad de una exposición inapropiada.",
    },
    {
      title: "VPN sin clic",
      description:
        "Se conecta automáticamente con la autenticación automatizada, sin permitirte enviar o recibir datos sin protección.",
    },
  ];
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/dec-secure/hero-desktop.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile imageUrl="/images/apps/dec-secure/hero-mobile.jpg" 
        alt="Armadillo Hero Banner" />
      <HeroBannerTablet imageUrl="/images/apps/dec-secure/banner_ipad.png" 
        alt="Armadillo Hero Banner" />
      <ProductSection
        title="DEC Secure"
        description="DEC Secure ofrece total tranquilidad cuando se trata de la privacidad y seguridad de la información en tu dispositivo móvil."
        features={[
          "VPN sin clic",
          "Bloqueo y borrado remoto",
          "Mensajes y llamadas cifradas",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/dec-secure/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/dec-secure-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.dec-secure"
      />
      <ProductSectionMobile
        title="DEC Secure"
        description="DEC Secure ofrece total tranquilidad cuando se trata de la privacidad y seguridad de la información en tu dispositivo móvil."
        features={[
          "VPN sin clic",
          "Bloqueo y borrado remoto",
          "Mensajes y llamadas cifradas",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/dec-secure/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/dec-secure-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.dec-secure"
      />
      <ProductSectionTablet
        title="DEC Secure"
        description="DEC Secure ofrece total tranquilidad cuando se trata de la privacidad y seguridad de la información en tu dispositivo móvil."
        features={[
          "VPN sin clic",
          "Bloqueo y borrado remoto",
          "Mensajes y llamadas cifradas",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/dec-secure/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/dec-secure-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.dec-secure"
      />

      <SecurityFeatures
        title="Te mantenemos conectado de forma segura y privada"
        features={securityFeaturesData}
        imageUrl="/images/apps/dec-secure/phone.png"
      />
      <SecurityFeaturesTablet
        title="Te mantenemos conectado de forma segura y privada"
        features={securityFeaturesData}
        imageUrl="/images/apps/dec-secure/phone.png"
      />
      <SecurityFeaturesMobile
        title="Te mantenemos conectado de forma segura y privada"
        features={securityFeaturesData}
        imageUrl="/images/apps/dec-secure/phone.png"
      />
      <ProductFeaturesGrid features={featuresGrid} />
      <ProductFeaturesGridMobile features={featuresGrid} /> 
      <ProductFeaturesGridTablet features={featuresGrid}/>
      <HeroVideoSection
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />
      <HeroVideoSectionMobile
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />
      <HeroVideoSectionTablet
        title={`Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023`}
        videoUrl="https://www.youtube.com/embed/Og3xt5izfSU"
      />

      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description: "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
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
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/armadillo-v2/phone.png",
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
          image: "/images/apps/armadillo-v2/sim.png", 
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
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
