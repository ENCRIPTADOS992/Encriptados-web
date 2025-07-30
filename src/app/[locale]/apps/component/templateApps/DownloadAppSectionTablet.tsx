// DownloadAppSectionTablet.tsx
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

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
      {/* Imagen */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 247,
          height: 271,
        }}
      >
        <img
          src="/images/apps/armadillo-v2/iPhonePortrait.png"
          alt="iPhone App Mockup"
          className="w-[247px] h-[271px] object-contain pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  </section>
);

export default DownloadAppSectionTablet;
