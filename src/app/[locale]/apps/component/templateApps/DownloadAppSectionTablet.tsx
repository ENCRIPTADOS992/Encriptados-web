// DownloadAppSectionTablet.tsx
import Image from "next/image";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

// mismas rutas de assets que usaste en el componente anterior
import PhoneTablet from "/public/images/apps/armadillo-v2/iPhonePortrait.png";
import DownloadQr from "/public/images/encrypted-sim/download.png";

const DownloadAppSectionTablet = () => (
  <section className="w-full hidden sm:flex lg:hidden justify-center items-center bg-black py-8 px-0">
    <div
      className="flex flex-row items-center justify-center mx-auto"
      style={{
        width: 544,
        minHeight: 271,
        gap: 33,
      }}
    >
      {/* Bloque de texto */}
      <div
        className="flex flex-col z-10"
        style={{
          width: 277,
          gap: 18,
        }}
      >
        <h2 className="font-inter font-bold text-white text-[26px] leading-[110%]">
          Descarga la App <br />
          para iOS &amp; Android
        </h2>
        <div className="flex gap-4">
          <AppStoreFooter />
          <PlayStoreSvg />
        </div>
        <span className="block text-white text-[14px] font-normal opacity-80">
          O escanea el código QR con tu cámara
        </span>
      </div>

      {/* Imagen con QR superpuesto */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 247,
          height: 271,
        }}
      >
        <div className="relative w-[247px] h-[271px]">
          {/* Mockup del iPhone */}
          <Image
            src={PhoneTablet}
            alt="iPhone App Mockup"
            width={247}
            height={271}
            className="w-[247px] h-[271px] object-contain pointer-events-none select-none"
            draggable={false}
          />

          {/* QR superpuesto al centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={DownloadQr}
              alt="Código QR de descarga"
              width={180}
              height={180}
              className="w-[180px] h-[180px] rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DownloadAppSectionTablet;
