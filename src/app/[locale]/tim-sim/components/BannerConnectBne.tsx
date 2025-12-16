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
              alt="Logotipo de SIM TIM"
              width={120}
              height={25}
              priority
              className="mb-4 md:w-[150px] md:h-[30px] md:mx-0 mx-auto"
            />

            <h1 className="text-[24px] sm:text-[30px] lg:text-[38px] font-bold mb-6 leading-[1.3] md:text-left text-center">
              {t('headline')} <br />
              <span className="text-[#10b4e7]">{t('headline1')}</span>
              <span className="text-[#10b4e7]">{t('headline2')}</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed md:text-left text-center">
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
            alt="Persona con tecnología SIM TIM"
            width={450}
            height={550}
            priority
            className="
              h-auto object-cover 
              absolute bottom-[85px] sm:bottom-0 
              left-[10%] sm:left-1/2 transform -translate-x-[40%] sm:-translate-x-1/2
              z-[1] md:z-10
              scale-150 sm:scale-100
              opacity-50 md:opacity-100
              max-w-[300px] max-h-[400px] md:max-w-[400px] md:max-h-[500px] lg:max-w-[450px] lg:max-h-[550px]
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
              <div className="absolute hidden md:hidden lg:block" style={{ top: '80px', left: '160px' }} aria-hidden="true">
                <Image
                  src="/images/bne-sim/Frame 480955929.png"
                  alt="Etiqueta decorativa: Total anonimato en tus comunicaciones"
                  width={170}
                  height={44}
                />
              </div>
              {/* Etiqueta 2 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '180px', left: '80px' }} aria-hidden="true">
                <Image
                  src="/images/bne-sim/Frame 480955935.png"
                  alt="Etiqueta decorativa: Sin recargos de Roaming internacional"
                  width={230}
                  height={44}
                />
              </div>
              {/* Etiqueta 3 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '300px', left: '120px' }} aria-hidden="true">
                <Image
                  src="/images/bne-sim/Frame 480955934.png"
                  alt="Etiqueta decorativa: Compatible con iOS y Android"
                  width={210}
                  height={44}
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="relative w-full h-full z-20">
              {/* Etiqueta 1 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '80px', left: '90px' }} aria-hidden="true">
                <Image
                  src="/images/bne-sim/Frame 480955952.png"
                  alt="Etiqueta decorativa: Beneficio de privacidad total"
                  width={180}
                  height={44}
                />
              </div>
              {/* Etiqueta 2 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '180px', left: '140px' }} aria-hidden="true">
                <Image
                  src="/images/bne-sim/Frame 480955936.png"
                  alt="Etiqueta decorativa: Beneficio sin cargos adicionales"
                  width={250}
                  height={44}
                />
              </div>
              {/* Etiqueta 3 */}
              <div className="absolute hidden md:hidden lg:block" style={{ top: '300px', left: '90px' }} aria-hidden="true">
                <Image
                  src="/images/bne-sim/Frame 480956514.png"
                  alt="Etiqueta decorativa: Compatibilidad multiplataforma"
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