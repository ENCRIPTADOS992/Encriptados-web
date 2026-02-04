"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { AppStoreButton, GooglePlayButton, ApkButton } from "./StoreButtons"

interface DownloadAppModalProps {
    isOpen: boolean
    onClose: () => void
}

export function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            {/* Desktop Modal (lg and up) */}
            <div
                className="hidden lg:flex relative w-full max-w-[628px] flex-col items-center rounded-[20px] p-8"
                style={{
                    background: "linear-gradient(180deg, #111111 43.75%, #2A2A2A 100%)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Title */}
                <h2 className="text-white text-xl font-light text-center leading-tight mb-16 mt-4">
                    <span className="font-light">Escanea este QR y</span> <span className="font-bold">descarga</span>
                    <br />
                    <span className="font-bold">la App Encriptados</span>
                </h2>

                {/* QR and Phone Container */}
                <div
                    className="w-full max-w-[538px] h-[207px] rounded-[20px] flex items-center px-6 mb-8 overflow-visible relative"
                    style={{
                        background: "linear-gradient(270deg, #090909 35.58%, #292929 100%)"
                    }}
                >
                    {/* QR Code */}
                    <div className="bg-white p-3 rounded-lg shrink-0 z-10">
                        <Image
                            src="/images/modal-home/qr.webp"
                            alt="QR Code para descargar la App Encriptados"
                            width={130}
                            height={130}
                            className="rounded"
                        />
                    </div>

                    {/* Phone Image - positioned at bottom right, overflowing top */}
                    <div className="absolute right-12 bottom-0 h-[250px]">
                        <Image
                            src="/images/modal-home/celular-escritorio.webp"
                            alt="App Encriptados"
                            width={280}
                            height={300}
                            className="object-contain object-bottom h-full w-auto"
                        />
                    </div>
                </div>

                {/* Store Buttons */}
                <div className="flex items-center justify-center gap-3">
                    <AppStoreButton />
                    <GooglePlayButton />
                    <ApkButton />
                </div>
            </div>

            {/* Mobile/Tablet Modal (below lg) */}
            <div
                className="flex lg:hidden relative w-full max-w-[400px] flex-col items-center rounded-[20px] pt-6 px-6 pb-0 overflow-hidden"
                style={{
                    background: "linear-gradient(180deg, #111111 43.75%, #2A2A2A 100%)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Title */}
                <h2 className="text-white text-lg font-light text-center leading-tight mb-6 mt-2">
                    <span className="font-light">Escanea este QR y</span> <span className="font-bold">descarga</span>
                    <br />
                    <span className="font-bold">la App Encriptados</span>
                </h2>

                {/* Store Buttons - First on mobile */}
                <div className="flex flex-nowrap items-center justify-center gap-2 mb-8 w-full">
                    <AppStoreButton />
                    <GooglePlayButton />
                    <ApkButton />
                </div>

                {/* QR on Phone Image Container */}
                <div className="w-full mt-auto">
                    <Image
                        src="/images/modal-home/qr -celular-misma-imagen-movil.webp"
                        alt="QR Code en celular"
                        width={400}
                        height={450}
                        className="w-full h-auto object-contain translate-y-2"
                    />
                </div>
            </div>
        </div>
    )
}
