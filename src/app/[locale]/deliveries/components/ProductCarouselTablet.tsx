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
    image: "/images/deliveries/chatmail.png",
    href: "/apps/chat-mail",
  },
  {
    id: 2,
    name: "Cryptcom",
    price: "$729 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/cryptcom.png",
    href: "/apps/cryptcom",
  },
  {
    id: 3,
    name: "Renati",
    price: "$650 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/renati.png",
    href: "/apps/renati",
  },
  {
    id: 4,
    name: "Secure MDM Android",
    price: "$250 USD",
    discount: "Ahorra hasta 50 USD",
    image: "/images/deliveries/secure mdm android.png",
    href: "/apps/secure-mdm-android",
  },
  {
    id: 5,
    name: "Secure MDM iPhone",
    price: "$600 USD",
    discount: "Ahorra hasta 50 USD",
    image: "/images/deliveries/secure mdm iphone.png",
    href: "/apps/secure-mdm-iphone",
  },
  {
    id: 6,
    name: "SecureCrypt",
    price: "$449 USD",
    discount: "Ahorra hasta 150 USD",
    image: "/images/deliveries/securecrypt.png",
    href: "/apps/secureCrypt",
  },
  {
    id: 7,
    name: "TotalSec",
    price: "$500 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/totalsec.png",
    href: "/system8",
  },
  {
    id: 8,
    name: "VaultChat",
    price: "$415 USD",
    discount: "Ahorra hasta 130 USD",
    image: "/images/deliveries/vaultchat.png",
    href: "/apps/vault-chat-v2",
  },
];

const ProductCarouselTablet = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("[ProductCarouselTablet] ✅ Componente montado");
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 3 cards
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
      console.log("[ProductCarouselTablet] 🟢 router.push ejecutado");
    } catch (error) {
      console.error("[ProductCarouselTablet] 🔴 Error en router.push", error);
      if (typeof window !== "undefined") {
        window.location.assign(finalHref);
      }
    }
  };

  return (
    <section className="py-10 bg-[#EAF2F6] text-center hidden sm:block lg:hidden">
      <div className="max-w-5xl mx-auto px-4">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="flex justify-center px-2">
              <div
                className="
                relative
                w-[227px] h-[353px]
                rounded-[24px]
                overflow-hidden
              "
                style={{
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #A4EAFF 100%)",
                }}
              >
                <div className="relative z-10 w-[196px] mx-auto mt-6 flex flex-col items-center text-center gap-3">
                  <p className="w-full text-[10px] font-medium leading-[10px] tracking-[0.25em] text-[#102542] uppercase">
                    TELEFONO ENCRIPTADO
                  </p>

                  <h3 className="w-full text-[14px] font-bold leading-[14px] tracking-[0.01em] text-[#102542]">
                    {product.name}
                  </h3>

                  <p className="w-full text-[14px] font-medium leading-[14px] tracking-[0.01em] text-[#102542]">
                    {product.price}
                  </p>

                  <button
                    type="button"
                    className="
                    mt-2
                    bg-[#102542] text-white
                    rounded-[100px]
                    px-[44px] py-[13px]
                    text-xs
                    hover:bg-blue-600
                    transition
                  "
                    onClick={(e) =>
                      handleBuyClick(e, product.href, product.name)
                    }
                  >
                    Comprar Ahora
                  </button>
                </div>

                <div className="absolute -bottom- left-1/2 -translate-x-1/2 w-[186px] h-[233px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[196px] h-[233px] object-contain"
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

export default ProductCarouselTablet;
