import Image from "next/image";
import ManMinutos from "/public/images/our-products/man-activate.png";
import FondoActivate from "/public/images/our-products/Fondo-activate.jpg";
import IconWhatsappSVG from "/public/images/our-products/svg/icon-whatsapp.svg";
import IconTelegramSVG from "/public/images/our-products/svg/icon-telegram.svg";
import IconSignalSVG from "/public/images/our-products/svg/icon-signal.svg";
import IconWechatSVG from "/public/images/our-products/svg/icon-wechat.svg";
import IconLineSVG from "/public/images/our-products/svg/icon-line.svg";
import IconColombiaSVG from "/public/images/our-products/svg/icon-colombia.svg";

const appData = [
  { name: "whatsapp", icon: IconWhatsappSVG, bgColor: "bg-green-500" },
  { name: "telegram", icon: IconTelegramSVG, bgColor: "bg-blue-500" },
  { name: "signal", icon: IconSignalSVG, bgColor: "bg-blue-700" },
  { name: "wechat", icon: IconWechatSVG, bgColor: "bg-white" },
  { name: "line", icon: IconLineSVG, bgColor: "bg-green-600" },
];

export default function Component() {
  return (
    <div className="relative min-h-[400px] h-auto w-full bg-black overflow-hidden">
      {/* Background image with diagonal overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative h-full w-full opacity-60">
          <Image
            src={FondoActivate}
            alt="Office building background"
            className="h-full w-full object-cover"
            fill
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black sm:bg-none"
            style={{
              background: "linear-gradient(105deg, transparent 0%, black 100%)",
            }}
          />
          {/* Diagonal division for desktop */}
          <div
            className="hidden sm:block absolute inset-0 bg-black"
            style={{ clipPath: "polygon(65% 0, 100% 0, 100% 100%, 45% 100%)" }}
          />
        </div>
      </div>

      {/* Person image */}
      <div className="absolute bottom-0 left-0 w-1/3 h-full hidden sm:block">
        <Image
          src={ManMinutos}
          alt="Person using phone"
          className="object-contain object-bottom"
          fill
          priority
          sizes="50vw"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full sm:w-3/4 md:w-1/2 ml-auto space-y-8 flex flex-col items-center sm:items-start">
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-xl font-light text-white sm:text-2xl lg:text-3xl">
              Activa APPs por SMS con{" "}
              <strong className="text-primary font-bold">Encriptados</strong>
            </h1>
            <p className="text-base sm:text-lg text-white">
              Regístrate en cualquier aplicación con un número de teléfono
              virtual
            </p>
          </div>

          {/* App icons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            {appData.map(({ name, icon, bgColor }) => (
              <div
                key={name}
                className={`flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-xl p-2 ${bgColor}`}
              >
                <Image
                  src={icon}
                  alt={`${name} icon`}
                  width={40}
                  height={40}
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                />
              </div>
            ))}
          </div>

          {/* Colombian flag icon and Buy Now Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start w-full">
            <button className="rounded-full bg-[#0AAEE1] px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white font-bold hover:bg-blue-600 transition-colors w-auto min-w-[150px] sm:w-[200px]">
              Comprar ahora
            </button>
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Image
                src={IconColombiaSVG}
                alt="Colombian flag icon"
                width={24}
                height={24}
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
              <span className="text-xs sm:text-sm text-white">
                Se genera un número colombiano
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
