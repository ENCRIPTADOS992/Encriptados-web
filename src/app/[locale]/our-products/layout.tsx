"use client";

import { ReactNode } from "react";
import BannerOurSims from "./components/BannerOurProductsMobile";
import { useParams, usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const { locale, productId } = useParams();

  const isProductDetail = pathname === `/${locale}/our-products/${productId}`;
  const isSimMoreInfo = pathname.includes("/sim-more-info");
  // Base /our-products route uses OurProductsPage which has its own full layout
  const isBaseRoute = pathname === `/${locale}/our-products`;

  if (isProductDetail || isSimMoreInfo || isBaseRoute) {
    return children;
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-[#EBF5FA]
  "
    >
      <BannerOurSims />
      <div className="">{children}</div>
    </div>
  );
}
