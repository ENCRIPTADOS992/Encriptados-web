import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

const DownloadAppSectionMobile = () => (
  <section className="w-full bg-black flex flex-col items-center justify-center py-12 px-4 sm:hidden">
    {/* Título */}
    <h2 className="font-bold text-white text-[30px] leading-[1.4] text-center mb-6">
      Descarga la App <br />
      para iOS &amp; Android
    </h2>

    {/* Botones stores */}
    <div className="flex flex-row justify-center gap-4 mb-8">
      <AppStoreFooter />
      <PlayStoreSvg />
    </div>

    {/* Texto QR */}
    <span className="block text-white text-lg leading-relaxed text-white/80 text-center mb-12">
      O escanea el código QR con tu cámara
    </span>

    {/* Imagen mockup con tamaño exacto */}
    <div className="w-full flex justify-center relative">
      {/* Lateral izquierdo (detrás de la imagen) */}
      <div
        className="absolute left-0 pointer-events-none z-0"
        style={{
          top: "30%",
          height: "70%",
          width: "60px",
          background:
            "linear-gradient(to right, #000000 0%, #272727 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* Lateral derecho (detrás de la imagen) */}
      <div
        className="absolute right-0 pointer-events-none z-0"
        style={{
          top: "30%",
          height: "70%",
          width: "60px",
          background:
            "linear-gradient(to left, #000000 0%, #272727 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* Mockup en background */}
      <img
        src="/images/apps/armadillo-v2/iPhonePortrait.png"
        alt=""
        className="relative z-10 object-contain select-none pointer-events-none"
        draggable={false}
        style={{
          width: "339px",
          height: "373px",
          maxWidth: "100%",
        }}
        aria-hidden="true"
      />

      {/* QR superpuesto al centro */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <img
          src="/images/encrypted-sim/download.png"
          alt="Código QR de descarga"
          className="w-[240px] h-[240px] rounded-lg select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  </section>
);

export default DownloadAppSectionMobile;
