import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

const DownloadAppSectionMobile = () => (
  <section className="w-full bg-black flex flex-col items-center justify-center py-8 px-0 block sm:hidden">
    {/* Título */}
    <h2 className="font-inter font-bold text-white text-[20px] leading-[110%] text-center mb-5 px-2">
      Descarga la App <br />
      para iOS &amp; Android
    </h2>

    {/* Botones stores */}
    <div className="flex flex-row justify-center gap-4 mb-8">
      <AppStoreFooter />
      <PlayStoreSvg />
    </div>

    {/* Texto QR */}
    <span className="block text-white text-[18px] font-normal opacity-80 text-center mb-12 px-2">
      O escanea el código QR con tu cámara
    </span>

    {/* Imagen mockup con tamaño exacto */}
    <div className="w-full flex justify-center">
      <img
        src="/images/apps/armadillo-v2/iPhonePortrait.png"
        alt="iPhone App Mockup"
        className="object-contain select-none pointer-events-none"
        draggable={false}
        style={{
          width: "339px",
          height: "373px",
          maxWidth: "100%",
        }}
      />
    </div>
  </section>
);

export default DownloadAppSectionMobile;
