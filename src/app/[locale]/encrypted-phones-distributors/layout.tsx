import { buildStaticPageMetadata } from "@/shared/seo/staticPages";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  return buildStaticPageMetadata("encrypted-phones-distributors", locale);
}

export default function EncryptedPhonesDistributorsLayout({ children }: Props) {
  return <>{children}</>;
}