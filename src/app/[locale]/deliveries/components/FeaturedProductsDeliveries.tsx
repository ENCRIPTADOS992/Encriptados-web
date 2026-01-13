"use client";

import React, { useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter, usePathname } from "next/navigation";
import { useGetProducts } from "@/features/products/queries/useGetProducts";

console.log("[ProductCarousel] 📦 Módulo cargado");

// Productos base con imagen local y href - los precios se obtendrán de la API
const baseProducts = [
  {
    id: 1,
    name: "ChatMail",
    image: "/images/deliveries/chatmail.png",
    href: "/apps/chat-mail",
  },
  {
    id: 2,
    name: "Cryptcom",
    image: "/images/deliveries/cryptcom.png",
    href: "/apps/cryptcom",
  },
  {
    id: 3,
    name: "Renati",
    image: "/images/deliveries/renati.png",
    href: "/apps/renati",
  },
  {
    id: 4,
    name: "Secure MDM Android",
    image: "/images/deliveries/secure mdm android.png",
    href: "/apps/secure-mdm-android",
  },
  {
    id: 5,
    name: "Secure MDM iPhone",
    image: "/images/deliveries/secure mdm iphone.png",
    href: "/apps/secure-mdm-iphone",
  },
  {
    id: 6,
    name: "SecureCrypt",
    image: "/images/deliveries/securecrypt.png",
    href: "/apps/secureCrypt",
  },
  {
    id: 7,
    name: "VaultChat",
    image: "/images/deliveries/vaultchat.png",
    href: "/apps/vault-chat-v2",
  },
];

// Función para normalizar nombres para comparación
const normalizeName = (name: string) => {
  return name.toLowerCase().replace(/[\s-_]/g, '');
};

const ProductCarousel = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Obtener productos de Apps (categoría 38) y Sistemas (categoría 35)
  const { data: appsProducts } = useGetProducts(38, "all");
  const { data: systemsProducts } = useGetProducts(35, "all");

  // Combinar productos de ambas categorías y eliminar duplicados
  const apiProducts = useMemo(() => {
    const all = [...(appsProducts || []), ...(systemsProducts || [])];
    // Eliminar duplicados por id
    const uniqueMap = new Map();
    all.forEach(p => {
      if (!uniqueMap.has(p.id)) {
        uniqueMap.set(p.id, p);
      }
    });
    return Array.from(uniqueMap.values());
  }, [appsProducts, systemsProducts]);

  // Mapear productos base con datos de la API
  const products = useMemo(() => {
    return baseProducts.map(baseProduct => {
      // Buscar el producto en la API por nombre normalizado
      const apiProduct = apiProducts.find(
        ap => normalizeName(ap.name) === normalizeName(baseProduct.name)
      );
      
      // Si encontramos el producto en la API, usar su precio
      const price = apiProduct?.selected_variant_price ?? apiProduct?.price ?? 0;
      
      return {
        ...baseProduct,
        price: `$${price} USD`,
        apiPrice: price,
      };
    });
  }, [apiProducts]);

  useEffect(() => {
    console.log("[ProductCarousel] ✅ Componente montado");
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
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
      console.log("[ProductCarousel] 🟢 router.push ejecutado");
    } catch (error) {
      console.error("[ProductCarousel] 🔴 Error en router.push", error);
      if (typeof window !== "undefined") {
        console.log(
          "[ProductCarousel] 🔁 Fallback window.location.assign",
          finalHref
        );
        window.location.assign(finalHref);
      }
    }
  };

  return (
    <section className="py-10 bg-[#EAF2F6] text-center">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <Slider {...settings}>
          {products.map((product) => {
            
            return (
              <div key={product.id} className="px-2 sm:px-3">
                <div 
                  className="shadow-lg rounded-xl pt-4 sm:pt-5 lg:pt-6 px-4 sm:px-5 lg:px-6 pb-0 text-center flex flex-col items-center relative overflow-hidden h-[380px] sm:h-[400px] md:h-[420px] lg:h-[450px]"
                  style={{ background: 'linear-gradient(180deg, #FFFFFF 33%, #A4EAFF 100%)' }}
                >
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] sm:text-[12px] lg:text-[14px] font-small tracking-widest text-[#102542] uppercase">
                      TELEFONO ENCRIPTADO
                    </p>
                    <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#102542] font-bold">
                      {product.name}
                    </h3>
                    <p className="text-[14px] sm:text-[16px] lg:text-[18px] text-black-800 font-normal">
                      {product.price}
                    </p>
                </div>
                  <button
                    type="button" 
                    className="mt-2 sm:mt-3 bg-[#102542] text-white px-4 py-2 rounded-[30px] hover:bg-blue-600 transition text-[14px] sm:text-[15px] lg:text-[16px] min-w-[150px] sm:min-w-[170px] lg:w-[193px] h-[40px] sm:h-[42px] lg:h-[44px]"
                    onClick={(e) => {
                      handleBuyClick(e, product.href, product.name);
                    }}
                  >
                    Comprar Ahora
                  </button>

                  <div className="relative w-full flex justify-center items-end mt-auto flex-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative w-[200px] sm:w-[220px] md:w-[260px] lg:w-[294px] h-auto max-h-full object-contain object-bottom z-10"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default ProductCarousel;
