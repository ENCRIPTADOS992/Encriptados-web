"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { useSearchParams } from "next/navigation";


const ElyonProduct = () => {
  const t = useTranslations("ElyonPage.product");
  const [product, setProduct] = useState<ProductById | null>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  useEffect(() => {
    if (productId) {
      getProductById(productId, 'es')
        .then(setProduct)
        .catch(console.error);
    }
  }, [productId]);

  return (
    <section className="lg:w-10/12 py-10 px-4 lg:px-10 bg-white mx-auto">
      {/* mobile */}
      <div className="block lg:hidden mb-6 flex justify-center">
        <Image
          src="/images/apps/elyon/phone-elyon-app.svg"
          alt="Elyon Mobile"
          width={250}
          height={300}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Texto */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-[#0F172A] font-bold text-2xl lg:text-3xl mb-2">
            {t("title")}
          </h2>
          <p className="text-sm text-[#475569] mb-5">
            {t("description")}
          </p>

          {product?.checks ? (
            <ul className="text-[#1E293B] text-sm flex flex-col gap-2 mb-6">
              {product.checks.map((check, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>✔</span> {check.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 mb-6">Cargando características...</p>
          )}

          <div className="flex items-center gap-4 mb-5 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="license" checked readOnly />
              {t("license.twelveMonths")}
            </label>
          </div>

          <hr className="mb-4" />

          <p className="text-xs text-[#64748B] mb-1">{t("pricePrefix")}</p>
          <p className="text-2xl font-bold text-[#0F172A] mb-5">
            {t("price")}
          </p>

          {/* Botones */}
          <div className="flex flex-row gap-4 mb-6">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:opacity-90">
              {t("buttons.buyNow")} 🛒
            </button>
            <button className="bg-[#E6F6FB] text-[#054D61] px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#d7f0f7]">
              {t("buttons.chatSupport")} 💬
            </button>
          </div>
        </div>

        {/* Imagen desktop */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center">
          <Image
            src="/images/apps/elyon/phone-elyon-app.svg"
            alt="Elyon Desktop"
            width={520}
            height={329}
          />

          {/* imgs de descarga solo en desktop */}
          <div className="flex gap-4 mt-6">
            <Image
              src="/images/apps/elyon/apple-google-download-app.svg"
              alt="App Store"
              width={520}
              height={51}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElyonProduct;