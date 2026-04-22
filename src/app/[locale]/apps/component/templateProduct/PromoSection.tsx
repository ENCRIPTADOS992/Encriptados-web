"use client";

import { PromoCard } from "./PromoCard";
import { useParams } from "next/navigation";
import { useModalPayment } from "@/providers/ModalPaymentProvider";
import { useGetProducts } from "@/features/products/queries/useGetProducts";

export function PromoSection() {
  const params = useParams();
  const { openModal } = useModalPayment();
  const localeParam = Array.isArray(params?.locale) ? params.locale[0] : params?.locale;
  const locale = localeParam || "es";
  const { data: simProducts = [] } = useGetProducts(40, "", undefined, undefined, { enabled: true });

  const activarAppsProduct = simProducts.find((p) => {
    const name = (p?.name || "").toLowerCase();
    const slug = (p as any)?.slug ? String((p as any).slug).toLowerCase() : "";
    return (
      name.includes("activar app") ||
      name.includes("activar apps") ||
      slug.includes("activar-app") ||
      slug.includes("activar_apps")
    );
  });

  const handleActivarAppsCheckout = () => {
    if (!activarAppsProduct?.id) return;
    openModal({
      productid: String(activarAppsProduct.id),
      languageCode: locale,
      selectedOption: 40,
      mode: "roning_code",
    });
  };

  const promoCards = [
    {
      title: "eSIM Encriptada",
      description:
        "Protégete de los ciberdelincuentes y mantén tu información personal segura.",
      buttonText: "Más información",
      buttonHref: `/${locale}/sim-encriptada`,
      backgroundImage: "/images/home/fondo-encriptados.webp",
      backgroundAlt: "Fondo eSIM Encriptada con tarjetas eSIM y SIM física",
    },
    {
      title: "eSIM TIM Conéctate con total anonimato",
      description:
        "Tus datos no expiran sin importar el tiempo que tardes en consumirlos.",
      buttonText: "Más información",
      buttonHref: `/${locale}/tim-sim`,
      backgroundImage: "/images/home/fondo-tim.webp",
      backgroundAlt: "Fondo SIM TIM con tarjetas eSIM y SIM física",
    },
    {
      title: "Activar Apps",
      description:
        "Activa tus aplicaciones en minutos con un checkout rápido y seguro.",
      buttonText: activarAppsProduct ? "Comprar ahora" : "Más información",
      buttonHref: `/${locale}/our-products?category=40`,
      backgroundImage: "/images/home/fondo-encriptados.webp",
      backgroundAlt: "Fondo Activar Apps",
      iconSrc: "/icons/activar_apps.svg",
      iconAlt: "Icono Activar Apps",
      onButtonClick: activarAppsProduct ? handleActivarAppsCheckout : undefined,
    },
  ];

  return (
    <section className="w-full py-2 px-4 sm:px-6 lg:px-0">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {promoCards.map((card) => (
          <PromoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
