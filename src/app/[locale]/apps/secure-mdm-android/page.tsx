"use client";

import HeroBanner from "../component/templateSoftware/HeroBanner";
import HeroBannerMobile from "../component/templateSoftware/HeroBannerMobile";
import HeroBannerTablet from "../component/templateSoftware/HeroBannerTablet";
import ProductSection from "../component/templateSoftware/ProductSection";
import ProductSectionMobile from "../component/templateSoftware/ProductSectionMobile";
import ProductSectionTablet from "../component/templateSoftware/ProductSectionTablet";
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
      title: "Bloqueo de Redes",
      description:
        "Protege tu información de posibles intentos de extracción a través de USB y conexiones inalámbricas.",
    },
    {
      title: "Seguridad del dispositivos",
      description:
        "Incrementa la seguridad del dispositivo usando nuestra Sim Card Encriptados",
    },
    {
      title: "Borrado de emergencia",
      description:
        "Puede solicitar un borrado remoto de toda la informacion en el dispositivo.",
    },
    {
      title: "Seguridad en tu Dispositivo",
      description:
        "Protege tu información y aplicaciones de intrusos usando herramientas de chat, correo y billeteras criptográficas cifradas.",
    },
    {
      title: "Sistema restringido y privado",
      description:
        "Restringimos el uso e instalación de aplicaciones o softwares que puedan comprometer la seguridad del dispositivo.",
    },
    {
      title: "Fortalecimiento de Políticas TI",
      description:
        "Ajusta las políticas del dispositivo para eliminar accesos que pongan en riesgo la seguridad.",
    },
    {
      title: "Contenedor Seguro",
      description:
        "Un contenedor que previene fugas de información o el ingreso de malware al dispositivo.",
    },
    {
      title: "Fácil Configuración",
      description:
        "Configura tu MDM en menos de 5 minutos.",
    },
    {
      title: "Privacidad",
      description:
        "No utilices una cuenta personal para autenticarte en Google.",
    }
  ];
  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/secure-mdm-android/secure-banner-desktop.png"
        alt="Secure MDM Android Hero Banner"
      />
      <HeroBannerMobile
        imageUrl="/images/apps/secure-mdm-android/secure-banner-mobile.png"
        alt="Secure MDM Android Hero Banner"
      />
      <HeroBannerTablet
        imageUrl="/images/apps/secure-mdm-android/secure-phone-tablet.png"
        alt="Secure MDM Android Hero Banner"
      />
      <ProductSection
        title="SECURE MDM ANDROID"
        description="Blinda con el mayor grado de seguridad tu dispositivo Samsung o Pixel."
        features={[
          "Bloqueo de acceso por USB ",
          "Borrado remoto de emergencia",
          "Mensajería segura y privada",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/secure-mdm-android/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/secure-mdm-android-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.secure-mdm-android"
      />
      <ProductSectionMobile
        title="SECURE MDM ANDROID"
        description="Blinda con el mayor grado de seguridad tu dispositivo Samsung o Pixel."
        features={[
          "Bloqueo de acceso por USB ",
          "Borrado remoto de emergencia",
          "Mensajería segura y privada",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/secure-mdm-android/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/secure-mdm-android-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.secure-mdm-android"
      />
      <ProductSectionTablet
        title="SECURE MDM ANDROID"
        description="Blinda con el mayor grado de seguridad tu dispositivo Samsung o Pixel."
        features={[
          "Bloqueo de acceso por USB ",
          "Borrado remoto de emergencia",
          "Mensajería segura y privada",
        ]}
        price="729$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selected}
        onRadioChange={(val) => {}}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/secure-mdm-android/banner-3-months.jpg"
        appStoreUrl="https://apps.apple.com/app/secure-mdm-android-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.secure-mdm-android"
      />
      <SecurityFeatures
        title="Beneficios de MDM Android"
        features={securityFeaturesData}
        imageUrl="/images/apps/secure-mdm-android/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Beneficios de MDM Android"
        features={securityFeaturesData}
        imageUrl="/images/apps/secure-mdm-android/phoneSecurity.png"
      />
      <SecurityFeaturesMobile
        title="Beneficios de MDM Android"
        features={securityFeaturesData}
        imageUrl="/images/apps/secure-mdm-android/phoneSecurity.png"
      />

      <HeroVideoSection
        title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
        videoUrl="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
      />
      <HeroVideoSectionMobile
        title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
        videoUrl="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
      />
      <HeroVideoSectionTablet
        title={`¿Cómo encriptar tu celular para que nadie pueda espiarte?`}
        videoUrl="https://www.youtube.com/embed/O9MF_k5A0M0?si=JHnq_TXbcUxox_-Q"
      />
      <FeaturedProducts
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/secure-mdm-android/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/secure-mdm-android/phone.png",
        }}
      />
      <FeaturedProductsMobile
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/secure-mdm-android/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/secure-mdm-android/phone.png",
        }}
      />
      <FeaturedProductsTablet
        left={{
          title: "SIM Card encriptada",
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
          buttonLabel: "Comprar",
          onButtonClick: () => alert("Comprar SIM Card encriptada"),
          moreInfoLabel: "Más información",
          onMoreInfo: () => alert("Más información de SIM Card"),
          image: "/images/apps/secure-mdm-android/sim.png",
        }}
        right={{
          title: "E-SIM Encriptada Planes datos o minutos",
          subtitle: "Subtitle element copy",
          buttonLabel: "Ver más",
          onButtonClick: () => alert("Ver más E-SIM"),
          image: "/images/apps/secure-mdm-android/phone.png",
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
