import { buildStaticPageMetadata } from "@/shared/seo/staticPages";
import JsonLd from "@/shared/components/JsonLd/JsonLd";
import { buildFaqJsonLd } from "@/shared/components/JsonLd/faqJsonLd";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  return buildStaticPageMetadata("deliveries", locale);
}

export default function DeliveriesLayout({ children }: Props) {
  const faqJsonLd = buildFaqJsonLd([
    {
      question: "¿Qué es la Entrega Rápida de Encriptados?",
      answer: "Nord VPN Chat cifra tus mensajes de extremo a extremo para garantizar privacidad total. Solo tú y tus contactos pueden leer los mensajes.",
    },
    {
      question: "¿Qué productos puedo comprar con Entrega Rápida?",
      answer: "Está disponible para dispositivos iOS y Android compatibles con las versiones actuales de la App Store y Google Play.",
    },
    {
      question: "¿Qué costo tiene la Entrega Rápida de Encriptados?",
      answer: "Por su seguridad avanzada, facilidad de uso y soporte 24/7, ideal para quienes valoran la privacidad.",
    },
  ]);

  return (
    <>
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {children}
    </>
  );
}
