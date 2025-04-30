"use client";
import { Check, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

interface AmbassadorCardProps {
  image?: string;
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
  return (
    <div className="w-full max-w-md  text-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-[300px] overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-6 space-y-6 bg-[#151515]">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#00FF71]" />
          <h2 className="text-2xl text-[#00FF71] font-bold">{title}</h2>
          <span className="px-2 py-1 text-xs font-semibold bg-zinc-800 text-[#00FF71] rounded-full ml-2">
            {company}
          </span>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>

        <div className="space-y-2">
          <h3 className="text-lg text-[#00FF71]">
            {" "}
            {t("AmbassadorsPage.partnerCards.distributor.benefits")}
          </h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-400">
                <Check className="w-5 h-5 text-[#00FF71] shrink-0 mt-0.5" />
                <span className="text-sm text-[#00FF71]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={onSubmit}
            className="w-full bg-[#E3F8FF] rounded-full  text-black py-2 px-4 font-bold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
