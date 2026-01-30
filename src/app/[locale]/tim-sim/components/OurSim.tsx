"use client";
import React from "react";
import { useTranslations } from "next-intl";

const AntennaIcon = ({ className }: { className?: string }) => (
  <svg
    width="54"
    height="51"
    viewBox="0 0 54 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.73333 37.8667C5.2 35.2 3.27778 32.2444 1.96667 29C0.655556 25.7556 0 22.4 0 18.9333C0 15.4667 0.655556 12.1111 1.96667 8.86667C3.27778 5.62222 5.2 2.66667 7.73333 0L10.9333 3.2C8.8 5.33333 7.2 7.78889 6.13333 10.5667C5.06667 13.3444 4.53333 16.1333 4.53333 18.9333C4.53333 21.7333 5.06667 24.5222 6.13333 27.3C7.2 30.0778 8.8 32.5333 10.9333 34.6667L7.73333 37.8667ZM14.1333 31.4667C12.4 29.7333 11.0778 27.7778 10.1667 25.6C9.25556 23.4222 8.8 21.2 8.8 18.9333C8.8 16.6667 9.25556 14.4444 10.1667 12.2667C11.0778 10.0889 12.4 8.13333 14.1333 6.4L17.3333 9.6C16 10.8 15 12.2222 14.3333 13.8667C13.6667 15.5111 13.3333 17.2 13.3333 18.9333C13.3333 20.5333 13.6667 22.1556 14.3333 23.8C15 25.4444 16 26.9333 17.3333 28.2667L14.1333 31.4667ZM13.3333 50.9333L22.3333 23.9333C21.6222 23.3111 21.0556 22.5778 20.6333 21.7333C20.2111 20.8889 20 19.9556 20 18.9333C20 17.0667 20.6444 15.4889 21.9333 14.2C23.2222 12.9111 24.8 12.2667 26.6667 12.2667C28.5333 12.2667 30.1111 12.9111 31.4 14.2C32.6889 15.4889 33.3333 17.0667 33.3333 18.9333C33.3333 19.9556 33.1222 20.8889 32.7 21.7333C32.2778 22.5778 31.7111 23.3111 31 23.9333L40 50.9333H34.6667L32.9333 45.6H20.4667L18.6667 50.9333H13.3333ZM22.2 40.2667H31.1333L26.6667 26.9333L22.2 40.2667ZM39.2 31.4667L36 28.2667C37.3333 27.0667 38.3333 25.6444 39 24C39.6667 22.3556 40 20.6667 40 18.9333C40 17.3333 39.6667 15.7111 39 14.0667C38.3333 12.4222 37.3333 10.9333 36 9.6L39.2 6.4C40.9333 8.13333 42.2222 10.0889 43.0667 12.2667C43.9111 14.4444 44.4 16.6667 44.5333 18.9333C44.5333 21.2 44.0778 23.4222 43.1667 25.6C42.2556 27.7778 40.9333 29.7333 39.2 31.4667ZM45.6 37.8667L42.4 34.6667C44.5333 32.5333 46.1333 30.0778 47.2 27.3C48.2667 24.5222 48.8 21.7333 48.8 18.9333C48.8 16.1333 48.2667 13.3444 47.2 10.5667C46.1333 7.78889 44.5333 5.33333 42.4 3.2L45.6 0C48.1333 2.66667 50.0556 5.62222 51.3667 8.86667C52.6778 12.1111 53.3333 15.4667 53.3333 18.9333C53.3333 22.4 52.7111 25.7556 51.4667 29C50.2222 32.2444 48.2667 35.2 45.6 37.8667Z"
      fill="currentColor"
    />
  </svg>
)

const ClickIcon = ({ className }: { className?: string }) => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M25.8667 42.6667C21.6 42.4444 18 40.8 15.0667 37.7333C12.1333 34.6667 10.6667 30.9778 10.6667 26.6667C10.6667 22.2222 12.2222 18.4444 15.3333 15.3333C18.4444 12.2222 22.2222 10.6667 26.6667 10.6667C30.9778 10.6667 34.6667 12.1333 37.7333 15.0667C40.8 18 42.4444 21.6 42.6667 25.8667L37.0667 24.2C36.4889 21.8 35.2444 19.8333 33.3333 18.3C31.4222 16.7667 29.2 16 26.6667 16C23.7333 16 21.2222 17.0444 19.1333 19.1333C17.0444 21.2222 16 23.7333 16 26.6667C16 29.2 16.7667 31.4222 18.3 33.3333C19.8333 35.2444 21.8 36.4889 24.2 37.0667L25.8667 42.6667ZM29.0667 53.2C28.6667 53.2889 28.2667 53.3333 27.8667 53.3333H26.6667C22.9778 53.3333 19.5111 52.6333 16.2667 51.2333C13.0222 49.8333 10.2 47.9333 7.8 45.5333C5.4 43.1333 3.5 40.3111 2.1 37.0667C0.7 33.8222 0 30.3556 0 26.6667C0 22.9778 0.7 19.5111 2.1 16.2667C3.5 13.0222 5.4 10.2 7.8 7.8C10.2 5.4 13.0222 3.5 16.2667 2.1C19.5111 0.7 22.9778 0 26.6667 0C30.3556 0 33.8222 0.7 37.0667 2.1C40.3111 3.5 43.1333 5.4 45.5333 7.8C47.9333 10.2 49.8333 13.0222 51.2333 16.2667C52.6333 19.5111 53.3333 22.9778 53.3333 26.6667V27.8667C53.3333 28.2667 53.2889 28.6667 53.2 29.0667L48 27.4667V26.6667C48 20.7111 45.9333 15.6667 41.8 11.5333C37.6667 7.4 32.6222 5.33333 26.6667 5.33333C20.7111 5.33333 15.6667 7.4 11.5333 11.5333C7.4 15.6667 5.33333 20.7111 5.33333 26.6667C5.33333 32.6222 7.4 37.6667 11.5333 41.8C15.6667 45.9333 20.7111 48 26.6667 48H27.4667L29.0667 53.2ZM49.4 54.6667L38 43.2667L34.6667 53.3333L26.6667 26.6667L53.3333 34.6667L43.2667 38L54.6667 49.4L49.4 54.6667Z"
      fill="currentColor"
    />
  </svg>
)

const PlansIcon = ({ className }: { className?: string }) => (
  <svg
    width="48"
    height="56"
    viewBox="0 0 48 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M26.6667 55.8667V50.4C28.1778 50.1778 29.6556 49.7778 31.1 49.2C32.5444 48.6222 33.9111 47.8667 35.2 46.9333L38.9333 50.8C37.0667 52.2222 35.1111 53.3667 33.0667 54.2333C31.0222 55.1 28.8889 55.6444 26.6667 55.8667ZM21.3333 55.8667C15.2 55.0667 10.1111 52.4111 6.06667 47.9C2.02222 43.3889 0 38.0889 0 32C0 28.6667 0.633333 25.5444 1.9 22.6333C3.16667 19.7222 4.87778 17.1889 7.03333 15.0333C9.18889 12.8778 11.7222 11.1667 14.6333 9.9C17.5444 8.63333 20.6667 8 24 8H24.4L20.2667 3.86667L24 0L34.6667 10.6667L24 21.3333L20.2667 17.6L24.5333 13.3333H24C18.8 13.3333 14.3889 15.1444 10.7667 18.7667C7.14444 22.3889 5.33333 26.8 5.33333 32C5.33333 36.6222 6.84444 40.6778 9.86667 44.1667C12.8889 47.6556 16.7111 49.7333 21.3333 50.4V55.8667ZM42.8 46.9333L38.9333 43.2C39.8667 41.9111 40.6222 40.5444 41.2 39.1C41.7778 37.6556 42.1778 36.1778 42.4 34.6667H47.8667C47.6444 36.8889 47.1 39.0222 46.2333 41.0667C45.3667 43.1111 44.2222 45.0667 42.8 46.9333ZM47.8667 29.3333H42.4C42.1778 27.8222 41.7778 26.3444 41.2 24.9C40.6222 23.4556 39.8667 22.0889 38.9333 20.8L42.8 17.0667C44.2222 18.8 45.3556 20.7111 46.2 22.8C47.0444 24.8889 47.6 27.0667 47.8667 29.3333Z"
      fill="currentColor"
    />
  </svg>
)

const ActivationIcon = ({ className }: { className?: string }) => (
  <svg
    width="43"
    height="54"
    viewBox="0 0 43 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 45.3333H13.3333V40H8V45.3333ZM8 34.6667H13.3333V24H8V34.6667ZM18.6667 45.3333H24V34.6667H18.6667V45.3333ZM18.6667 29.3333H24V24H18.6667V29.3333ZM29.3333 45.3333H34.6667V40H29.3333V45.3333ZM29.3333 34.6667H34.6667V24H29.3333V34.6667ZM5.33333 53.3333C3.86667 53.3333 2.61111 52.8111 1.56667 51.7667C0.522222 50.7222 0 49.4667 0 48V16L16 0H37.3333C38.8 0 40.0556 0.522222 41.1 1.56667C42.1444 2.61111 42.6667 3.86667 42.6667 5.33333V48C42.6667 49.4667 42.1444 50.7222 41.1 51.7667C40.0556 52.8111 38.8 53.3333 37.3333 53.3333H5.33333ZM5.33333 48H37.3333V5.33333H18.2667L5.33333 18.2667V48Z"
      fill="currentColor"
    />
  </svg>
)

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  variant: "dark" | "light"
  radiusClass?: string
}

function FeatureCard({ icon, title, description, variant, radiusClass = "rounded-[34px]" }: FeatureCardProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={`flex h-full flex-col items-start justify-center ${radiusClass} p-6 shadow-xl ${isDark ? "text-white" : "text-[#1C1B1F]"
        }`}
      style={{
        background: isDark
          ? "linear-gradient(180deg, #010101 63%, #019EFF 100%)"
          : "linear-gradient(180deg, #009DFF 50%, #C0E5FC 90%)",
      }}
    >
      <div className={`mb-4 ${isDark ? "text-[#009DFF]" : "text-[#1C1B1F]"}`}>{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className={`text-sm ${isDark ? "text-white/90" : "text-[#1C1B1F]/80"}`}>{description}</p>
    </div>
  )
}

const OurSim: React.FC = () => {
  const t = useTranslations("BneSimPage");

  const features = [
    {
      icon: <AntennaIcon className="h-12 w-12" />,
      title: t('OurSimCard.title'),
      description: t('OurSimCard.description'),
      variant: "dark" as const,
    },
    {
      icon: <ClickIcon className="h-12 w-12" />,
      title: t('OurSimCard.title2'),
      description: t('OurSimCard.description2'),
      variant: "light" as const,
    },
    {
      icon: <PlansIcon className="h-12 w-12" />,
      title: t('OurSimCard.title3'),
      description: t('OurSimCard.description3'),
      variant: "light" as const,
    },
    {
      icon: <ActivationIcon className="h-12 w-12" />,
      title: t('OurSimCard.title4'),
      description: t('OurSimCard.description4'),
      variant: "dark" as const,
    },
  ]

  // Estilos fijos para móvil y escritorio
  const cardStyle = { width: "306px", height: "390px" };
  // Estilos fijos para tablet (solicitados)
  const tabletCardStyle = { width: "352px", height: "281px" };

  return (
    <section className="bg-[#EBF5FA] px-4 py-12 md:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Desktop layout (>= 1370px) */}
        <div className="hidden desktop:flex desktop:items-center desktop:justify-between desktop:gap-8">
          {/* Text on the left */}
          <div className="max-w-md shrink-0">
            <h2 className="mb-4 text-4xl font-bold text-[#1C1B1F]">{t("whyChooseSim")}</h2>
            <p className="mb-4 text-lg text-[#1C1B1F]">{t("anonTitle")}</p>
            <p className="text-base text-[#1C1B1F]/80">
              {t("anonDescription")}
            </p>
          </div>

          {/* Cards grid on the right - staggered layout */}
          <div className="flex justify-center gap-6">
            {/* Left column */}
            <div className="flex flex-col gap-6">
              <div style={cardStyle}>
                <FeatureCard {...features[0]} />
              </div>
              <div style={cardStyle}>
                <FeatureCard {...features[2]} />
              </div>
            </div>
            {/* Right column - offset down */}
            <div className="flex flex-col gap-6 pt-24">
              <div style={cardStyle}>
                <FeatureCard {...features[1]} />
              </div>
              <div style={cardStyle}>
                <FeatureCard {...features[3]} />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet layout (801px - 1369px) */}
        <div className="hidden tablet:block">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1C1B1F]">{t("whyChooseSim")}</h2>
            <p className="mx-auto max-w-2xl text-base text-[#1C1B1F]">
              {t("anonTitle")} {t("anonDescription")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div style={tabletCardStyle}>
              <FeatureCard {...features[0]} radiusClass="rounded-[24px]" />
            </div>
            <div style={tabletCardStyle}>
              <FeatureCard {...features[1]} radiusClass="rounded-[24px]" />
            </div>
            <div style={tabletCardStyle}>
              <FeatureCard {...features[2]} radiusClass="rounded-[24px]" />
            </div>
            <div style={tabletCardStyle}>
              <FeatureCard {...features[3]} radiusClass="rounded-[24px]" />
            </div>
          </div>
        </div>

        {/* Mobile layout (<= 800px) */}
        <div className="hidden mobile:block">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-[#1C1B1F]">{t("whyChooseSim")}</h2>
            <p className="mb-2 text-sm text-[#1C1B1F]">{t("anonTitle")}</p>
            <p className="text-sm text-[#1C1B1F]/80">
              {t("anonDescription")}
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {features.map((feature, index) => (
              <div key={index} className="flex-shrink-0 snap-center" style={cardStyle}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurSim;
