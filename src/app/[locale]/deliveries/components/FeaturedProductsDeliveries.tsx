import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  {
    id: 1,
    name: "ChatMail",
    price: "$649 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/chatmail.png",
  },
  {
    id: 2,
    name: "Cryptcom",
    price: "$729 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/cryptcom.png",
  },
  {
    id: 3,
    name: "Renati",
    price: "$650 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/renati.png",
  },
  {
    id: 4,
    name: "Secure MDM Android",
    price: "$250 USD",
    discount: "Ahorra hasta 50 USD",
    image: "/images/deliveries/secure mdm android.png",
  },
  {
    id: 5,
    name: "Secure MDM iPhone",
    price: "$600 USD",
    discount: "Ahorra hasta 50 USD",
    image: "/images/deliveries/secure mdm iphone.png",
  },
  {
    id: 6,
    name: "SecureCrypt",
    price: "$449 USD",
    discount: "Ahorra hasta 150 USD",
    image: "/images/deliveries/securecrypt.png",
  },
  {
    id: 7,
    name: "TotalSec",
    price: "$500 USD",
    discount: "Ahorra hasta 100 USD",
    image: "/images/deliveries/totalsec.png",
  },
  {
    id: 8,
    name: "VaultChat",
    price: "$415 USD",
    discount: "Ahorra hasta 130 USD",
    image: "/images/deliveries/vaultchat.png",
  },
];

const ProductCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-10 bg-[#EAF2F6] text-center">
      <h2 className="text-3xl font-bold mb-6">Productos Encriptados</h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-3">
              <div className="bg-white shadow-lg rounded-xl p-6 text-center flex flex-col justify-between items-center relative overflow-hidden h-[450px]">
                {/* Texto TELEFONO ENCRIPTADO */}
                <p className="text-sm font-small tracking-widest text-[#102542] uppercase mb-2">
                  TELEFONO ENCRIPTADO
                </p>

                {/* Nombre y precio */}
                <h3 className="text-lg text-[#102542] font-bold">{product.name}</h3>
                <p className="text-black-800 font-normal text-ml">{product.price}</p>
                <p className="text-[#35CDFB] line-through text-sm">{product.discount}</p>

                {/* Botón */}
                <button className="mt-3 bg-[#102542] text-white px-4 py-2 rounded-[30px] hover:bg-blue-600 transition">
                  Comprar Ahora
                </button>

                {/* Imagen del producto con fondo azul inclinado */}
                <div className="relative w-full flex justify-center items-end mt-auto">
                  {/* Fondo azul inclinado y más alto */}
                  <div className="absolute bottom-[-25%] left-[-10%] w-[120%] h-60 bg-[#35CDFB] transform skew-y-6 rounded-[40px]"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative w-4/5 max-h-[230px] object-contain z-10"
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

export default ProductCarousel;
