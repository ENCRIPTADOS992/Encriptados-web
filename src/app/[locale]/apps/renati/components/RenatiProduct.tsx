"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getProductById } from "@/features/products/services";
import type { ProductById } from "@/features/products/types/AllProductsResponse";
import { useSearchParams } from "next/navigation";
import TelegramButton from "@/shared/components/TelegramButton";


const prices: Record<string, string> = {
  '3': '425$ USD',
  '6': '825$ USD'
};

const RenatiProduct = () => {
  const t = useTranslations("RenatiPage.product");
  const [selectedLicense, setSelectedLicense] = useState<'3' | '6'>('3');

  
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
          src="/images/apps/renati/phone-Renati-app.png"
          alt="Renati Mobile"
          width={250}
          height={300}
					className="w-[100%]"
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="license"
                value="3"
                checked={selectedLicense === '3'}
                onChange={() => setSelectedLicense('3')}
              />
              {t("license.threeMonths")}
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="license"
                value="6"
                checked={selectedLicense === '6'}
                onChange={() => setSelectedLicense('6')}
              />
              {t("license.sixMonths")}
            </label>
          </div>

          <hr className="mb-4" />

          <p className="text-xs text-[#64748B] mb-1">{t("pricePrefix")}</p>
          <p className="text-2xl font-bold text-[#0F172A] mb-5">
            {prices[selectedLicense]}
          </p>


					{/* Botones */}
					<div className="flex flex-row gap-4 mb-6">
						<button className="bg-black text-white px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:opacity-90">
							{t("buttons.buyNow")}
							<Image
								src="/images/apps/Renati/shopping_cart.png"
								alt="Carrito"
								width={20}
								height={20}
							/>
						</button>

            <TelegramButton />

						{/* <button className="bg-[#E6F6FB] text-[#054D61] px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#d7f0f7]">
							{t("buttons.chatSupport")}
							<Image
								src="/images/apps/Renati/support_agent.png"
								alt="Soporte"
								width={20}
								height={20}
							/>
						</button> */}
					</div>

        </div>

        {/* Imagen desktop */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center">
          <Image
            src="/images/apps/renati/phone-Renati-app.png"
            alt="Renati Desktop"
            width={520}
            height={329}
          />
        </div>
      </div>
    </section>
  );
};

export default RenatiProduct;