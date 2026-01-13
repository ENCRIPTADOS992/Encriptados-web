import Image from "next/image";
import AppStoreFooter from "@/shared/FooterEncrypted/icon/AppStoreFooter";
import PlayStoreSvg from "@/shared/svgs/PlayStoreSvg";

interface DownloadAppSectionProps {
  appStoreUrl?: string;
  googlePlayUrl?: string;
  apkUrl?: string;
  qrImageUrl?: string;
}

/**
 * DownloadAppSection - Componente unificado y responsive
 * Mobile: Layout vertical (columna) con imagen abajo
 * Tablet/Desktop: Layout horizontal (fila) con imagen a la derecha
 */
const DownloadAppSectionUnified: React.FC<DownloadAppSectionProps> = ({
  appStoreUrl = "#",
  googlePlayUrl = "#",
  apkUrl,
  qrImageUrl = "/images/encrypted-sim/download.png",
}) => {
  return (
    <section className="w-full bg-black py-12 lg:py-16">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Contenido de texto */}
          <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Descarga la App
              <br />
              para iOS & Android
            </h2>

            {/* Store buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                aria-label="Descargar en App Store"
              >
                <AppStoreFooter />
              </a>

              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                aria-label="Descargar en Google Play"
              >
                <PlayStoreSvg />
              </a>

              {apkUrl && (
                <a
                  href={apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-4 bg-neutral-800 text-white rounded-lg transition-transform hover:scale-105"
                  aria-label="Descargar APK"
                >
                  Descargar APK
                </a>
              )}
            </div>

            <p className="text-lg text-white/70">
              O escanea el código QR con tu cámara
            </p>
          </div>

          {/* Imagen del teléfono con QR */}
          <div className="relative flex items-center justify-center">
            {/* Phone mockup */}
            <div className="relative w-64 sm:w-72 lg:w-80 aspect-[5/6]">
              <Image
                src="/images/apps/armadillo-v2/iPhonePortrait.png"
                alt=""
                fill
                className="object-contain"
                draggable={false}
                aria-hidden="true"
              />
              
              {/* QR code overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={qrImageUrl}
                  alt="Código QR de descarga"
                  width={180}
                  height={180}
                  className="w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSectionUnified;
