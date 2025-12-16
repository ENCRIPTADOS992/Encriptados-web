import SectionWrapper from "@/shared/components/SectionWrapper";
import React from "react";
import Typography from "@/shared/components/Typography";
import Paragraph from "@/shared/components/Paragraph";

const DownloadBanner = () => {
  return (
    <section className="bg-custom-gradient-qr-black-y-grey">
      {/* Fondo full-width */}
      <div className="w-full relative overflow-hidden shadow-[0_-20px_30px_0px_rgba(0,0,0,0.7)]">
        {/* Aquí limitamos ancho y padding solo al contenido */}
        <SectionWrapper className="p-10 flex items-center justify-center">
          {/* Tu contenido queda aquí, con ancho constrained */}
          <div className="w-1/2 flex flex-col justify-center items-start ml-10">
            <Typography variant="h3" as="h2" className="text-white font-bold mb-6 leading-tight">
              Descarga la App para iOS & Android
            </Typography>
            <div className="flex space-x-4 mb-6">
              <img
                src="/images/deliveries/Group 480955701.png"
                alt="App Store"
                className="w-40 cursor-pointer"
              />
              <img
                src="/images/deliveries/Group 480955702.png"
                alt="Google Play"
                className="w-40 cursor-pointer"
              />
            </div>
            <Paragraph variant="small" color="primary" className="text-white">
              O Escanea el código QR con tu cámara
            </Paragraph>
          </div>

          {/* Celular + rombos (posición intacta) */}
          <div className="relative w-1/2 flex justify-end pr-10 items-end -mb-10 mr-20">
            <div className="absolute inset-0">
              {/* 1) Rombo grande azul */}
              <div className="
                absolute bottom-[-70px] left-[80%]
                w-[240px] h-[240px]
                bg-[#35CDFB] rounded-3xl rotate-45
              "/>
              {/* 2) Rombo verde mediano */}
              <div className="
                absolute top-[20%] left-[110%]
                w-[100px] h-[100px]
                bg-[#00FFC2] rounded-3xl rotate-45
              "/>
              {/* 3) Rombo pequeño blanco */}
              <div className="
                absolute top-[20px] left-[101%] -translate-x-1/2
                w-[70px] h-[70px]
                bg-[#CFEDF7] rounded-2xl rotate-45
              "/>
            </div>
            <img
              src="/images/deliveries/iPhone 15 Pro Black Titanium Mockup Portrait (1).png"
              alt="Código QR en Celular"
              className="w-80 relative z-10"
            />
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default DownloadBanner;