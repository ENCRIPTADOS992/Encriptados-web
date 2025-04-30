import React from "react";

const DownloadAppBanner = () => {
  return (
    <section className="py-10 bg-[#EAF2F6] flex justify-center">
      <div className="max-w-6xl w-full bg-gradient-to-b from-white to-[#35CDFB] rounded-2xl p-10 flex items-center justify-center shadow-lg">
        {/* Contenido de texto y botones */}
        <div className="w-1/2 flex flex-col justify-center items-start ml-20">
          <h2 className="text-black text-2xl font-bold mb-4 leading-tight">
            Descarga la App para iOS & Android y compra ahora tu sim
          </h2>
          <div className="flex space-x-4 mb-3">
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
          <p className="text-black-600 text-sm">
            O Escanea el código QR con tu cámara
          </p>
        </div>

        {/* Imagen del celular con QR */}
        <div className="w-1/2 flex justify-end pr-10 items-end -mb-10 mr-20">
          <img
            src="/images/deliveries/iPhone 15 Pro Black Titanium Mockup Portrait (1).png"
            alt="Código QR en Celular"
            className="w-60"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadAppBanner;