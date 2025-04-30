import Image from "next/image";
import WomenActivate from "../../../../../public/images/our-products/woman-activate.png";
import LogoSecureSVG from "../../../../../public/images/our-products/svg/icon-secure-mdm.svg";
import PhoneSecure from "../../../../../public/images/our-products/phone-secure.png";

export default function BannerSecureMdm() {
  return (
    <div className="flex flex-col md:flex-row md:max-h-[400px] bg-custom-gradient-secure-black-y-grey lg:pl-[16vh] pl-5">
      <div className="order-2 sm:order-1 md:w-1/2 self-center py-8">
        {/* Contenido de texto */}
        <div className="text-center md:text-left z-10">
          {/* Logo y título */}
          <div className="space-y-2">
            <div className="bg-[#343434] py-2 px-4 rounded-lg inline-block mx-auto md:mx-0">
              <Image
                src={LogoSecureSVG}
                alt="Secure MDM logo"
                width={100}
                height={40}
              />
            </div>
            <h1 className="text-2xl sm:text-sm md:text-3xl font-semibold text-white">Secure MDM iPhone</h1>
            <p className="text-base sm:text-base md:text-lg text-blue-300">Desde $600 USD</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">Ahora 50 USD</p>
          </div>
          {/* Botones de acción */}
          <div className="flex flex-col gap-4 items-center sm:items-start mt-6">
            <button className="bg-blue-300 text-black px-6 py-2 rounded-full w-full sm:w-[200px] font-semibold">Comprar</button>
            <button className="text-white underline w-full sm:w-[200px] md:text-left">Más información</button>
          </div>
        </div>
      </div>

      {/* Imagen del iPhone centrada */}
      <div className="order-3 sm:order-2 w-1/2 md:self-end mx-auto">
        <Image 
          src={PhoneSecure}
          alt="Secure MDM iPhone"
          className=" mx-auto lg:w-[70%] h-[full] object-contain "
          priority
        />
      </div>      

      {/* Imagen de la mujer a la derecha */}
      <div className="order-1 sm:order-3 w-1/2 mx-auto">
        <Image
          src={WomenActivate}
          alt="Mujer con auricular"
          className="h-full w-full object-contain scale-100 "          
          height={600}
          priority
        />
      </div>
    </div>
  );
}