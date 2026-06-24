"use client"

import {
    CircleUser,
    Key,
    Languages,
    MessageCircleMore,
    Store,
    Wallet,
    X
} from "lucide-react"
import Image from "next/image"
import { AppStoreButton, GooglePlayButton, ApkButton } from "./StoreButtons"
import { useLocale, useTranslations } from "next-intl"
import { getDownloadAppCopy } from "./downloadAppCopy"

interface DownloadAppModalProps {
    isOpen: boolean
    onClose: () => void
}

export function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
    const locale = useLocale()
    const t = useTranslations("SharedUi.downloadApp")
    if (!isOpen) return null
    const copy = getDownloadAppCopy(locale, t)

    const featureIconContainerClass = "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(180deg,#003240_0%,#001B24_100%)] text-[#35CDFB]"
    const featureIconClass = "h-4 w-4"

    const features = [
        { icon: CircleUser, label: copy.features.anonymousSignup },
        { icon: Store, label: copy.features.fastPurchases },
        { icon: Key, label: copy.features.instantLicenses },
        { icon: Wallet, label: copy.features.balanceAndSims },
        { icon: MessageCircleMore, label: copy.features.appActivations },
        { icon: Languages, label: copy.features.multilingualSupport }
    ]

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:items-center"
            onClick={onClose}
        >
            <div
                className="relative my-auto w-full max-w-[340px] flex-shrink-0 overflow-hidden rounded-[24px] bg-[#141414] text-white shadow-[0_28px_90px_rgba(0,0,0,0.52)] sm:h-[631px] sm:max-w-[470px] sm:rounded-[20px] lg:h-[460px] lg:max-w-[874px] lg:rounded-[24px] lg:[font-family:var(--font-inter)]"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src="/images/modal-home/fondo.webp"
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 874px, (min-width: 768px) 780px, (min-width: 640px) 420px, 320px"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(25,181,255,0.16),transparent_28%),linear-gradient(180deg,rgba(6,10,24,0)_28%,rgba(20,20,20,0.88)_54%,#181818_100%)] sm:hidden" />

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 text-white/60 transition-colors hover:text-white sm:right-5 sm:top-5 lg:right-6 lg:top-6"
                    aria-label={copy.closeModal}
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="relative z-10 hidden h-full lg:block">
                    <div className="flex h-full items-center px-14 pb-9 pt-10">
                        <div className="flex flex-col justify-center py-2">
                            <h2 className="max-w-[282px] text-[25px] font-bold leading-[1.08] tracking-[0] text-white">
                                <span className="block">{copy.titleLine1}</span>
                                <span className="block">{copy.titleLine2}</span>
                            </h2>

                            <ul className="mt-5 max-w-[282px] space-y-3.5">
                                {features.map(({ icon: Icon, label }) => (
                                    <li key={label} className="flex items-center gap-3 text-[13px] font-light leading-[1.02] text-[#FFFFFFCC]">
                                        <span className={featureIconContainerClass}>
                                            <Icon className={featureIconClass} />
                                        </span>
                                        <span>{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[468px]">
                        <Image
                            src="/images/modal-home/celulares.webp"
                            alt={copy.appAlt}
                            width={1080}
                            height={1040}
                            sizes="468px"
                            className="h-auto w-full"
                        />
                    </div>

                    <div className="absolute bottom-6 right-4 z-10 w-[332px] rounded-[24px] shadow-[0_18px_42px_rgba(0,0,0,0.38)]">
                        <div className="rounded-[24px] bg-[#00000066] p-4 backdrop-blur-[74px]">
                            <div
                                className="pointer-events-none absolute inset-0 rounded-[24px] p-[2px]"
                                style={{
                                    background: "linear-gradient(180deg, #2E2E2E 0%, #212121 100%)",
                                    WebkitMask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMaskComposite: "xor",
                                    maskComposite: "exclude"
                                }}
                            />
                            <div className="relative flex items-center gap-3">
                            <div className="shrink-0">
                                <div className="rounded-[18px] bg-white p-3">
                                    <Image
                                        src="/images/modal-home/qr.webp"
                                        alt={copy.qrAlt}
                                        width={146}
                                        height={146}
                                        className="h-auto w-[120px] rounded-[10px]"
                                    />
                                </div>
                                <p className="mt-2 text-center text-[14px] font-normal leading-none text-white/90">
                                    {copy.qrLabel}
                                </p>
                            </div>

                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                    <AppStoreButton className="w-full" imageClassName="h-[42px] w-[146px] object-contain" />
                                    <GooglePlayButton className="w-full" imageClassName="h-[42px] w-[146px] object-contain" />
                                    <ApkButton className="w-full" imageClassName="h-[42px] w-[146px] object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 hidden h-full sm:flex lg:hidden flex-col">
                    <div className="relative h-[240px] overflow-hidden rounded-t-[20px] px-4 pt-4">
                        <div className="absolute left-2 top-0 w-[272px] md:left-3 md:-top-1 md:w-[292px]">
                            <Image
                                src="/images/modal-home/celulares.webp"
                                alt={copy.appAlt}
                                width={1080}
                                height={1040}
                                sizes="292px"
                                className="h-auto w-full"
                            />
                        </div>

                        <div className="absolute right-6 top-4 w-[142px] rounded-[20px] bg-[linear-gradient(180deg,rgba(44,44,44,0.24)_0%,rgba(146,146,146,0.24)_100%)] p-3 shadow-[0_12px_34px_rgba(0,0,0,0.3)] backdrop-blur-xl md:right-6 md:top-4 md:w-[148px]">
                            <div className="rounded-[16px] bg-white p-2.5">
                                <Image
                                    src="/images/modal-home/qr.webp"
                                    alt={copy.qrAlt}
                                    width={148}
                                    height={148}
                                    className="h-auto w-full rounded-[10px]"
                                />
                            </div>
                            <p className="mt-1.5 text-center text-[13px] font-normal leading-none text-white/90">{copy.qrLabel}</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-[linear-gradient(180deg,#111111_43.75%,#2A2A2A_100%)] px-6 pb-6 pt-5 md:px-7 md:pt-6">
                        <div className="mx-auto w-full max-w-[378px]">
                            <h2 className="text-center text-[22px] font-bold leading-[1.08] tracking-[0] text-white md:text-[24px]">
                                <span className="block">{copy.titleLine1}</span>
                                <span className="block">{copy.titleLine2}</span>
                            </h2>

                            <ul className="mt-5 space-y-2.5">
                                {features.map(({ icon: Icon, label }) => (
                                    <li key={label} className="flex items-center gap-3.5 text-[14px] font-light leading-[1.12] text-[#FFFFFFCC] md:text-[15px]">
                                        <span className={featureIconContainerClass}>
                                            <Icon className={featureIconClass} />
                                        </span>
                                        <span>{label}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex flex-nowrap items-center justify-center gap-3">
                                <AppStoreButton imageClassName="h-10 w-[122px] object-contain md:h-11 md:w-[132px]" />
                                <GooglePlayButton imageClassName="h-10 w-[122px] object-contain md:h-11 md:w-[132px]" />
                                <ApkButton imageClassName="h-10 w-[122px] object-contain md:h-11 md:w-[132px]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex sm:hidden h-full flex-col pt-0">
                    <div className="relative h-[226px] overflow-hidden rounded-t-[24px] px-2 pt-2">
                        <div className="absolute inset-x-0 top-0 flex justify-center">
                            <div className="w-[292px]">
                                <Image
                                    src="/images/modal-home/celulares.webp"
                                    alt={copy.appAlt}
                                    width={1080}
                                    height={1040}
                                    sizes="292px"
                                    className="h-auto w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-[linear-gradient(180deg,#111111_0%,#2A2A2A_100%)] px-5 pb-5 pt-5">
                        <div className="mx-auto w-full max-w-[300px]">
                            <h2 className="text-center text-[18px] font-bold leading-[1.06] tracking-[0] text-white">
                                <span className="block">{copy.titleLine1}</span>
                                <span className="block">{copy.titleLine2}</span>
                            </h2>

                            <ul className="mt-5 space-y-3">
                                {features.map(({ icon: Icon, label }) => (
                                    <li key={label} className="flex items-center gap-3 text-[13px] font-light leading-[1.1] text-[#FFFFFFCC]">
                                        <span className={featureIconContainerClass}>
                                            <Icon className={featureIconClass} />
                                        </span>
                                        <span>{label}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-5 rounded-[22px] bg-[#00000040] p-3.5 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="shrink-0">
                                        <div className="rounded-[16px] bg-white p-2.5">
                                            <Image
                                                src="/images/modal-home/qr.webp"
                                                alt={copy.qrAlt}
                                                width={120}
                                                height={120}
                                                className="h-auto w-[100px] rounded-[10px]"
                                            />
                                        </div>
                                        <p className="mt-2 text-center text-[13px] font-normal leading-none text-white/90">{copy.qrLabel}</p>
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                                        <AppStoreButton imageClassName="h-[40px] w-[126px] object-contain" />
                                        <GooglePlayButton imageClassName="h-[40px] w-[126px] object-contain" />
                                        <ApkButton imageClassName="h-[40px] w-[126px] object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
