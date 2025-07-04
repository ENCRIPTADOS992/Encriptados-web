"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const SecureProduct = () => {
  const t = useTranslations("SecureCryptPage.product");

  return (
    <section className="lg:w-10/12 py-10 px-4 lg:px-10 bg-white mx-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Texto */}
        <div className="w-[455px] flex flex-col justify-center">
          <h2 className="text-[#0F172A] font-bold text-2xl lg:text-3xl mb-2">
            {t("title")}
          </h2>
          <p className="text-sm text-[#475569] mb-5">
            {t("description")}
          </p>
          <ul className="text-[#1E293B] text-sm flex flex-col gap-2 mb-6">
            <li className="flex items-center gap-2">
              <span>✔</span> {t("features.endToEndEncryption")}
            </li>
            <li className="flex items-center gap-2">
              <span>✔</span> {t("features.chatHiding")}
            </li>
            <li className="flex items-center gap-2">
              <span>✔</span> {t("features.privateCalls")}
            </li>
          </ul>
          <div className="flex items-center gap-4 mb-5 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="license" checked readOnly />
              {t("license.threeMonths")}
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="license" readOnly />
              {t("license.sixMonths")}
            </label>
          </div>
          <hr className="mb-4" />
          <p className="text-xs text-[#64748B] mb-1">{t("pricePrefix")}</p>
          <p className="text-2xl font-bold text-[#0F172A] mb-5">
            {t("price")}
          </p>
          <div className="flex flex-row gap-4 mb-6">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:opacity-90">
              {t("buttons.buyNow")} 🛒
            </button>
            <button className="bg-[#E6F6FB] text-[#054D61] px-6 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-[#d7f0f7]">
              {t("buttons.chatSupport")} 💬
            </button>
          </div>
        </div>

        {/* Imágenes: fondo y producto */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center relative">
          {/* Fondo */}
          <Image
            src="/images/apps/secureCrypt/Group_fondo.png"
            alt="Secure Desktop"
            width={520}
            height={329}
            className="rounded-xl"
          />
          {/* Producto encima */}
          <Image
            src="/images/apps/secureCrypt/licencia.png"
            alt="SecureCrypt Licencia"
            width={202}
            height={275}
            className="absolute left-6 top-8 rounded-lg shadow-lg"
            style={{
              left: "88px",
              top: "32px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SecureProduct;
