import type { Metadata } from "next";
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from "@/shared/seo/metadata";

interface Props {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

const COPY = {
  es: {
    title: "Politica de Cookies",
    description: "Politica de cookies de Encriptados. Conoce como usamos las cookies en nuestro sitio web.",
  },
  en: {
    title: "Cookie Policy",
    description: "Encriptados cookie policy. Learn how we use cookies on our website.",
  },
  fr: {
    title: "Politique de cookies",
    description: "Politique de cookies d'Encriptados. Decouvrez comment nous utilisons les cookies sur notre site.",
  },
  it: {
    title: "Politica sui cookie",
    description: "Politica sui cookie di Encriptados. Scopri come utilizziamo i cookie sul nostro sito.",
  },
  pt: {
    title: "Politica de Cookies",
    description: "Politica de cookies da Encriptados. Saiba como usamos cookies em nosso site.",
  },
} as const;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale in COPY ? (locale as keyof typeof COPY) : "es";

  return buildSeoMetadata({
    title: COPY[safeLocale].title,
    description: COPY[safeLocale].description,
    canonicalPath: `/${safeLocale}/pages/politica-de-cookies`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/pages/politica-de-cookies"),
  });
}

export default function CookiesPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
