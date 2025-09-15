"use client";

import HeroBanner from "../component/templateApps/HeroBanner";
import HeroBannerMobile from "../component/templateApps/HeroBannerMobile";
import HeroBannerTablet from "../component/templateApps/HeroBannerTablet";
import ProductSection from "../component/templateApps/ProductSection";
import ProductSectionMobile from "../component/templateApps/ProductSectionMobile";
import ProductSectionTablet from "../component/templateApps/ProductSectionTablet";
import HeroVideoSection from "../component/templateApps/HeroVideoSection";
import HeroVideoSectionMobile from "../component/templateApps/HeroVideoSectionMobile";
import HeroVideoSectionTablet from "../component/templateApps/HeroVideoSectionTablet";
import FeaturedProducts from "../component/templateApps/FeaturedProducts";
import FeaturedProductsMobile from "../component/templateApps/FeaturedProductsMobile";
import FeaturedProductsTablet from "../component/templateApps/FeaturedProductsTablet";
import SecurityFeatures from "../component/templateSoftware/SecurityFeatures";
import SecurityFeaturesTablet from "../component/templateSoftware/SecurityFeaturesTablet";
import SecurityFeaturesMobile from "../component/templateSoftware/SecurityFeaturesMobile";
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
  const productId = searchParams.get("productId");
  const plan = searchParams.get("plan");
  const [product, setProduct] = useState<ProductById | null>(null);
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
        "Armadillo Chat es una aplicación de mensajería instantánea de alta seguridad. Con actualizaciones constantes nos aseguramos que todas tus comunicaciones sean privadas y que estén fuera del alcance de cualquier tercero malintencionado.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Alertas sobre posibles impostores",
      description:
        "Armadillo Chat le advierte automáticamente sobre posibles impostores en su lista de contactos y otros dispositivos conectados a su cuenta. En el modo de alta seguridad, también le advertirá sobre cualquier amigo que no haya verificado.",
    },
    {
      icon: "/images/apps/armadillo-v2/icono.png",
      title: "Notificaciones Push",
      description:
        "Armadillo Chat no solo es una aplicación completamente segura, también es muy fácil de usar.",
    },
  ];
  const Faqs = [
    {
      question: "¿Qué es el celular cifrado Armadillo Phone?",
      answer:
        "Es un celular cifrado que ofrece protección avanzada contra piratería. Cuenta con llamadas y videollamadas cifradas, chats encriptados y otras características que lo hacen un equipo seguro a prueba de hackers.",
    },
    {
      question: "¿Dónde comprar Armadillo Phone Celular cifrado?",
      answer:
        "Puedes adquirir tu celular Armadillo Phone o la licencia en Encriptados.io. Paga con el medio de pago que desees y recíbelo en el menor tiempo posible.",
    },
    {
      question: "¿Que es el cifrado OMEMO que utiliza Armadillo Phone?",
      answer:
        "OMEMO es un protocolo moderno que proporciona cifrado de extremo a extremo multicapa lo que permite la sincronización segura de mensajes entre múltiples clientes, incluso si algunos de ellos están fuera de línea.",
    },
  ];
  const securityFeaturesData = [
    {
      title: "Cifrado de almacenamiento",
      description:
        "Armadillo phone no solo cuenta con protocolos de seguridad de última tecnología, también tiene un sofisticado sistema de contraseñas que aseguran máxima seguridad.",
    },
    {
      title: "Protección a la memoria",
      description:
        "Con Armadillo Phone no tienes que preocuparte por nada. La memoria del teléfono está reforzada con software de última generación y hardware especialmente diseñado para la protección.",
    },
    {
      title: "Interfaz",
      description:
        "Hemos simplificado por completo la experiencia de usuario al desarrollar el software cifrado más avanzado, intuitivo y potente. Ya no tienes que cambiar entre aplicaciones.",
    },
    {
      title: "Niveles de Seguridad",
      description:
        "El nivel de seguridad puede ser ajustado en tres niveles diferentes: alto, medio y bajo. Cada uno de los niveles puede ser personalizado y asignarles las políticas que el usuario desea.",
    },
    {
      title: "Borrado de remoto",
      description:
        "Se puede realizar un borrado remoto del teléfono, poniéndote en contacto con nosotros, esto en caso de haberlo perdido, haber sido robado o incautado.",
    },
    {
      title: "Aplicaciones",
      description:
        "Una defensa proactiva. Nuestras aplicaciones monitorean constantemente la actividad a su alrededor y alerta al usuario de posibles peligros, así se previenen los ataques antes de que sucedan.",
    },
    {
      title: "Chat Cifrado",
      description:
        "Videoconferencias, mensajes autodestructivos y chats grupales con cifrado descentralizado. Incluso si el servidor es comprometido, tus conversaciones permanecen seguras",
    },
    {
      title: "Correo electrónico Cifrado PGP-N",
      description:
        "Protege tus datos: Usa tu red y cifrada de inicio a fin. Correo PGP cifrado: Asuntos aleatorios, conexión cifrada a servidores de claves y correo, y claves PGP de 4096 bits.",
    },
    {
      title: " Cifrado OMEMO",
      description:
        "Todas las conexiones de chat utilizan cifrado TLS 1.2 con certificados de 4096 bits. Las claves de cifrado se verifican manualmente mediante código QR",
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


  console.log("plans:", plans);
  console.log("selectedRadio:", selectedRadio);

  return (
    <div>
      <HeroBanner
        imageUrl="/images/apps/armadillo-v2/armadillo_software.png"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerMobile
        imageUrl="/images/apps/armadillo-v2/bannermobile.jpg"
        alt="Armadillo Hero Banner"
      />
      <HeroBannerTablet
        imageUrl="/images/apps/armadillo-v2/bannertablet.png"
        alt="Armadillo Hero Banner"
      />
      <ProductSection
        title="Armadillo"
        description="Un equipo ultra seguro a prueba de ataques y fácil de usar."
        features={[
          "Llamadas y videollamadas cifradas",
          "Interfaz intuitiva",
          "Chats cifrados con borrado remoto",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/armadillo-v2/productSoftware.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionMobile
        title="Armadillo"
        description="Un equipo ultra seguro a prueba de ataques y fácil de usar."
        features={[
          "Llamadas y videollamadas cifradas",
          "Interfaz intuitiva",
          "Chats cifrados con borrado remoto",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/armadillo-v2/productSoftware.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <ProductSectionTablet
        title="Armadillo"
        description="Un equipo ultra seguro a prueba de ataques y fácil de usar."
        features={[
          "Llamadas y videollamadas cifradas",
          "Interfaz intuitiva",
          "Chats cifrados con borrado remoto",
        ]}
        price="349$ USD"
        radioOptions={plans.map((p) => p.label)}
        selectedRadio={selectedRadio}
        onRadioChange={handleRadioChange}
        onBuy={() => {}}
        onChat={() => {}}
        productImage="/images/apps/armadillo-v2/productSoftware.jpg"
        appStoreUrl="https://apps.apple.com/app/armadillo-app"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.armadillo"
      />
      <SecurityFeatures
        title="Te da protección avanzada"
        features={securityFeaturesData}
        imageUrl="/images/apps/armadillo-v2/phoneSecurity.png"
      />
      <SecurityFeaturesTablet
        title="Te da protección avanzada"
        features={securityFeaturesData}
        imageUrl="/images/apps/armadillo-v2/phoneSecurity.png"
      />

      <SecurityFeaturesMobile
        title="Te da protección avanzada"
        features={securityFeaturesData}
        imageUrl="/images/apps/armadillo-v2/phoneSecurity.png"
      />
      <HeroVideoSection
        title={`Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener Uno?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionMobile
        title={`Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener Uno?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
      />
      <HeroVideoSectionTablet
        title={`Teléfonos Seguros y Celulares Encriptados Que No Conoces ¿Cómo tener Uno?`}
        videoUrl="https://www.youtube.com/embed/X9iE-f8briY"
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
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
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
          description:
            "Protégete de los ciberdelincuentes y mantén tu información personal segura",
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
