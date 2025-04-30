"use client";
import Image from "next/image";
import BannerOur from "/public/images/our-products/banner-our.png";
import { useFormContext } from "react-hook-form";

const FormOurProducts: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="relative w-full bg-[#000] text-white overflow-hidden py-8 ">
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight max-w-[400px] m-auto">
            Recibe noticias de productos en tu email
          </h1>
          <p className="text-lg text-gray-400">
            Registra tu email para recibir nuestro newsletter
          </p>

          {/* Form Section */}
          <div className="relative max-w-[360px] mx-auto">
            <input
              {...register("mail")}
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="w-full h-12 pl-6 pr-32 rounded-full bg-white border-0 text-black text-sm"
              required
            />
            <div className="absolute top-0 right-0 flex items-center space-x-2">
              <button
                type="submit"
                className="h-12 rounded-full bg-[#35CDFB] hover:bg-[#2eb0d8]/90 text-[#085D77] px-6 font-semibold"
              >
                Suscribirme
              </button>
            </div>
          </div>
        </div>

        {/* Image Banner Section */}
        <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-[16/9] w-full">
            <Image
              src={BannerOur}
              alt="Interface preview"
              width={1920}
              height={1080}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2/3 md:top-1/2 left-40 md:w-[700px] md:h-[500px] w-[200px] h-[150px] bg-[#01FFC2]/20 rounded-full blur-3xl" />
      <div className="absolute top-2/3 md:top-1/2right-40 md:w-[700px] md:h-[500px] w-[200px] h-[150px] bg-[#10B4E7]/20 rounded-full blur-3xl" />
    </div>
  );
};

export default FormOurProducts;
