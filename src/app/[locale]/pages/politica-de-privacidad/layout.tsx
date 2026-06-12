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
    title: "Politica de Privacidad",
    description: "Politica de privacidad de Encriptados. Conoce como protegemos tu informacion personal.",
    canonicalPath: `/${safeLocale}/pages/politica-de-privacidad`,
    locale: safeLocale,
  });
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
