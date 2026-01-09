import Image from "next/image"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"

export default function BannerConnectBne() {
  const t = useTranslations('BneSimPage.banner')
  
  const features = [
    { blue: t('features.anonymity.blue'), black: t('features.anonymity.black') },
    { blue: t('features.internet.blue'), black: t('features.internet.black') },
    { blue: t('features.compatible.blue'), black: t('features.compatible.black') },
    { blue: t('features.coverage.blue'), black: t('features.coverage.black') },
    { blue: t('features.roaming.blue'), black: t('features.roaming.black') },
    { blue: t('features.activation.blue'), black: t('features.activation.black') },
  ]

  return (
    <main className="bg-gradient-to-r from-[#001E30] to-[#000000] w-full">
      {/* Desktop and Tablet Layout */}
      <div className="hidden sm:flex w-full px-6 lg:px-12 xl:px-16 pt-6 lg:pt-8 xl:pt-10 pb-0">
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 max-w-[1600px] mx-auto w-full">
          {/* Left Column */}
          <div className="space-y-3 lg:space-y-4 xl:space-y-5 z-10 self-center">
            <div className="inline-block">
              <Image
                src="/images/bne-sim/logo-sim-tim.svg"
                alt="SIM TIM Logo"
                width={170}
                height={54}
                className="w-auto h-9 md:h-10 lg:h-11 xl:h-12"
              />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold text-white leading-tight">
              {t('title')}
              <span className="text-[#009DFF]">{t('titleHighlight')}</span>
            </h1>

            <p className="text-sm md:text-base lg:text-base xl:text-lg text-gray-300">
              {t('subtitle')}
            </p>
          </div>

          {/* Right Column - Desktop/Tablet with man and badges */}
          <div className="relative flex justify-center sm:justify-end self-end">
            <div className="absolute -right-6 lg:-right-12 xl:-right-16 top-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] 2xl:w-[600px] 2xl:h-[600px] opacity-20 pointer-events-none hidden lg:block overflow-visible">
              <Image
                src="/images/bne-sim/logo-tim.png"
                alt="TIM Logo Background"
                width={800}
                height={800}
                className="w-full h-full object-contain object-right"
              />
            </div>

            {/* Man Image with Floating Tags */}
            <div className="relative max-w-xs lg:max-w-sm xl:max-w-md w-full">
              <div className="relative z-10">
                <Image
                  src="/images/bne-sim/hombre-feliz.png"
                  alt="Hombre Feliz"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />

                {/* Floating Feature Tags - Only visible on desktop */}
                <div className="hidden lg:block">
                  {/* Top Left - Total anonimato */}
                  <div className="absolute top-4 xl:top-8 -left-8 xl:-left-12 bg-white rounded-full px-3 xl:px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#009DFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-medium">
                      <span className="text-[#009DFF]">{features[0].blue}</span>{" "}
                      <span className="text-black">{features[0].black}</span>
                    </span>
                  </div>

                  {/* Top Right - Internet ilimitado */}
                  <div className="absolute top-0 xl:top-4 -right-4 xl:-right-8 bg-white rounded-full px-3 xl:px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#009DFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-medium">
                      <span className="text-[#009DFF]">{features[1].blue}</span>{" "}
                      <span className="text-black">{features[1].black}</span>
                    </span>
                  </div>

                  {/* Middle Left - Compatible iOS y Android */}
                  <div className="absolute top-[35%] -left-12 xl:-left-16 bg-white rounded-full px-3 xl:px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#009DFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-medium">
                      <span className="text-[#009DFF]">{features[2].blue}</span>{" "}
                      <span className="text-black">{features[2].black}</span>
                    </span>
                  </div>

                  {/* Middle Right - Cobertura 150 países */}
                  <div className="absolute top-[40%] -right-4 xl:-right-8 bg-white rounded-full px-3 xl:px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#009DFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-medium">
                      <span className="text-[#009DFF]">{features[3].blue}</span>{" "}
                      <span className="text-black">{features[3].black}</span>
                    </span>
                  </div>

                  {/* Bottom Left - Sin recargos Roaming */}
                  <div className="absolute bottom-16 xl:bottom-20 -left-10 xl:-left-14 bg-white rounded-full px-3 xl:px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#009DFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-medium">
                      <span className="text-[#009DFF]">{features[4].blue}</span>{" "}
                      <span className="text-black">{features[4].black}</span>
                    </span>
                  </div>

                  {/* Bottom Right - Activación instantánea */}
                  <div className="absolute bottom-20 xl:bottom-24 -right-4 xl:-right-8 bg-white rounded-full px-3 xl:px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#009DFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-medium">
                      <span className="text-[#009DFF]">{features[5].blue}</span>{" "}
                      <span className="text-black">{features[5].black}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden w-full px-6 pt-8 flex flex-col items-center text-center relative overflow-hidden pb-0">
        {/* Logo */}
        <div className="mb-6 relative z-10">
          <Image src="/images/bne-sim/logo-sim-tim.svg" alt="SIM TIM Logo" width={170} height={54} className="w-auto h-12" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4 max-w-md relative z-10">
          {t('title')}
          <span className="text-[#009DFF]">{t('titleHighlight')}</span>
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-8 max-w-sm relative z-10">
          {t('subtitle')}
        </p>

        <div className="absolute right-0 top-0 bottom-0 w-full opacity-20 pointer-events-none flex items-center justify-end">
          <Image
            src="/images/bne-sim/logo-tim.png"
            alt="TIM Logo Background"
            width={600}
            height={600}
            className="w-full h-auto object-contain object-right"
          />
        </div>

        {/* Man Image */}
        <div className="relative w-full max-w-xs mb-0 z-10">
          <Image src="/images/bne-sim/hombre-feliz.png" alt="Hombre Feliz" width={300} height={300} className="w-full h-auto" />
        </div>
      </div>

      {/* Cinta de carrusel - Solo móvil */}
      <div className="sm:hidden w-full bg-[#068CE1] py-4">
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-3">
            {/* Duplicamos los features para crear el efecto infinito */}
            {[...features, ...features].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#068CE1] rounded-full px-4 py-2 shadow-lg whitespace-nowrap flex-shrink-0"
              >
                <div className="w-4 h-4 rounded-full bg-[#000000] flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">
                  {feature.blue} {feature.black}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </main>
  )
}