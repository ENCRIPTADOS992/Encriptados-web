"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter, usePathname } from "next/navigation";

const products = [
  {
    id: 1,
    name: "ChatMail",
    price: "$649 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/chatmail.webp",
    href: "/apps/chat-mail",
  },
  {
    id: 2,
    name: "Cryptcom",
    price: "$729 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/cryptcom.webp",
    href: "/apps/cryptcom",
  },
  {
    id: 3,
    name: "Renati",
    price: "$650 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/renati.webp",
    href: "/apps/renati",
  },
  {
    id: 4,
    name: "Secure MDM Android",
    price: "$250 USD",
    discount: "Ahorra hasta 50 USD",
    image: "/images/deliveries/secure mdm android.webp",
    href: "/apps/secure-mdm-android",
  },
  {
    id: 5,
    name: "Secure MDM iPhone",
    price: "$600 USD",
    discount: "Ahorra hasta 50 USD",
    image: "/images/deliveries/secure mdm iphone.webp",
    href: "/apps/secure-mdm-iphone",
  },
  {
    id: 6,
    name: "SecureCrypt",
    price: "$449 USD",
    discount: "Ahorra hasta 150 USD",
    image: "/images/deliveries/securecrypt.webp",
    href: "/apps/secureCrypt",
  },
  {
    id: 7,
    name: "TotalSec",
    price: "$500 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/totalsec.webp",
    href: "/system8",
  },
  {
    id: 8,
    name: "VaultChat",
    price: "$415 USD",
    discount: "Ahorra hasta 130 USD",
    image: "/images/deliveries/vaultchat.webp",
    href: "/apps/vault-chat-v2",
  },
];

const ProductCarouselMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("[ProductCarouselMobile] ✅ Componente montado");
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleBuyClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    href: string,
    productName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    let finalHref = href;
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    if (match) {
      const locale = match[1];
      if (!href.startsWith(`/${locale}/`)) {
        finalHref = `/${locale}${href}`;
      }
    }

    try {
      router.push(finalHref);
      console.log("[ProductCarouselMobile] 🟢 router.push ejecutado");
    } catch (error) {
      console.error("[ProductCarouselMobile] 🔴 Error en router.push", error);
      if (typeof window !== "undefined") {
        window.location.assign(finalHref);
      }
    }
  };

  return (
    <section className="py-10 text-center md:hidden">
      <div className="max-w-md mx-auto">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white shadow-lg rounded-xl p-5 text-center flex flex-col justify-between items-center relative overflow-hidden h-[420px] rounded-24px">
                <div
                  className="
                    absolute
                    top-[24px]
                    left-1/2 -translate-x-1/2
                    flex flex-col
                    gap-1
                    w-[196px]
                    items-center
                    text-center
                  "
                >
                  <p className="text-[12px] tracking-widest text-[#102542] uppercase mb-2">
                    TELEFONO ENCRIPTADO
                  </p>

                  <h3 className="text-base text-[#102542] font-bold">
                    {product.name}
                  </h3>

                  <p className="text-black-800 font-normal text-sm">
                    {product.price}
                  </p>

                  <button
                    type="button"
                    className="
                      w-full h-[34px] mt-3
                      bg-[#102542] text-white
                      px-5 py-2
                      rounded-[30px]
                      hover:bg-blue-600
                      transition text-sm
                    "
                    onClick={(e) => handleBuyClick(e, product.href, product.name)}
                  >
                    Comprar Ahora
                  </button>
                </div>

                <div className="relative w-full flex justify-center items-end mt-28">
                  <div className="absolute bottom-[-28%] left-[-20%] w-[980%] h-40 bg-[#35CDFB] transform skew-y-6 rounded-[40px]" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative w-[278px] h-[330px] object-contain z-10"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarouselMobile;
