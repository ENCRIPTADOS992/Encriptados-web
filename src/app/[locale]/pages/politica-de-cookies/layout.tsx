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
    title: "Politica de Cookies",
    description: "Politica de cookies de Encriptados. Conoce como usamos las cookies en nuestro sitio web.",
    canonicalPath: `/${safeLocale}/pages/politica-de-cookies`,
    locale: safeLocale,
  });
}

export default function CookiesPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
