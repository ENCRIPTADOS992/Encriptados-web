const SimMoreInfoHeroTablet = () => {
  return (
    <section className="bg-[#010101] text-white hidden sm:block lg:hidden">
      <div className="mx-auto max-w-4xl px-6 py-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Texto + ícono */}
        <div className="flex items-start gap-3 md:w-1/2">
          <img
            src="/images/our-products/Group 480956507.png"
            alt="Ícono seguridad"
            className="w-[40px] h-[40px] mt-1 flex-shrink-0"
          />
          <h1 className="font-inter font-bold text-[28px] md:text-[30px] leading-[1.2]">
            Seguridad encriptada en tus comunicaciones
          </h1>
        </div>

        {/* Imágenes a la derecha / abajo */}
        <div className="relative w-full md:w-1/2 h-[260px]">
          <div className="absolute top-[24px] left-[10%] w-[170px] h-[190px] bg-white rounded-3xl opacity-80" />

          <img
            src="/images/our-products/b198b560787a72b14fb6394f2ff13a96bb052654.png"
            alt="Edificios"
            className="absolute -top-[110px] right-[5%] w-[260px] h-[260px] object-cover rounded-full opacity-80"
          />

          <img
            src="/images/our-products/e9c83d58fd547770ff45021f31ef2be160f87e3a.png"
            alt="Usuario hablando"
            className="absolute -top-[20px] right-[18%] w-[210px] h-[220px] object-contain rotate-180"
          />
        </div>
      </div>
    </section>
  );
};