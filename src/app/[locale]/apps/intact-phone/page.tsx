"use client";

import ShoppingCart from "@/shared/svgs/ShoppingCart";
import SupportContact from "@/shared/svgs/SupportContact";
import { Check, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Accordion from "../shared/Accordion";
import Button from "../shared/Button";
import CardDetails from "../shared/CardDetails";
import CustomRadioGroup from "../shared/RadioGroup";
import SimCardGroup from "../shared/SimCardGroup";
import Hero from "./components/Hero";
import { details } from "./consts/details";
import { plans } from "./consts/plans";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import TelegramButton from "@/shared/components/TelegramButton";
import SectionWrapper from "@/shared/components/SectionWrapper";

const prices: Record<string, string> = {
  "12.1": "150$ USD",
  "12.2": "1000$ USD",
  "12.3": "1100$ USD",
};

const Page = () => {
  const [selectedPlan, setSelectedPlan] = useState("12.1");
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const productId = searchParams.get("productId");
  const selected = plan || plans[0].value;

  const [product, setProduct] = useState<ProductById | null>(null);

  useEffect(() => {
    if (productId) {
      getProductById(productId, "es").then(setProduct).catch(console.error);
    }
  }, [productId]);

  return (
    <div>
      <Hero />
      <SectionWrapper
        className="
    p-5 bg-white tracking-wide
    flex flex-col
    /* ≥600px: fila inversa, gap y padding */
    sm:flex-row-reverse sm:justify-center sm:items-center sm:gap-20 sm:py-16
    /* ≥744px: misma configuración que sm */
    [@media(min-width:744px)]:flex-row-reverse [@media(min-width:744px)]:justify-center [@media(min-width:744px)]:items-center [@media(min-width:744px)]:gap-20 [@media(min-width:744px)]:py-16
    /* ≥820px: misma que sm */
    md:flex-row-reverse md:justify-center md:items-center md:gap-20 md:py-16
  "
      >
        {/* Imagen */}
        <div
          className="
      mx-auto mb-12
      /* ≥600px: eleva y ancho 60% */
      sm:-mt-8 sm:w-3/5
      /* ≥744px: más elevación y ancho 80% */
      [@media(min-width:744px)]:-mt-12 [@media(min-width:744px)]:w-4/5
      /* ≥820px: ancho 60%, distinto mt */
      md:-mt-16 md:mt-9 md:w-3/5 md:mx-0
      /* ≥1024px+: vuelve 40% ancho */
      lg:w-2/5 xl:w-[37%]
    "
        >
          <Image
            src="/images/apps/intact-phone/banner-3-months.jpg"
            alt="intact-phone banner"
            width={813}
            height={601}
            priority
            className="w-full rounded-lg"
          />
        </div>

        {/* Texto y lista */}
        <div className="md:w-2/4 lg:w-2/5 xl:w-1/3">
          <h2
            className="
        block mb-3 text-[#131313]
        font-bold
        text-xl                 /* móvil */
        sm:text-2xl             /* ≥600px */
        [@media(min-width:744px)]:text-[22px]
        md:text-3xl             /* ≥820px */
        lg:text-4xl             /* ≥1024px */
      "
          >
            INTACT PHONE
          </h2>

          <p
            className="
        text-xs                  /* móvil */
        sm:text-sm               /* ≥600px */
        [@media(min-width:744px)]:text-[15px]
        md:text-base             /* ≥820px */
        lg:text-lg               /* ≥1024px */
        mb-4 text-[#475569]
      "
          >
            Seguridad completa desde el hardware hasta el sistema operativo para
            comunicaciones seguras.
          </p>

          {Array.isArray(product?.checks) && product.checks.length > 0 ? (
            <ul
              className="
          my-4 space-y-2 text-sm       /* móvil 14px */
          sm:text-base                 /* ≥600px 16px */
          [@media(min-width:744px)]:text-[17px]
          md:text-lg                   /* ≥820px 18px */
          lg:text-xl                   /* ≥1024px 20px */
          text-black
        "
            >
              {product.checks.map((check, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check width={24} height={24} color="#1C1B1F" />
                  <span>{check.name}</span>
                </li>
              ))}
            </ul>
          ) : productId ? (
            <p
              className="
          my-4 text-xs sm:text-sm md:text-base lg:text-lg
          text-gray-400
        "
            >
              Cargando características...
            </p>
          ) : null}

          <CustomRadioGroup
            options={plans}
            flexDirection="column"
            value={selectedPlan}
            onChange={setSelectedPlan}
            className="mb-6"
          />

          <div className="h-px bg-[#D9D9D9] my-6" />

          <div className="flex flex-col items-start gap-1 mb-8">
            <span className="text-xs">Desde</span>
            <strong className="text-2xl">{prices[selectedPlan]}</strong>
          </div>

          <div className="flex gap-4">
            <Button
              type="primary"
              className="!bg-black !text-white whitespace-nowrap flex items-center gap-2"
            >
              <span className="font-medium text-base">Comprar ahora</span>
              <ShoppingCart color="currentColor" height={20} width={20} />
            </Button>
            <TelegramButton />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="lg:bg-[#F4F8FA] lg:px-[52px] xl:px-[84px] lg:py-[74px] overflow-hidden">
        <div className="relative flex flex-col px-5 pt-20 bg-black lg:rounded-[44px] lg:flex-row-reverse lg:items-start lg:pt-[65px] lg:pb-[118px] xl:px-[100px] lg:gap-[74px]">
          {/* Blur decorativo */}
          <div className="absolute z-0 h-[450px] w-[450px] bg-[#3fd3ff] rounded-[24px] left-[20%] top-[15%] blur-[104px] lg:left-auto lg:top-[35%] right-[13%] lg:h-[225px] lg:w-[225px]"></div>

          {/* Contenido principal */}
          <div className="z-10 flex flex-col w-full lg:w-2/3 xl:w-[63%] order-1 lg:order-1">
            {/* Título */}
            <b className="text-2xl text-center text-white mb-[28px] md:text-left md:text-[28px]">
              CommuniTake, la casa madre de Intact construye todo el hardware y
              software
            </b>

            {/* Imagen SOLO en sm y md (antes del grid) */}
            <div className="hidden sm:flex lg:hidden w-full flex justify-center relative mb-4 overflow-hidden max-h-[320px] sm:max-h-[400px] md:max-h-[480px]">
              <Image
                src="/images/apps/intact-phone/description.png"
                alt="intact-phone description"
                width={300}
                height={700}
                className="w-auto h-full object-top object-contain sm:w-[350px] md:w-[400px]"
              />
              <div
                className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.96))",
                }}
              ></div>
            </div>

            {/* Grid de Cards */}
            <ol className="mb-[30px] gap-4 flex flex-col sm:grid sm:grid-cols-3 sm:gap-[14px] sm:mx-auto lg:grid lg:grid-cols-2 lg:gap-[14px] lg:mx-0">
              {details.map((item, idx) => (
                <CardDetails
                  title={item.title}
                  description={item.description}
                  key={idx}
                  icon={
                    <CheckCircle2
                      color="#6ADDFF"
                      width={28}
                      height={28}
                      className="min-w-[20px] min-h-[20px]"
                    />
                  }
                  className="h-[180px] lg:h-[290px] lg:max-h-none"
                />
              ))}
            </ol>

            <div className="block sm:hidden w-full flex justify-center relative mt-4 overflow-hidden max-h-[420px]">
              <Image
                src="/images/apps/intact-phone/description.png"
                alt="intact-phone description"
                width={500} // Más ancho
                height={1000} // Más alto para mejor recorte y definición
                className="w-[90vw] max-w-[400px] h-full object-top object-contain"
              />
              <div
                className="absolute bottom-0 left-0 w-full h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.96))",
                }}
              ></div>
            </div>
          </div>

          {/* Imagen solo visible en lg+ */}
          <picture className="hidden lg:flex relative h-[350px] lg:h-auto lg:w-auto order-2 lg:order-2 justify-center">
            <Image
              src="/images/apps/intact-phone/description.png"
              alt="intact-phone description"
              width={411}
              height={808}
              className="block"
            />
          </picture>
        </div>
      </SectionWrapper>

      <section className="py-[40px] pb-[60px] bg-[#F4F8FA] md:pb-0">
<SectionWrapper className="
  flex flex-col
  text-center mx-5 gap-8 mb-[60px]
  sm:flex-row sm:items-center sm:justify-center sm:mb-[60px] sm:py-12 sm:pr-0 sm:w-full sm:text-left sm:gap-2
  md:gap-6 md:py-14 md:w-[98%] md:mx-auto
  lg:gap-20 lg:py-24 lg:w-[85%] lg:ml-auto
">
<b className="
  text-[20px]
  sm:text-[22px] sm:max-w-[340px] sm:ml-4
  md:text-[26px] md:max-w-[380px] md:ml-6
  lg:text-[44px] lg:max-w-[580px] lg:ml-0
  font-bold leading-tight
  w-full sm:w-auto
  text-left sm:text-left
  flex-shrink-0
">
    Cómo Proteger mi Celular de Malware y Hackers para evitar Intervenciones 2023
  </b>
  <div className="
    w-full
    sm:w-[260px] sm:min-w-[260px] sm:max-w-[320px]
    md:w-[340px] md:min-w-[340px] md:max-w-[400px]
    lg:w-[600px] lg:min-w-[500px] lg:max-w-[680px]
    aspect-video rounded-[14px] overflow-hidden shadow-lg
    flex-shrink-0
    mx-auto
  ">
    <iframe
      src="https://www.youtube.com/embed/BCCgWTjrjVs"
      title="Intact Phone Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
      className="w-full h-full"
    />
  </div>
</SectionWrapper>



        <SimCardGroup />
        <section className="mt-14 py-10 px-5 bg-white">
          <b className="block mx-auto mb-11 text-center text-2xl md:text-[34px]">
            Preguntas frecuentas
          </b>
          <div className="flex flex-col gap-4 md:w-3/4 md:mx-auto">
            <Accordion
              title="¿Qué es y para qué sirve el celular IntactPhone?"
              content="Intactphone es un celular cifrado de grado militar con un hardware y software fuertes. No solo protege el dispositivo de ataques cibernéticos o brechas de seguridad sino contra situaciones ambientales como agua, caídas o golpes."
            />
            <Accordion
              title="¿IntactPhone, cuál es el precio?"
              content="El precio del celular Intactphone varía de acuerdo a su modelo y licencia. Se puede adquirir en Encriptados.io desde un valor aproximado de $1000 USD."
            />
            <Accordion
              title="¿IntactPhone, quién lo fabrica?"
              content="CommuniTake, la casa madre de Intact, manufactura completamente el dispositivo. Desde el hardware hasta el sistema operativo. Esto buscando prevenir la sustitución de código por parte de malintencionados y las brechas de información. Conócelo."
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
