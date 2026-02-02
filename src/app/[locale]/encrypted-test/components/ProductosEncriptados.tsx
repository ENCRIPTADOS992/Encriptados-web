"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function ProductosEncriptados() {
    const locale = useLocale();

    return (
        <section className="relative min-h-screen bg-black overflow-hidden py-20 px-4">
            {/* Background ellipses */}
            <div
                className="absolute top-0 -left-[5px] w-[600px] h-[600px] rounded-full blur-[200px] opacity-40"
                style={{ backgroundColor: "#00FFB3" }}
            />
            <div
                className="absolute top-0 -right-[5px] w-[600px] h-[600px] rounded-full blur-[200px] opacity-40"
                style={{ backgroundColor: "#10B4E7" }}
            />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-8">
                    <div className="relative p-[1px] rounded-full bg-gradient-to-l from-[#35CDFB] via-[#35CDFB] to-[#00FFB3]">
                        <div className="px-6 py-2 rounded-full bg-black">
                            <span
                                className="text-sm font-bold bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(270deg, #35CDFB 39%, #00FFB3 100%)" }}
                            >
                                Nuestros productos
                            </span>
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
                    Conoce nuestros
                    <br />
                    productos encriptados
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* SIM's Encriptadas */}
                    <Link
                        href={`/${locale}/sim-encriptada`}
                        className="rounded-2xl border border-[#2F2F2F] bg-[#0E0E0E] p-5 md:p-6 xl:p-8 flex items-center justify-between min-h-[180px] md:min-h-[220px] gap-2 md:gap-4 group hover:border-[#35CDFB] transition-colors block"
                    >
                        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight text-balance">
                            SIM's
                            <br />
                            Encriptadas
                        </h3>
                        <div className="relative flex items-center justify-center flex-shrink-0 w-[130px] md:w-[150px] xl:w-[226px] aspect-[226/187] bg-[#161616] rounded-[20px]">
                            <Image
                                src="/images/encrypted-test/images/sims-encriptadas.webp"
                                alt="SIM Card Encriptada"
                                fill
                                className="object-contain p-3 md:p-4"
                            />
                        </div>
                    </Link>

                    {/* Aplicaciones de mensajería segura */}
                    <Link
                        href={`/${locale}?selectedOption=38`}
                        className="rounded-2xl border border-[#2F2F2F] bg-[#0E0E0E] p-5 md:p-6 xl:p-8 flex items-center justify-between min-h-[180px] md:min-h-[220px] gap-2 md:gap-4 group hover:border-[#35CDFB] transition-colors block"
                    >
                        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight text-balance">
                            Aplicaciones de
                            <br />
                            mensajería
                            <br />
                            segura
                        </h3>
                        <div className="relative flex items-center justify-center flex-shrink-0 w-[130px] md:w-[150px] xl:w-[226px] aspect-[226/187] bg-[#161616] rounded-[20px]">
                            <Image
                                src="/images/encrypted-test/images/aplicaciones-mensajeria.webp"
                                alt="Aplicaciones de mensajería segura"
                                fill
                                className="object-contain p-3 md:p-4"
                            />
                        </div>
                    </Link>

                    {/* Sistemas de seguridad */}
                    <Link
                        href={`/${locale}?selectedOption=35`}
                        className="rounded-2xl border border-[#2F2F2F] bg-[#0E0E0E] p-5 md:p-6 xl:p-8 flex items-center justify-between min-h-[180px] md:min-h-[220px] gap-2 md:gap-4 group hover:border-[#35CDFB] transition-colors block"
                    >
                        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight text-balance">
                            Sistemas de
                            <br />
                            seguridad
                        </h3>
                        <div className="relative flex items-end justify-center flex-shrink-0 w-[130px] md:w-[150px] xl:w-[226px] aspect-[226/187] bg-[#161616] rounded-[20px]">
                            <Image
                                src="/images/encrypted-test/images/sistemas-de-seguridad.webp"
                                alt="Sistemas de seguridad"
                                fill
                                className="object-contain p-3 md:p-4"
                            />
                        </div>
                    </Link>

                    {/* Routers encriptados */}
                    <Link
                        href={`/${locale}?selectedOption=36`}
                        className="rounded-2xl border border-[#2F2F2F] bg-[#0E0E0E] p-5 md:p-6 xl:p-8 flex items-center justify-between min-h-[180px] md:min-h-[220px] gap-2 md:gap-4 group hover:border-[#35CDFB] transition-colors block"
                    >
                        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight text-balance">
                            Routers
                            <br />
                            encriptados
                        </h3>
                        <div className="relative flex items-end justify-center flex-shrink-0 w-[130px] md:w-[150px] xl:w-[226px] aspect-[226/187] bg-[#161616] rounded-[20px]">
                            <Image
                                src="/images/encrypted-test/images/routers-esncriptados.webp"
                                alt="Router encriptado"
                                fill
                                className="object-contain p-3 md:p-4"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}
