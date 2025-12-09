export const SimMoreInfoHeroDesktop = () => {
  return (
    <section className="relative bg-[#010101] text-white hidden lg:block">
      <img
        src="/images/our-products/Group 480956507.png"
        alt="Ícono seguridad"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[118px] h-auto"
      />

      <div className="mx-auto max-w-[1440px] h-[284px] pl-[140px] pr-10 flex items-center justify-between overflow-hidden">
        <h1 className="font-inter font-bold text-[34px] leading-[1.2] max-w-[418px]">
          Seguridad encriptada en tus comunicaciones
        </h1>

        <div className="relative w-[608px] h-[284px] flex-shrink-0">
            <div className="absolute top-[32px] -left-[80px] w-[204px] h-[220px] bg-white rounded-3xl opacity-80" />
                <div className="absolute -top-[150px] right-[150px] w-[560px] h-[560px]">
                <img
                    src="/images/our-products/fondo_edificio.png"
                    alt="Edificios"
                    className="w-full h-full object-cover rounded-full"
                />
                <img
                    src="/images/our-products/hombre_llamada.png"
                    alt="Usuario hablando"
                    className="
                        absolute
                        inset-0
                        w-[760px]
                        h-[760px]
                        object-contain
                        scale-[1.45]
                        -translate-y-[5%]
                    "
                />

            </div>
        </div>
      </div>
    </section>
  );
};
