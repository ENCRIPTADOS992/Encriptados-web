import Link from "next/link"
import Image from "next/image"

export function AppStoreButton() {
    return (
        <Link
            href="https://apps.apple.com/app/encriptados"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-90 transition-opacity"
        >
            <Image
                src="/images/modal-home/app-store.svg"
                alt="Descargar en App Store"
                width={162}
                height={48}
                className="h-9 lg:h-12 w-auto"
            />
        </Link>
    )
}

export function GooglePlayButton() {
    return (
        <Link
            href="https://play.google.com/store/apps/details?id=com.encriptados"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-90 transition-opacity"
        >
            <Image
                src="/images/modal-home/play-store.svg"
                alt="Disponible en Google Play"
                width={161}
                height={48}
                className="h-12 w-auto"
            />
        </Link>
    )
}

export function ApkButton() {
    return (
        <Link
            href="https://encriptados.io/apk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-90 transition-opacity"
        >
            <Image
                src="/images/modal-home/apv.svg"
                alt="Descargar APK"
                width={140}
                height={48}
                className="h-12 w-auto"
            />
        </Link>
    )
}
