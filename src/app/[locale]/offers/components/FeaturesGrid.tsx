import Image from "next/image";
import { useTranslations } from "next-intl";

const ICONS = {
  imsi: "/icons/cambios-imsi.svg",
  substitute: "/icons/numeros-sustitutos.svg",
  lifetime: "/icons/planes-vitalicios.svg",
  global: "/icons/alcance-global.svg",
  security: "/icons/maxima-seguridad.svg",
  devices: "/icons/multiples-dispositivos.svg",
};

export default function FeaturesGrid() {
  const t = useTranslations("OffersPage");

  const features = [
    {
      icon: ICONS.imsi,
      title: t("cards.card1.title"),
      description: t("cards.card1.description"),
    },
    {
      icon: ICONS.substitute,
      title: t("cards.card2.title"),
      description: t("cards.card2.description"),
    },
    {
      icon: ICONS.lifetime,
      title: t("cards.card3.title"),
      description: t("cards.card3.description"),
    },
    {
      icon: ICONS.global,
      title: t("cards.card4.title"),
      description: t("cards.card4.description"),
    },
    {
      icon: ICONS.security,
      title: t("cards.card5.title"),
      description: t("cards.card5.description"),
    },
    {
      icon: ICONS.devices,
      title: t("cards.card6.title"),
      description: t("cards.card6.description"),
    },
  ];

  return (
    <section className="w-full py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-[#141414] p-6 flex flex-col items-center text-center shadow-sm border border-[#1a2a2a]"
            >
              <div className="mb-4 w-[110px] h-[110px] rounded-[24px] bg-[#0D0D0D] flex items-center justify-center">
                <Image
                  src={f.icon}
                  alt={f.title}
                  width={56}
                  height={56}
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
