"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Logo1 from "../../../../../../public/images/fastdeliverypage/logo1.png";
import Logo2 from "../../../../../../public/images/fastdeliverypage/logo2.png";
import Logo3 from "../../../../../../public/images/fastdeliverypage/logo3.png";
import Logo4 from "../../../../../../public/images/fastdeliverypage/logo4.png";

const products = [
  {
    id: 1,
    imageUrl: Logo1,
  },
  {
    id: 2,
    imageUrl: Logo2,
  },
  {
    id: 3,
    imageUrl: Logo3,
  },
  {
    id: 4,
    imageUrl: Logo4,
  },
  {
    id: 5,
    imageUrl: Logo1,
  },
  {
    id: 6,
    imageUrl: Logo2,
  },
  {
    id: 7,
    imageUrl: Logo3,
  },
  {
    id: 8,
    imageUrl: Logo4,
  },
];

const SlickLogos = () => {
  const settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2 cursor-grab ">
            <div className="flex justify-center bg-white rounded-2xl px-3 py-1">
              <Image alt={`Logo ${product.id}`} src={product.imageUrl} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickLogos;
