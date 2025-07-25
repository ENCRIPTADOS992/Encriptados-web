import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

const DownloadAppSection = () => (
  <section className="w-full flex justify-center items-center bg-black min-h-[581px] py-6">
    <div className="w-full max-w-[1440px] flex items-center justify-between mx-auto px-4 gap-4">
      <div className="flex flex-col gap-7 w-[431px] min-w-[310px] z-10">
        <h2 className="font-inter font-bold text-white text-[34px] leading-[100%]">
          Descarga la App <br />
          para iOS &amp; Android
        </h2>
        <div className="flex gap-4">
          <AppStoreFooter />
          <PlayStoreSvg />
        </div>
        <span className="block text-white text-[18px] font-normal mt-1 opacity-80">
          O Escanea el código QR con tu camara
        </span>
      </div>
      <div className="relative w-[433px] min-w-[320px] h-[476px] z-10 overflow-visible flex">
        <img
          src="/images/apps/armadillo-v2/iPhonePortrait.png"
          alt="iPhone App Mockup"
          className="absolute left-0 bottom-0 w-full h-auto object-cover object-bottom pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  </section>
);

export default DownloadAppSection;
