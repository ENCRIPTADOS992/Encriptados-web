import Image from "next/image";

export default function ManageYourApps() {
  return (
    <section className="w-full bg-white my-0 sm:my-12">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 py-1">
        <div className="relative w-full overflow-hidden mx-auto md:aspect-[1272/541] rounded-2xl sm:rounded-[44px]">
          {/* Background image */}
          <div className="absolute inset-0">
            <picture>
              <source media="(min-width: 800px)" srcSet="/images/fondo-apps-xl.webp" type="image/webp" />
              <img src="/images/fondo-apps-md.webp" alt="" className="w-full h-full object-cover" />
            </picture>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col md:flex-row">
            {/* Left text */}
            <div className="mb-6 md:mb-0 flex flex-block shrink-0 flex-col justify-center items-center md:items-start text-center md:text-left gap-3 px-8 pt-10 pb-2 md:flex-1 md:gap-4 md:py-10 md:px-12 lg:px-16">
              <h2 className="text-balance text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                Gestiona tus apps
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base md:text-lg lg:text-xl">
                Ofrece un catálogo de aplicaciones enfocadas en la comunicación
                segura y en herramientas diseñadas para reforzar la protección y
                privacidad del usuario.
              </p>
            </div>

            {/* Right phone image */}
            <div className="relative flex flex-1 w-full items-center justify-center md:w-1/2 md:justify-start mb-8 md:mb-0 ">
              <div className="relative w-[250px] sm:w-[310px] md:w-[85%] h-[210px] md:h-[300px] max-w-[351px] max-h-[300px]">
                <picture className="w-full h-full">
                  <source media="(min-width: 800px)" srcSet="/images/apps-group-xl.webp" type="image/webp" />
                  <img
                    src="/images/apps-group-md.webp"
                    alt="Zi0n - Gestiona tus apps"
                    className="w-full h-full object-contain object-bottom md:object-center"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
