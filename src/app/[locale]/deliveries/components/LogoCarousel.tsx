import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  { id: 1, image: "/images/deliveries/ChatMaillogo.svg" },
  { id: 2, image: "/images/deliveries/cryptcomlogo.png" },
  { id: 3, image: "/images/deliveries/renatilogo.png" },
  { id: 4, image: "/images/deliveries/secure_MDMlogo_android.svg" },
  { id: 5, image: "/images/deliveries/securecryptlogo.png" },
  { id: 6, image: "/images/deliveries/securemdmlogoapple.png" },
  { id: 7, image: "/images/deliveries/totalseclogo.png" },
  { id: 8, image: "/images/deliveries/VaultChatlogo.svg" },
];

const LogoCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <section className="py-6 bg-[#EAF2F6]">
      <div className="max-w-6xl mx-auto">
        <Slider {...settings} className="flex gap-x-2">
          {logos.map((logo) => (
            <div key={logo.id} className="flex justify-center px-2">
              <div className="w-50 h-20 bg-white rounded-xl flex items-center justify-center">
                <img
                  src={logo.image}
                  alt="Logo"
                  className="w-3/4 h-3/4 object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default LogoCarousel;
