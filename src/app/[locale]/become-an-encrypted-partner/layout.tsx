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
    title: "Become an Encrypted Partner",
    description: "Conviertete en socio de Encriptados y distribuye celulares encriptados, SIMs y aplicaciones de comunicacion segura.",
    canonicalPath: `/${safeLocale}/become-an-encrypted-partner`,
    locale: safeLocale,
  });
}

export default function BecomePartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
