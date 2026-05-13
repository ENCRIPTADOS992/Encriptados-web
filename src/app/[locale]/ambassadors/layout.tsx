import { buildStaticPageMetadata } from "@/shared/seo/staticPages";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  return buildStaticPageMetadata("ambassadors", locale);
}

export default function AmbassadorsLayout({ children }: Props) {
  return <>{children}</>;
}