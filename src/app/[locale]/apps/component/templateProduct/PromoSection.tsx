"use client";

import { PromoCard } from "./PromoCard";
import { useParams } from "next/navigation";

export function PromoSection() {
  const params = useParams();
  const locale = params?.locale || "es";

  const promoCards = [
    {
      title: "SIM Card encriptada",
      description:
        "Protégete de los ciberdelincuentes y mantén tu información personal segura.",
      buttonText: "Más información",
      buttonHref: `/${locale}/sim-encriptada`,
      backgroundImage: "/images/home/fondo-encriptados.webp",
      backgroundAlt: "Fondo SIM Card Encriptados con tarjetas eSIM y SIM física",
    },
    {
      title: "SIM TIM Conéctate con total anonimato",
      description:
        "Tus datos no expiran sin importar el tiempo que tardes en consumirlos.",
      buttonText: "Más información",
      buttonHref: `/${locale}/tim-sim`,
      backgroundImage: "/images/home/fondo-tim.webp",
      backgroundAlt: "Fondo SIM TIM con tarjetas eSIM y SIM física",
    },
  ];

  return (
    <section className="w-full py-2">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-5">
        {promoCards.map((card) => (
          <PromoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
