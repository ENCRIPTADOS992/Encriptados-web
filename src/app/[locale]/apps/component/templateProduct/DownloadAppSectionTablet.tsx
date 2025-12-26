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
      <div className="flex flex-col z-10 w-[277px] gap-6">
        <h2 className="font-bold text-white text-[38px] leading-[1.3]">
          Descarga la App <br />
          para iOS &amp; Android
        </h2>
        <div className="flex gap-4">
          <AppStoreFooter />
          <PlayStoreSvg />
        </div>
        <span className="block text-white text-lg leading-relaxed text-white/80">
          O escanea el código QR con tu cámara
        </span>
      </div>

      {/* Imagen con QR superpuesto */}
      <div className="flex items-center justify-center w-[247px] h-[271px]">
        <div className="relative w-[247px] h-[271px]">
          {/* Mockup del iPhone */}
          <Image
            src={PhoneTablet}
            alt=""
            width={247}
            height={271}
            className="w-[247px] h-[271px] object-contain pointer-events-none select-none z-0"
            draggable={false}
            aria-hidden="true"
          />

          {/* QR superpuesto al centro */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
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
