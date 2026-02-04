import OurProductsPage from "./our-products/OurProductsPage";
import { DownloadAppContainer } from "@/shared/components/DownloadApp/DownloadAppContainer";

export default function HomePage() {
  return (
    <>
      <DownloadAppContainer />
      {/* Banner para dispositivos móviles */}

      <OurProductsPage />
    </>
  );
}
