import Image from "next/image";
import AppStore from "/public/images/our-products/svg/app-store.svg";
import GooglePlay from "/public/images/our-products/svg/google-play.svg";
import PhoneQr from "/public/images/our-products/phone-qr.png";
import DownloadAPKNew from "./svgs/DownloadAPKNew";

const Component: React.FC = () => {
  return (
    <div className="bg-custom-gradient-qr-black-y-grey md:max-h-[450px] flex items-center justify-center p-4 overflow-y-hidden">
      <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 p-6">
          <h2 className="text-4xl md:text-4xl font-bold text-white leading-tight text-center sm:text-left">
            Descarga la App
            <br />
            para iOS & Android
          </h2>

          <div className="flex flex-row justify-center sm:justify-start gap-4">
            <a
              href="#"
              className="inline-block transition-transform hover:scale-105"
              aria-label="Descargar en App Store"
            >
              <Image
                src={AppStore}
                alt="App Store"
                width={170}
                height={50}
                className="h-[50px] w-auto"
                priority
              />
            </a>

            <a
              href="#"
              className="inline-block transition-transform hover:scale-105"
              aria-label="Descargar en Google Play"
            >
              <Image
                src={GooglePlay}
                alt="Google Play"
                width={170}
                height={50}
                className="h-[50px] w-auto"
                priority
              />
            </a>

            <a
              href="#"
              className="inline-block transition-transform hover:scale-105 h-[50px] w-auto"
              aria-label="Descargar en App Store"
            >
              <DownloadAPKNew />
            </a>
          </div>

          <p className="text-gray-400 text-lg text-center sm:text-left">
            O Escanea el código QR con tu cámara
          </p>
        </div>

        <div className="relative mx-auto w-full sm:max-w-[250px] max-w-[250px] aspect-[5/7]">
          <div className="absolute left-1/2 -translate-x-1/2 w-[370px] h-[400px]  rounded-2xl flex items-center justify-center p-4">
            <Image
              src={PhoneQr}
              alt="QR Code"
              width={260}
              height={260}
              className="w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
