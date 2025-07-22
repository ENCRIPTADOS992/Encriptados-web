"use client";

import ShoppingCart from "@/shared/svgs/ShoppingCart";
import SupportContact from "@/shared/svgs/SupportContact";
import { Check, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Accordion from "../shared/Accordion";
import Button from "../shared/Button";
import CardDetails from "../shared/CardDetails";
import SimCardGroup from "../shared/SimCardGroup";
import Hero from "./components/Hero";
import CustomRadioGroup from "./components/RadioGroup";
import { details } from "./consts/details";
import { plans } from "./consts/plans";
import { characteristics } from "./consts/characteristics";
import DetailsElement from "./components/DetailsElement";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import TelegramButton from "@/shared/components/TelegramButton";
import SectionWrapper from "@/shared/components/SectionWrapper";

const prices: Record<string, string> = {
  "3": "349$ USD",
  "6": "600$ USD",
};

const Page = () => {
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
      <SectionWrapper className="p-5 bg-white tracking-wide sm:flex sm:flex-row-reverse sm:justify-center sm:items-center sm:gap-20 sm:py-16">
        <div
          className="
     mx-auto
     mb-[50px]
     /* móvil: ancho completo */
     w-full
     /* ≥600px (sm): 60% */
     sm:w-3/5
     /* ≥744px: 60% */
     [@media(min-width:744px)]:w-4/5 [@media(min-width:744px)]:-mt-8
     /* ≥820px (md): 60% */
     md:w-3/5 md:mt-9 md:mx-0
     /* ≥1024px (lg): vuelve a 40% */
     lg:w-2/5
     /* ≥1280px (xl) sigue igual */
     xl:w-[37%]
   "
        >
          {selected === plans[0]?.value && (
            <Image
              src="/images/apps/dec-secure/banner-3-months.jpg"
              alt="dec secure banner"
              width={813}
              height={601}
              priority
              className="w-full"
            />
          )}
          {selected === plans[1]?.value && (
            <Image
              src="/images/apps/dec-secure/banner-6-months.jpg"
              alt="dec secure banner"
              width={813}
              height={601}
              priority
              className="w-full"
            />
          )}
        </div>
        <div className="md:w-2/4 lg:w-2/5 xl:w-1/3">
          <b className="block text-2xl mb-3 text-[#131313] md:text-[28px]">
            DEC Secure
          </b>
          <p className="text-sm">
            DEC Secure ofrece total tranquilidad cuando se trata de la
            privacidad y seguridad de la información en tu dispositivo móvil.{" "}
          </p>

          {product?.checks ? (
            <ol className="my-4">
              {product.checks.map((check, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check width={28} height={28} color="#1C1B1F" />
                  <p>{check.name}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-gray-400 my-4">
              Cargando características...
            </p>
          )}
          <CustomRadioGroup
            options={plans}
            initialSelected={selected}
            className="flex-wrap"
          />

          <div className="h-px bg-[#D9D9D9] my-[18px]"></div>
          <p className="text-xs">Desde</p>
          <b className="text-2xl">{prices[selected]}</b>
          <div className="flex gap-2 mt-[22px] mb-[28px] md:w-full">
            <Button
              type="primary"
              className="!bg-black !text-white flex items-center gap-2 whitespace-nowrap md:w-full md:justify-center"
            >
              <span className="font-medium text-sm sm:text-base">
                Comprar ahora
              </span>
              <ShoppingCart color="currentColor" height={20} width={20} />
            </Button>
            <TelegramButton />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="lg:bg-[#F4F8FA] lg:px-[52px] xl:px-[84px] lg:py-[74px] overflow-hidden">
         <div className="relative flex flex-col
                      sm:flex-row-reverse
                      md:flex-row-reverse
                     px-5 pt-20 bg-black
                     lg:rounded-[44px] lg:flex-row-reverse lg:items-start lg:pt-[65px] lg:pb-[118px]
                     xl:pl-9 xl:pr-[108px] xl:gap-3">
          <div className="absolute z-0 h-[450px] w-[450px] bg-[#3fd3ff] rounded-[24px] left-[20%] top-[12%] blur-[114px] lg:left-auto lg:top-[35%] right-[13%] lg:h-[225px] lg:w:[225px]"></div>
          <div className="z-10 flex flex-col lg:w-11/12 xl:w-[53%]">
            <b
              className="
                text-2xl
                sm:text-xl
                [@media(min-width:744px)]:text-[20px]
                md:text-[24px]
                lg:text-[32px]
                text-center text-white mb-[28px]
                md:text-left lg:mb-11
              "
            >
              Te mantenemos conectado de forma segura y privada
            </b>
             <ol
              className="
                grid grid-cols-1 gap-1 mb-[30px]
                sm:grid-cols-2 sm:gap-4 sm:mx-auto
                [@media(min-width:744px)]:grid-cols-2 [@media(min-width:744px)]:gap-4
                md:grid-cols-2 md:gap-6 md:mx-auto
                lg:grid
              "
            >
              {details.map((item, idx) => (
                <CardDetails
                title={item.title}
                description={item.description}
                descriptionClassName="
                  text-sm
                  sm:text-xs
                  [@media(min-width:744px)]:text-[13px]
                  md:text-[14px]
                  xl:text-base
                "
                key={idx}
                icon={
                    <CheckCircle2
                      color="#6ADDFF"
                      width={28}
                      height={28}
                      className="min-w-[20px] min-h-[20px]"
                    />
                  }
                className="
                  h-max px-6 pt-6 pb-[34px] lg:h-full
                  sm:px-4 sm:pt-4 sm:pb-6
                  [@media(min-width:744px)]:px-4 [@media(min-width:744px)]:pt-4 [@media(min-width:744px)]:pb-6
                  md:px-5 md:pt-5 md:pb-8
                "
              />
              ))}
            </ol>
          </div>
          <picture className="relative
                             h-[350px]
                             sm:h-[300px]
                             md:h-[300px]
                             overflow-hidden flex justify-center lg:h-auto lg:w-[44%] xl:px-14">
            <Image
              src="/images/apps/dec-secure/vpn-active.png"
              alt="dec-secure details"
              width={541}
              height={807}
              className="absolute top-0 w-[335px] lg:relative lg:top-auto lg:w-full"
            />
          </picture>
        </div>
      </SectionWrapper>

       <SectionWrapper
   className="
     flex flex-col items-center
     pt-11 px-5 bg-white
     sm:flex-row sm:items-start sm:justify-between sm:gap-x-8
     md:flex-row md:items-start md:justify-between md:gap-x-8 md:pt-8 md:pb-0
     lg:pl-24 lg:pr-20 lg:pt-11 lg:grid lg:grid-cols-2 lg:gap-x-4
   "
 >
        <div className="text-lg leading-tight mb-8 lg:ml-24 lg:text-[20px]">
          <h4 className="text-[28px] leading-[41px] font-bold mb-[14px]">
            La seguridad de tus datos es nuestra máxima prioridad
          </h4>

          <b>
            Gestión de aplicaciones móviles
            <br />
            Biblioteca de aplicaciones privadas administradas para proporcionar
            aplicaciones al dispositivo sin una conexión a nubes públicas.
            <br />
            <br />
            Aplicaciones lista blanca
            <br />
            Lista blanca completa de aplicaciones para detener la descarga, o
            implementación de aplicaciones espías o inapropiadas.
            <br />
            <br />
            Solo aplicaciones aprobadas
            <br />
            Nuestro equipo ha examinado de forma independiente cada aplicación
            de la biblioteca para validar los criterios de seguridad y
            privacidad.
          </b>
        </div>
        <picture className="w-full relative h-[395px] overflow-hidden flex justify-center lg:h-auto lg:w-auto xl:px-[66px]">
          <Image
            src="/images/apps/dec-secure/details.png"
            alt="dec-secure chat"
            width={350}
            height={656}
            className="absolute top-0 w-[330px] lg:relative lg:top-auto"
          />
        </picture>
      </SectionWrapper>
      
      <SectionWrapper className="py-11 px-5 bg-[#F4F8FA] md:pt-8 lg:bg-white md:pb-16 lg:px-20 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {characteristics.map((item, idx) => (
            <DetailsElement
              key={idx}
              title={item.title}
              description={item.description}
              imageAlt={item.imageAlt}
              imageSrc={item.imageSrc}
              imageWidth={item.imageWidth}
              imageHeight={item.imageHeight}
              imageCenter={item.imageCenter}
              background={item.background}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="h-[158px] md:h-auto md:max-h-[320px]">
        <Image
          src="/images/apps/dec-secure/banner.png"
          alt="dec secure comunicaciones diseñadas para la privacidad"
          width={1800}
          height={400}
          className="h-full object-cover object-right max-h-[320px]"
        />
      </SectionWrapper>

      <SectionWrapper className="pt-8 pb-[60px] md:pb-0">
        <div 
        className="flex flex-row items-center justify-between
          text-left
          mx-5 gap-8 mb-[60px]
          sm:gap-14
          md:gap-14 md:py-24 md:pl-20 md:w-[95%] md:leading-tight
          lg:pl-24 lg:pr-20 lg:pt-11 lg:grid lg:grid-cols-2 lg:gap-x-4"
          >
          <b className="w-full sm:w-1/2 md:w-2/5 lg:w-full text-[18px] sm:text-[24px] lg:text-[32px]">
            Cómo Proteger mi Celular de Malware y Hackers para evitar
            Intervenciones 2023
          </b>
           <div className="
    w-full 
    h-[220px]                /* móvil: altura fija más grande */
    sm:aspect-video sm:h-auto /* ≥600px: vuelve a aspecto 16:9 */
    sm:w-1/2 
    md:w-3/5 
    lg:w-full 
    rounded-[14px] 
    overflow-hidden 
    shadow-lg
  ">
            <iframe
              src="https://www.youtube.com/embed/Og3xt5izfSU"
              title="Dec Secure Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            />
          </div>
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
    </div>
  );
};

export default Page;
