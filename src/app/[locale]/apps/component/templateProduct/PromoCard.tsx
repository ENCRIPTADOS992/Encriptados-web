import Image from "next/image"
import Link from "next/link"

interface PromoCardProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  backgroundImage: string
  backgroundAlt: string
}

export function PromoCard({
  title,
  description,
  buttonText,
  buttonHref,
  backgroundImage,
  backgroundAlt,
}: PromoCardProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-[596/240]">
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        className="object-cover object-right-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      <div className="absolute inset-0 z-10 flex flex-col p-3 sm:p-6 md:p-4 lg:p-5 xl:p-6 h-full">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-sm sm:text-xl md:text-sm lg:text-lg xl:text-2xl font-bold text-white leading-tight text-balance max-w-[65%] sm:max-w-[60%] md:max-w-[70%]">
            {title}
          </h2>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-base md:text-[10px] lg:text-xs xl:text-sm text-gray-300 leading-relaxed max-w-[60%] sm:max-w-[60%] md:max-w-[65%]">
            {description}
          </p>
        </div>
        <div className="mt-auto pt-2 sm:pt-4 md:pt-2 lg:pt-3 xl:pt-4">
          <Link
            href={buttonHref}
            className="inline-block bg-[#10b4e7] hover:bg-[#0ea5d4] text-black font-semibold text-[9px] sm:text-sm md:text-[9px] lg:text-xs xl:text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-lg transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}
