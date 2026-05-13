import { buildStaticPageMetadata } from "@/shared/seo/staticPages";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  return buildStaticPageMetadata("where-to-find-us", locale);
}

export default function WhereToFindUsLayout({ children }: Props) {
  return <>{children}</>;
}