"use client";
import BannerConnectBne from "./BannerConnectBne";
import OurSim from "./OurSim";
import PromoBanner from "./PromoBanner";
import BannerAnonymous from "./BannerAnonymous";
import CustomShapeDivider from "./CustomShapeDivider";
import OurBne from "./OurBne";
import FAQSection from "@/shared/components/FAQ/FAQSection";
import QRBanner from "../../fast-delivery/components/QRBanner";
import { BasicFormProvider } from "@/shared/components/BasicFormProvider";
import StepperBuy from "@/shared/components/StepperBuy/StepperBuy";
import WhereUseSimSection from "./WhereUseSimSection";

interface BneSimPageProps {
  locale: string;
}

const BneSimPage = ({ locale }: BneSimPageProps) => {
  const faqs = [
    {
      question: "¿Qué dispositivos son compatibles con la SIM?",
      answer: "La SIM funciona con la mayoría de teléfonos y tablets desbloqueados. Solo necesitas que tu dispositivo admita la banda de tu operador local.",
    },
    {
      question: "¿Cómo activo mi SIM después de comprarla?",
      answer: "Recibirás instrucciones paso a paso por correo y dentro de la app. Generalmente solo debes escanear un código o seguir una guía rápida.",
    },
    {
      question: "¿Puedo usarla en varios países?",
      answer: "Sí. Dependiendo del plan contratado, podrás usar la SIM en diferentes países sin cambiar de número ni perder tu saldo de datos.",
    },
    {
      question: "¿Mi información personal queda registrada?",
      answer: "No pedimos información sensible innecesaria. Nuestro enfoque está en mantener tu navegación lo más privada posible.",
    },
    {
      question: "¿Qué pasa si agoto mis datos?",
      answer: "Puedes recargar tu plan desde la app o desde la web en cualquier momento, sin perder tu SIM ni necesidad de volver a activarla.",
    },
    {
      question: "¿Hay soporte si tengo problemas con la activación?",
      answer: "Sí. Contamos con soporte vía chat y correo para ayudarte con la instalación, activación y uso de tu SIM.",
    },
  ];

  return (
    <>
      <div className="w-full bg-[#f4f8fa]">
        <div>
          <BannerConnectBne />
        </div>
        <BasicFormProvider
          defaultValue={{
            selectedcardvalue: "esim_datos",
            selectedregion: "region",
          }}
          submit={() => {}}
        >
          <WhereUseSimSection locale={locale} />
        </BasicFormProvider>
        <div className="py-12 md:py-16 lg:py-20 px-4 md:px-6">
          <OurSim />
        </div>
        <div
          className="
            bg-gradient-to-r
            from-[#009DFF]
            via-[#009DFF]
            to-[#7ECDFD]
            py-16 md:py-20 lg:py-24
            px-4
          "
        >
          <PromoBanner />
        </div>
        <div className="relative py-16 md:py-20 lg:py-24 z-10">
          <BannerAnonymous />
        </div>
        <div className="relative -translate-y-[400px] -mb-[400px] z-0">
          <CustomShapeDivider />
        </div>
        <div
          className="
            bg-gradient-to-b
            from-[#020202]    
            via-[#020202]   
            to-[#009DFF]     
            py-20 md:py-24 lg:py-32
            px-4
          "
        >
          <OurBne />
        </div>

        <FAQSection 
          title="Preguntas frecuentes"
          faqs={faqs} 
          layout="single" 
          bgColor="bg-white" 
        />
        {/* <div className="max-w-[1100px] m-auto pb-20">
          <QRBanner title="Descarga la App para iOS & Android" />
        </div> */}
      </div>
    </>
  );
};

export default BneSimPage;
