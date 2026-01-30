import React from "react"
import Image from "next/image"

const SimCardIcon = () => (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2.5 14.1667H4.16667V12.5H2.5V14.1667ZM2.5 10.8333H4.16667V7.5H2.5V10.8333ZM5.83333 14.1667H7.5V10.8333H5.83333V14.1667ZM5.83333 9.16667H7.5V7.5H5.83333V9.16667ZM9.16667 14.1667H10.8333V12.5H9.16667V14.1667ZM9.16667 10.8333H10.8333V7.5H9.16667V10.8333ZM1.66667 16.6667C1.20833 16.6667 0.815972 16.5035 0.489583 16.1771C0.163194 15.8507 0 15.4583 0 15V5L5 0H11.6667C12.125 0 12.5174 0.163194 12.8438 0.489583C13.1701 0.815972 13.3333 1.20833 13.3333 1.66667V15C13.3333 15.4583 13.1701 15.8507 12.8438 16.1771C12.5174 16.5035 12.125 16.6667 11.6667 16.6667H1.66667ZM1.66667 15H11.6667V1.66667H5.70833L1.66667 5.70833V15Z"
            fill="#6ADDFF"
        />
    </svg>
)

const RouterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.66667 15.8333C1.20833 15.8333 0.815972 15.6701 0.489583 15.3438C0.163194 15.0174 0 14.625 0 14.1667V10.8333C0 10.375 0.163194 9.98264 0.489583 9.65625C0.815972 9.32986 1.20833 9.16667 1.66667 9.16667H10V5.83333H11.6667V9.16667H13.3333C13.7917 9.16667 14.184 9.32986 14.5104 9.65625C14.8368 9.98264 15 10.375 15 10.8333V14.1667C15 14.625 14.8368 15.0174 14.5104 15.3438C14.184 15.6701 13.7917 15.8333 13.3333 15.8333H1.66667ZM1.66667 14.1667H13.3333V10.8333H1.66667V14.1667ZM3.33333 13.3333C3.56944 13.3333 3.76736 13.2535 3.92708 13.0938C4.08681 12.934 4.16667 12.7361 4.16667 12.5C4.16667 12.2639 4.08681 12.066 3.92708 11.9062C3.76736 11.7465 3.56944 11.6667 3.33333 11.6667C3.09722 11.6667 2.89931 11.7465 2.73958 11.9062C2.57986 12.066 2.5 12.2639 2.5 12.5C2.5 12.7361 2.57986 12.934 2.73958 13.0938C2.89931 13.2535 3.09722 13.3333 3.33333 13.3333ZM6.25 13.3333C6.48611 13.3333 6.68403 13.2535 6.84375 13.0938C7.00347 12.934 7.08333 12.7361 7.08333 12.5C7.08333 12.2639 7.00347 12.066 6.84375 11.9062C6.68403 11.7465 6.48611 11.6667 6.25 11.6667C6.01389 11.6667 5.81597 11.7465 5.65625 11.9062C5.49653 12.066 5.41667 12.2639 5.41667 12.5C5.41667 12.7361 5.49653 12.934 5.65625 13.0938C5.81597 13.2535 6.01389 13.3333 6.25 13.3333ZM9.16667 13.3333C9.40278 13.3333 9.60069 13.2535 9.76042 13.0938C9.92014 12.934 10 12.7361 10 12.5C10 12.2639 9.92014 12.066 9.76042 11.9062C9.60069 11.7465 9.40278 11.6667 9.16667 11.6667C8.93056 11.6667 8.73264 11.7465 8.57292 11.9062C8.41319 12.066 8.33333 12.2639 8.33333 12.5C8.33333 12.7361 8.41319 12.934 8.57292 13.0938C8.73264 13.2535 8.93056 13.3333 9.16667 13.3333ZM9.375 5.20833L8.16667 4C8.52778 3.66667 8.93056 3.40278 9.375 3.20833C9.81944 3.01389 10.3056 2.91667 10.8333 2.91667C11.3611 2.91667 11.8472 3.01389 12.2917 3.20833C12.7361 3.40278 13.1389 3.66667 13.5 4L12.2917 5.20833C12.0972 5.01389 11.8785 4.86111 11.6354 4.75C11.3924 4.63889 11.125 4.58333 10.8333 4.58333C10.5417 4.58333 10.2743 4.63889 10.0312 4.75C9.78819 4.86111 9.56944 5.01389 9.375 5.20833ZM7 2.83333L5.79167 1.625C6.43056 1.04167 7.15278 0.590278 7.95833 0.270833C8.76389 -0.0486111 9.625 -0.208333 10.5417 -0.208333C11.4583 -0.208333 12.3194 -0.0486111 13.125 0.270833C13.9306 0.590278 14.6528 1.04167 15.2917 1.625L14.0833 2.83333C13.5694 2.40278 13 2.06944 12.375 1.83333C11.75 1.59722 11.0833 1.47917 10.375 1.47917C9.66667 1.47917 9 1.59722 8.375 1.83333C7.75 2.06944 7.18056 2.40278 6.66667 2.83333H7Z"
            fill="#6ADDFF"
        />
    </svg>
)

const GlobeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_8245_16365)">
            <path d="M9.99984 18.3337C14.6022 18.3337 18.3332 14.6027 18.3332 10.0003C18.3332 5.39795 14.6022 1.66699 9.99984 1.66699C5.39746 1.66699 1.6665 5.39795 1.6665 10.0003C1.6665 14.6027 5.39746 18.3337 9.99984 18.3337Z" stroke="#6ADDFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.99984 1.66699C7.86003 3.91379 6.6665 6.89761 6.6665 10.0003C6.6665 13.103 7.86003 16.0869 9.99984 18.3337C12.1396 16.0869 13.3332 13.103 13.3332 10.0003C13.3332 6.89761 12.1396 3.91379 9.99984 1.66699Z" stroke="#6ADDFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.6665 10H18.3332" stroke="#6ADDFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_8245_16365">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

const SecurityIcon = () => (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.66667 16.6667C4.73611 16.1806 3.14236 15.0729 1.88542 13.3438C0.628472 11.6146 0 9.69444 0 7.58333V2.5L6.66667 0L13.3333 2.5V7.58333C13.3333 9.69444 12.7049 11.6146 11.4479 13.3438C10.191 15.0729 8.59722 16.1806 6.66667 16.6667ZM6.66667 14.9167C8.01389 14.5 9.13889 13.6771 10.0417 12.4479C10.9444 11.2188 11.4722 9.84722 11.625 8.33333H6.66667V1.77083L1.66667 3.64583V7.95833C1.66667 8.05556 1.68056 8.18056 1.70833 8.33333H6.66667V14.9167Z"
            fill="#6ADDFF"
        />
    </svg>
)

interface FeatureItemProps {
    icon: React.ReactNode
    title: string
    subtitle: string
}

function FeatureItem({ icon, title, subtitle }: FeatureItemProps) {
    return (
        <div className="flex items-center gap-3 py-1">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{icon}</div>
            <div className="flex flex-col">
                <span className="text-white text-xs font-medium">{title}</span>
                <span className="text-[#9CA3AF] text-[10px]">{subtitle}</span>
            </div>
        </div>
    )
}

export default function RouterCamaleon() {
    return (
        <section className="w-full bg-white">
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 py-1">
                <div
                    className="relative w-full overflow-hidden rounded-[24px]"
                    style={{
                        height: "420px",
                        background: "linear-gradient(to right, #0a0f1a, #0d1829)",
                    }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/router/fondo.webp"
                            alt=""
                            fill
                            className="object-cover object-right"
                            priority
                        />
                    </div>

                    {/* Cyan glow behind router */}
                    <div
                        className="absolute right-[15%] bottom-0 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[120px] opacity-40"
                        style={{
                            background: "#35CDFB",
                        }}
                    />

                    <div className="relative z-10 h-full flex flex-col lg:flex-row items-center lg:items-center justify-between px-6 lg:px-12">
                        {/* Left Card */}
                        <div
                            className="w-full max-w-sm xl:max-w-[420px] rounded-[32px] p-5 lg:p-6 flex-shrink-0 my-10 lg:my-10"
                            style={{
                                background: "rgba(13, 24, 41, 0.7)",
                                border: "1px solid rgba(54, 65, 83, 0.5)",
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            <h2 className="text-white text-lg font-bold mb-1">Router Camaleón te da más</h2>
                            <p className="text-[#9CA3AF] text-xs mb-2">Incluye todo para ti:</p>

                            <div className="flex flex-col gap-0.5">
                                <FeatureItem
                                    icon={<SimCardIcon />}
                                    title="SIM Encriptada"
                                    subtitle="470 USD en datos"
                                />
                                <FeatureItem icon={<RouterIcon />} title="Router Camaleón" subtitle="470 USD en datos" />
                                <FeatureItem icon={<GlobeIcon />} title="Cobertura Global" subtitle="Disponible en 200 países" />
                                <FeatureItem icon={<SecurityIcon />} title="VPN Privado" subtitle="130 USD" />
                            </div>

                            <div
                                className="mt-2 pt-3"
                                style={{
                                    borderTop: "1px solid rgba(54, 65, 83, 0.5)",
                                }}
                            >
                                <p className="text-white font-bold text-base">
                                    Total: <span className="text-white">750 USD</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Router Image - Stick to bottom */}
                        <div className="relative w-full h-[300px] lg:h-full lg:flex-1 flex items-end justify-center lg:justify-end overflow-visible">
                            <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] lg:w-[450px] lg:h-[520px] lg:absolute lg:right-[-40px] xl:right-0 lg:bottom-[-20px]">
                                <Image
                                    src="/images/router/router.webp"
                                    alt="Router Camaleón"
                                    fill
                                    className="object-contain object-bottom"
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
