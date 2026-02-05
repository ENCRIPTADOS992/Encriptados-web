import Image from "next/image"

export default function PrivateAppStore() {
    return (
        <section className="w-full bg-white mb-12">
            <div className="w-full max-w-screen-xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 py-1">
                <div
                    className="relative w-full overflow-hidden mx-auto aspect-[4/5] sm:aspect-square md:aspect-[1272/541] rounded-none sm:rounded-[44px]"
                >
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/apps/galaxia/fondo.webp"
                            alt=""
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0" style={{ background: "#00000099" }} />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col md:flex-row">
                        {/* Left text */}
                        <div className="flex flex-block shrink-0 flex-col justify-center items-center md:items-start text-center md:text-left gap-3 px-8 pt-10 pb-2 md:flex-1 md:gap-4 md:py-10 md:px-12 lg:px-16">
                            <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-3xl lg:text-4xl">
                                Tienda de Apps privada
                            </h2>
                            <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base md:text-base">
                                {"Ofrece un cat\u00E1logo de apps orientadas exclusivamente en la comunicaci\u00F3n segura y herramientas para su seguridad"}
                            </p>
                        </div>

                        {/* Right phone image */}
                        <div className="relative flex flex-1 w-full items-end justify-center md:w-1/2 md:justify-start">
                            <div className="relative h-[95%] w-full md:h-[85%]">
                                <Image
                                    src="/images/apps/galaxia/movil-icons.webp"
                                    alt="Galaxia - Tienda de apps privada mostrando aplicaciones de comunicacion segura"
                                    fill
                                    className="object-contain object-bottom md:object-left-bottom"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
