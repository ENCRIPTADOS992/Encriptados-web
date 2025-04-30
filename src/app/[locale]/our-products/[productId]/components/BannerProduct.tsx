import Image from "next/image";
import { useProductById } from "../context/ProductByIdContext";

export default function BannerProduct() {
  const { currentProduct } = useProductById();

  return (
    <div className="relative w-full h-[150px]  md:h-[359px] bg-gray-200">
      {currentProduct?.banner_mobile && (
        <Image
          src={currentProduct.banner_mobile}
          alt="Product Banner for Mobile"
          fill
          sizes="100vw"
          className="block md:hidden object-cover"
          quality={100}
        />
      )}

      {currentProduct?.banner && (
        <Image
          src={currentProduct.banner}
          alt="Product Banner for Desktop"
          fill
          quality={100}
          sizes="100vw"
          className="hidden md:block object-cover"
        />
      )}
    </div>
  );
}
