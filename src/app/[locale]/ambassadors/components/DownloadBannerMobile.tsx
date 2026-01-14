import React from "react";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

const DownloadBannerMobile = () => {
  return (
    <section className="py-10 flex justify-center">
      <div
        className={`
          w-full
          bg-gradient-to-b from-black to-[#272727]
          lg:bg-gradient-to-r lg:from-black lg:to-[#272727]

          pt-6 pb-0 lg:pt-10 lg:pb-10
          px-6 lg:px-10
          mx-auto max-w-screen-xl

          flex flex-col lg:flex-row
          items-center lg:items-end
          justify-center

          shadow-[0_-20px_30px_0px_rgba(0,0,0,0.7)]
          relative overflow-hidden
        `}
      >
        {/* Texto y botones */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <Typography 
            variant="h3" 
            as="h2" 
            className="mt-8 lg:mt-0 text-white font-bold mb-6 leading-tight text-center lg:text-left"
          >
            Descarga la App para iOS & Android
          </Typography>
          <div className="flex space-x-4 mb-6">
            <img
              src="/images/deliveries/Group 480955701.webp"
              alt="App Store"
              className="w-32 sm:w-40 cursor-pointer"
            />
            <img
              src="/images/deliveries/Group 480955702.webp"
              alt="Google Play"
              className="w-32 sm:w-40 cursor-pointer"
            />
          </div>
          <Paragraph variant="small" color="primary" className="text-white">
            O Escanea el código QR con tu cámara
          </Paragraph>
        </div>

        {/* QR + rombos */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
          {/* ← Solo show en lg+ */}
          <div className="hidden lg:block absolute inset-0">
            {/* 1) Rombo grande azul */}
            <div className="
              absolute bottom-[-70px] left-[80%]
              w-[240px] h-[240px]
              bg-[#35CDFB] rounded-3xl rotate-45
            " />

            {/* 2) Rombo verde mediano */}
            <div className="
              absolute top-[20%] left-[110%]
              w-[100px] h-[100px]
              bg-[#00FFC2] rounded-3xl rotate-45
            " />

            {/* 3) Rombo pequeño blanco */}
            <div className="
              absolute top-[20px] left-[101%] -translate-x-1/2
              w-[70px] h-[70px]
              bg-[#CFEDF7] rounded-2xl rotate-45
            " />
          </div>

          {/* Imagen del celular con QR */}
          <img
            src="/images/deliveries/iPhone 15 Pro Black Titanium Mockup Portrait (1).webp"
            alt="Código QR en Celular"
            className="w-48 sm:w-60 md:w-72 lg:w-80 relative z-10 mt-5"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadBannerMobile;