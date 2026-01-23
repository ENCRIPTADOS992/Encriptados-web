"use client";
import React from "react";
import { Check, Briefcase } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import TelegramButton from "@/shared/components/TelegramButton";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

type ImageProp = string | React.FC<React.SVGProps<SVGSVGElement>>;

interface AmbassadorCardProps {
  image?: ImageProp;
  title?: string;
  company?: string;
  description?: string;
  benefits?: string[];
  buttonText?: string;
  onSubmit?: () => void;
}

export default function AmbassadorCardDistributor({
  image = "/placeholder.svg?height=400&width=300",
  title = "Promotor",
  company = "Encriptados",
  description = "¿Eres un blogger, Youtuber, Influencer o tienes una voz en el mundo de la ciberseguridad y las comunicaciones seguras? ¡Conviértete en un aliado de Encriptados y obtén grandes recompensas por promocionar nuestros productos y servicios!",
  benefits = [
    "Atractivas comisiones económicas o en productos",
    "Relación directa con Encriptados",
    "Acceso exclusivo a lanzamientos, noticias y contenido de Encriptados",
  ],
  buttonText = "Enviar solicitud de Promotor",
  onSubmit = () => console.log("Form submitted"),
}: AmbassadorCardProps) {
  const t = useTranslations();
  const locale = useLocale();


  return (
    <div className="w-full max-w-md  text-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-[300px] overflow-hidden">
        {typeof image === "string" ? (
          <Image src={image} alt="Promotor" fill className="object-cover" sizes="(min-width:1024px) 384px, (min-width:768px) 360px, 100vw" />
        ) : (
          React.createElement(image as React.FC<React.SVGProps<SVGSVGElement>>, {
            className: "w-full h-full object-cover",
          })
        )}
      </div>
      <div className="p-6 space-y-6 bg-[#151515]">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#00FF71]" />
          <Typography variant="h4" as="h2" className="text-[#00FF71] font-bold">{title}</Typography>
          <span className="px-2 py-1 text-xs font-semibold bg-zinc-800 text-[#00FF71] rounded-full ml-2">
            {company}
          </span>
        </div>

        <Paragraph variant="caption" color="secondary" className="text-zinc-400">{description}</Paragraph>

        <div className="space-y-2">
          <Typography variant="h5" as="h3" className="text-[#00FF71]">
            {t("AmbassadorsPage.partnerCards.distributor.benefits")}
          </Typography>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-400">
                <Check className="w-5 h-5 text-[#00FF71] shrink-0 mt-0.5" />
                <span className="text-sm text-[#00FF71]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 pt-0 flex justify-center telegram-w80">
          <TelegramButton />
        </div>
      </div>
    </div>
  );
}
