export const SimMoreInfoHeroTablet = () => {
  return (
    <section className="bg-[#010101] text-white hidden sm:block lg:hidden">
      <div className="relative mx-auto max-w-[744px] h-[147px] px-6 flex items-center justify-between overflow-hidden">
        {/* Ícono + texto */}
        <div className="flex items-start gap-3 z-10">
          <img
            src="/images/our-products/Group 480956507.png"
            alt="Ícono seguridad"
            className="w-[42px] h-[42px] mt-1"
          />

          <h1 className="font-inter font-bold text-[24px] leading-[1.2] max-w-[300px]">
            Seguridad encriptada en tus comunicaciones
          </h1>
        </div>

        {/* Bloque visual derecho (MISMA LÓGICA QUE DESKTOP) */}
        <div className="relative w-[320px] h-[147px] flex-shrink-0">
          {/* Tarjeta blanca */}
          <div className="absolute top-[16px] -left-[48px] w-[150px] h-[160px] bg-white rounded-3xl opacity-80" />

          {/* Contenedor fondo + hombre */}
          <div className="absolute -top-[85px] right-[40px] w-[260px] h-[260px]">
            {/* Fondo */}
            <img
              src="/images/our-products/fondo_edificio.png"
              alt="Edificios"
              className="w-full h-full object-cover rounded-full"
            />

            {/* Hombre centrado, proporcionado */}
            <img
              src="/images/our-products/hombre_llamada.png"
              alt="Usuario hablando"
              className="
                absolute
                inset-0
                w-[360px]
                h-[360px]
                object-contain
                scale-[1.1]
                -translate-y-[6%]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
