import type { Metadata } from "next";
import { buildSeoMetadata } from "@/shared/seo/metadata";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale || "es";

  return buildSeoMetadata({
    title: "Terminos y Condiciones",
    description: "Terminos y condiciones de uso de Encriptados. Lee nuestras condiciones antes de utilizar nuestros servicios.",
    canonicalPath: `/${safeLocale}/pages/terminos-y-condiciones`,
    locale: safeLocale,
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
