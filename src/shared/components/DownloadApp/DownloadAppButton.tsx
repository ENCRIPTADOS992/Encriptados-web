"use client"

import { CircleArrowDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface DownloadAppButtonProps {
    onClick: () => void
}

export function DownloadAppButton({ onClick }: DownloadAppButtonProps) {
    const [hasScrolled, setHasScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Consideramos que el usuario ha hecho scroll si baja más de 50px
            setHasScrolled(window.scrollY > 50)
        }

        // Verificar estado inicial
        handleScroll()

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <button
            onClick={onClick}
            style={{
                top: hasScrolled ? '12px' : undefined
            }}
            className={`fixed right-4 z-[90] flex items-center gap-[18px] w-[260px] h-[102px] p-4 rounded-[14px] bg-[#141414] border border-[#212121] hover:bg-[#1a1a1a] cursor-pointer shadow-lg scale-75 origin-top-right md:scale-100 transition-all duration-300 ease-in-out ${
                hasScrolled ? '' : 'top-[70px] md:top-[100px]'
            }`}
        >
            <Image
                src="/images/modal-home/qr.webp"
                alt="QR Code para descargar la App Encriptados"
                width={70}
                height={70}
                className="rounded-lg"
            />
            <div className="flex flex-col flex-1">
                <div className="flex justify-start w-full mb-1">
                    <CircleArrowDown className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-white text-sm font-normal leading-tight">Descarga la</span>
                    <span className="text-white text-sm font-normal leading-tight">App Encriptados</span>
                </div>
            </div>
        </button>
    )
}
