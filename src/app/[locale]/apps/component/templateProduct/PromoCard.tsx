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
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-5 sm:p-6 lg:p-10">
        <h2 className="text-sm md:text-base lg:text-xl xl:text-2xl font-bold text-white leading-tight text-balance max-w-[65%] sm:max-w-[55%]">
          {title}
        </h2>
        <p className="mt-1 sm:mt-2 text-[10px] md:text-xs lg:text-sm text-gray-300 leading-relaxed max-w-[60%] sm:max-w-[55%]">
          {description}
        </p>
        <div className="mt-1.5 sm:mt-3">
          <Link
            href={buttonHref}
            className="inline-block bg-[#10b4e7] hover:bg-[#0ea5d4] text-white font-semibold text-[9px] md:text-xs lg:text-sm px-2.5 sm:px-4 lg:px-5 py-1 sm:py-2 lg:py-2.5 rounded transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}
