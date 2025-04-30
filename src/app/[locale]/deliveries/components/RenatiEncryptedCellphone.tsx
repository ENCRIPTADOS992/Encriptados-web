import React from "react";

const FeaturedProductCard = () => {
  return (
    <section className="py-10 bg-[#EAF2F6] flex justify-center">
      <div className="relative w-full max-w-6xl rounded-2xl p-6 flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, black 40%, #740000 80%, red 100%)"
        }}
      >
        {/* Imagen del celular */}
        <div className="w-[45%] relative bottom-[-25px] left-6">
          <img
            src="/images/deliveries/image 315.png"
            alt="Celular Encriptado Renati"
            className="w-[90%] h-auto"
          />
        </div>

        {/* Contenido de la tarjeta */}
        <div className="w-1/2 text-white pl-6 ">
          {/* Logo de Renati */}
          <img
            src="/images/deliveries/image 316.png"
            alt="Renati Logo"
            className="w-16 mb-2"
          />
          <h2 className="text-xl font-bold">Celular Encriptado Renati</h2>

          {/* Precio con descuento */}
          <div className="mt-2">
            <span className="text-m font-normal">$650.00</span>
            <span className="text-sm left-15 text-[#FF4B59] line-through ml-2">$750.00</span>
          </div>

          {/* Botón de compra */}
          <button className="mt-4 bg-white text-black px-10 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Comprar
          </button>
        </div>

        {/* Etiqueta de Descuento */}
        <div className="absolute top-0 right-20 bg-red-600 text-white px-4 py-4 rounded-b-xl text-center">
          <span className="block text-2xl text-black font-extrabold mt-2">20%</span>
          <span className="block text-xs text-black font-semibold ">Dscto</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductCard;