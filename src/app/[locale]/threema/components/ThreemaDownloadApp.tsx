"use client";

import Image from "next/image";

const ThreemaDownloadApp = () => {
  return (
    <section className="bg-gradient-to-r from-black to-[#1e1e1e] pt-[80px] px-4 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center lg:items-start text-white text-center lg:text-left gap-4">
          <h2 className="text-2xl font-bold">
            Descarga la App <br /> para iOS & Android
          </h2>

          <div className="flex items-center gap-4">
            <a
              href="https://apps.apple.com/app" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Image
                src="/images/threema/appStore-logo.png"
                alt="Descargar en App Store"
                width={150}
                height={50}
              />
            </a>

            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/threema/googleStore-logo.png"
                alt="Descargar en Google Play"
                width={150}
                height={50}
              />
            </a>
          </div>

          <p className="text-xs mt-2">
            O Escanea el código QR con tu cámara
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/threema/phone-15.png"
            alt="QR Code para descargar la app"
            width={433}
						height={476}
						className="object-contain w-[339px] h-[373px] lg:w-[433px] lg:h-[476px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ThreemaDownloadApp;
