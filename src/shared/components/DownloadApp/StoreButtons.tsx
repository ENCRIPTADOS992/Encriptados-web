import Link from "next/link"
import Image from "next/image"

interface StoreButtonProps {
    className?: string
    imageClassName?: string
}

export function AppStoreButton({ className, imageClassName }: StoreButtonProps) {
    return (
        <Link
            href="https://apps.apple.com/co/app/encriptados/id6661017242"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block hover:opacity-90 transition-opacity ${className ?? ""}`.trim()}
        >
            <Image
                src="/images/modal-home/app-store.svg"
                alt="Descargar en App Store"
                width={162}
                height={48}
                className={`h-9 md:h-10 lg:h-12 w-auto ${imageClassName ?? ""}`.trim()}
            />
        </Link>
    )
}

export function GooglePlayButton({ className, imageClassName }: StoreButtonProps) {
    return (
        <Link
            href="https://play.google.com/store/apps/details?id=io.encriptados.app&hl=es_CO"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block hover:opacity-90 transition-opacity ${className ?? ""}`.trim()}
        >
            <Image
                src="/images/modal-home/play-store.svg"
                alt="Disponible en Google Play"
                width={161}
                height={48}
                className={`h-10 md:h-11 lg:h-12 w-auto ${imageClassName ?? ""}`.trim()}
            />
        </Link>
    )
}

export function ApkButton({ className, imageClassName }: StoreButtonProps) {
    return (
        <Link
            href="https://apk.encriptados.io/Encriptados.apk"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block hover:opacity-90 transition-opacity ${className ?? ""}`.trim()}
        >
            <Image
                src="/images/modal-home/apv.svg"
                alt="Descargar APK"
                width={140}
                height={48}
                className={`h-9 md:h-10 lg:h-11 w-auto ${imageClassName ?? ""}`.trim()}
            />
        </Link>
    )
}
