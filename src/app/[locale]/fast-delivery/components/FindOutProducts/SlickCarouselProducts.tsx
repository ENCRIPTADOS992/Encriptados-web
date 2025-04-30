"use client";
import Button from "@/shared/components/Button";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import CellPhone1 from "../../../../../../public/images/fastdeliverypage/cell1.png";
import CellPhone2 from "../../../../../../public/images/fastdeliverypage/cell2.png";
import CellPhone3 from "../../../../../../public/images/fastdeliverypage/cell3.png";
import { useTranslations } from "next-intl";

const SlickCarouselProducts = () => {
  const products = [
    {
      id: 1,
      title: "Secure MDM iPhone",
      price: "723$",
      discount: "100",
      imageUrl: CellPhone1,
    },
    {
      id: 2,
      title: "Secure MDM Android",
      price: "723$",
      discount: "100",
      imageUrl: CellPhone2,
    },
    {
      id: 3,
      title: "Crypcom",
      price: "729$",
      discount: "100",
      imageUrl: CellPhone3,
    },
    {
      id: 3,
      title: "Renati",
      price: "729$",
      discount: "100",
      imageUrl: CellPhone1,
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    arrows: false,
    autoplay: true,
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

  <svg
    width="413"
    height="235"
    viewBox="0 0 413 235"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="13.6639"
      y="-6"
      width="480.028"
      height="666.024"
      rx="34"
      transform="rotate(11.4017 13.6639 -6)"
      fill="url(#paint0_linear_71_604)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_71_604"
        x1="13.6639"
        y1="327.014"
        x2="493.692"
        y2="327.014"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.5" stopColor="#35CDFB" />
        <stop offset="0.9" stopColor="#71DFFF" />
      </linearGradient>
    </defs>
  </svg>;

  const t = useTranslations("DeliveryPage");

  return (
    <div className="container mx-auto px-4">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="p-4 cursor-grab">
            <div className="border rounded-2xl overflow-hidden  bg-white  shadow-lg h-[400px] ">
              <h1 className="text-center text-xs tracking-[0.2em] mt-7 text-[#102542]">
                {t("encryptedPhone")}
              </h1>

              <h2 className="text-lg font-bold text-center text-[#102542]">
                {product.title}
              </h2>

              <p className="text-black font-semibold text-center tracking-[0.1em] text-base">
                ${product.price} USD
              </p>
              <p className="text-[#35CDFB] text-center text-base line-through ">
                {t("saveMoney")} ${product.discount} USD
              </p>
              <div className="flex justify-center">
                <Button
                  rounded="full"
                  customStyles="bg-[#102542] text-[#333333] mt-2"
                >
                  {t("buyNow")}
                </Button>
              </div>

              <div className="w-full">
                <div className="flex justify-center overflow-auto  translate-y-9 bg-[#35CDFB]  rounded-t-[50px] p-4  ">
                  <Image
                    width={200}
                    height={200}
                    alt="phone"
                    src={product.imageUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarouselProducts;
