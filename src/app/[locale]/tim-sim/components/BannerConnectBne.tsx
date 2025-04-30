import Image from 'next/image';
import { useTranslations } from 'next-intl';

const BannerConnectBne: React.FC = () => {
  const t = useTranslations('BneSimPage'); // Nombre de la sección de traducción

  return (
    <>
      <div
        style={{
          background:
            'radial-gradient(circle at -15% 37%, rgba(0,157,255,0.8) 0%, rgba(0,157,255,0.9) 3%, rgba(25,25,25,1) 20%, rgba(25,25,25,1) 60%)',
        }}
        className="
          relative w-full h-[80vh] flex flex-col md:flex-row items-end
          bg-no-repeat bg-center
          bg-[length:150%] md:bg-[length:100%]
        "
      >

        {/* 📌 Contenedor principal */}
        <div className="container mx-auto px-4 py-4 max-w-[1200px] relative h-full flex justify-between items-start">

          {/* 📌 Contenedor de texto */}
          <div className="w-full md:w-[50%] flex flex-col justify-center items-center md:items-start text-white h-full mt-[-80px] sm:mt-[-30px] md:mt-0 z-10">

            {/* 📌 Imagen ajustada en móvil */}
            <Image
              src="/images/bne-sim/Frame 480956513.png"
              alt="SIM TIM Logo"
              width={120}
              height={25}
              priority
              className="mb-4 md:w-[150px] md:h-[30px] md:mx-0 mx-auto"
            />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight md:text-left text-center">
              {t('headline')} <br />
              <span className="text-[#10b4e7]">{t('headline1')}</span>
              <span className="text-[#10b4e7]">{t('headline2')}</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl md:text-left text-center">
              {t('subheadline')} <br /> {t('subheadline2')}
            </p>
          </div>
        </div>

        {/* 📌 Contenedor de imagen (Derecha) */}
        <div className="absolute bottom-0 right-0 w-[60%] h-full flex items-end justify-center">
          {/* Imagen del logo grande (Fondo) */}
          <Image
            src="/images/bne-sim/tim_logo_600px_positivo 1.png"
            alt="TIM Logo"
            width={1000}
            height={600}
            priority
            className="absolute -bottom-10 -z-9 transform scale-75 right-0 left-auto translate-x-1/4 lg:translate-x-[13%] hidden md:block"
          />

          {/* Imagen de la persona */}
          <Image
            src="/images/bne-sim/image-banner-bne.png"
            alt="Person"
            width={450}
            height={550}
            priority
            className="
              h-auto object-cover 
              absolute bottom-[85px] sm:bottom-0 
              left-[10%] sm:left-1/2 transform -translate-x-[40%] sm:-translate-x-1/2
              z-[1] md:z-10 /* 📌
              scale-150 sm:scale-100
              opacity-50 md:opacity-100
            "
          />

          {/* Contenedor principal */}
          <div
            className="
              absolute 
              z-20 
              w-full 
              flex 
              justify-between 
              items-start 
              px-16 
              bottom-10
              top-1/2 
              transform 
              -translate-y-1/2
            "
          >
            {/* Contenedor principal (relative) */}
            <div className="relative w-full h-full z-20">
              {/* Etiqueta 1 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '80px', left: '160px' }}>
                <Image
                  src="/images/bne-sim/Frame 480955929.png"
                  alt="Total anonimato"
                  width={170}
                  height={44}
                />
              </div>
              {/* Etiqueta 2 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '180px', left: '80px' }}>
                <Image
                  src="/images/bne-sim/Frame 480955935.png"
                  alt="Sin recargos Roaming"
                  width={230}
                  height={44}
                />
              </div>
              {/* Etiqueta 3 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '300px', left: '120px' }}>
                <Image
                  src="/images/bne-sim/Frame 480955934.png"
                  alt="Compatible iOS y Android"
                  width={210}
                  height={44}
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="relative w-full h-full z-20">
              {/* Etiqueta 1 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '80px', left: '90px' }}>
                <Image
                  src="/images/bne-sim/Frame 480955952.png"
                  alt="Total anonimato"
                  width={180}
                  height={44}
                />
              </div>
              {/* Etiqueta 2 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '180px', left: '140px' }}>
                <Image
                  src="/images/bne-sim/Frame 480955936.png"
                  alt="Sin recargos Roaming"
                  width={250}
                  height={44}
                />
              </div>
              {/* Etiqueta 3 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '300px', left: '90px' }}>
                <Image
                  src="/images/bne-sim/Frame 480956514.png"
                  alt="Compatible iOS y Android"
                  width={230}
                  height={44}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default BannerConnectBne;