import Image from "next/image";
import { Grip } from "lucide-react";
import TelegramButton from "@/shared/components/TelegramButton";

export default function CustomizeAppCatalog() {
    return (
        <section className="w-full bg-white my-0 sm:my-12">
            <div className="w-full max-w-screen-xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 py-1">
                <div className="relative w-full overflow-hidden mx-auto aspect-[4/5] sm:aspect-square lg:aspect-[1272/541] rounded-none sm:rounded-[44px] bg-black text-white flex flex-col lg:flex-row">

                    {/* Image Container - Background on Mobile/Tablet, Right side on Desktop */}
                    <div className="absolute inset-0 z-0 lg:relative lg:order-2 lg:w-1/2 lg:inset-auto">
                        <Image
                            src="/images/apps/galaxia/fondo-componente-catalogo.webp"
                            alt="Personaliza tu catálogo de aplicaciones"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        {/* Overlay for Mobile/Tablet only */}
                        <div className="absolute inset-0 bg-black/70 lg:hidden" />
                    </div>

                    {/* Content Container - Centered overlay on Mobile/Tablet, Left side on Desktop */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-8 py-12 h-full lg:w-1/2 lg:items-start lg:text-left lg:pl-16 lg:pr-12 lg:order-1">
                        {/* Icon */}
                        <div className="mb-6">
                            <Grip className="w-12 h-12 text-[#33C4F2]" />
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6 text-balance max-w-xl mx-auto lg:mx-0">
                            Personaliza tu catálogo<br /> de aplicaciones
                        </h2>

                        {/* Description */}
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg lg:max-w-none">
                            Si adquieres más de 10 licencias, puedes personalizar el catalogo de Apps dentro de Galaxia.
                        </p>

                        {/* Button */}
                        <div>
                            <TelegramButton className="!bg-[#33C4F2] hover:!bg-[#2aa9d1] !px-8 !py-3 !text-base !font-bold rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
