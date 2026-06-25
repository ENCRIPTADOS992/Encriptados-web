import { useTranslations } from "next-intl";
import Image from "next/image";
import SectionWrapper from "@/shared/components/SectionWrapper";

export default function TalkNowBanner() {
  const GirlAndMan = "/images/blog/girlandman.webp";
  const TelegramLogo = "/images/components/telegram.svg";
  const t = useTranslations("BlogPage");

  return (
    <section
      data-blog-telegram-cta
      className="relative w-full overflow-hidden rounded-[28px] border border-white/10 shadow-[0_26px_90px_rgba(0,0,0,0.42)]"
      style={{
        background: "rgba(14,14,14,0.7)",
        backdropFilter: "blur(34px)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.075)_0%,rgba(255,255,255,0.025)_38%,rgba(0,0,0,0.22)_100%)]" />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <div className="absolute bottom-0 left-0 h-28 w-full bg-[linear-gradient(90deg,rgba(34,158,217,0.12),rgba(255,255,255,0.03),rgba(42,255,166,0.08))] blur-2xl" />

      <SectionWrapper className="relative z-10">
        <div className="grid items-center gap-8 px-5 py-10 md:grid-cols-[0.9fr_1fr] md:gap-12 md:px-8 md:py-12 lg:px-12 lg:py-14">
          <div className="relative mx-auto w-full max-w-[380px] md:max-w-[420px]">
            <div className="relative aspect-[1.18/1] overflow-hidden rounded-[24px] border border-white/10 bg-[#0E0E0E]/70 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-[34px]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_48%,rgba(34,158,217,0.08))]" />
              <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative h-full overflow-hidden rounded-[18px] border border-white/10 bg-[#171717]/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Image
                  src={GirlAndMan}
                  fill
                  alt="Asesoria por Telegram"
                  sizes="(max-width: 768px) 82vw, 420px"
                  className="object-cover object-center transition duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,14,14,0.56),rgba(14,14,14,0.1)_45%,rgba(14,14,14,0.36))]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,14,0.08),rgba(14,14,14,0.52))]" />

                <div className="relative flex h-full flex-col justify-between p-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0E0E0E]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                    <Image
                      src={TelegramLogo}
                      width={34}
                      height={34}
                      alt="Telegram"
                      className="h-8 w-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="inline-flex rounded-lg border border-white/10 bg-[#171717] px-4 py-2 text-sm font-medium text-[#9D9D9D] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              Telegram
            </div>
            <h2 className="max-w-xl text-[30px] font-bold leading-[1.16] text-white md:text-[40px] lg:text-[44px]">
              {t("talkWithSupport")}
            </h2>
            <a
              href="#"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#229ED9] px-6 py-3 font-semibold text-white shadow-[0_14px_40px_rgba(34,158,217,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#35cdfb] hover:text-black hover:shadow-[0_18px_52px_rgba(53,205,251,0.34)] focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              {t("goTelegram")}
            </a>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
