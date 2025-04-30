import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TalkNowBanner() {
  const ManWoman = "/images/blog/man-woman.png";

  const t = useTranslations("BlogPage");

  return (
    <div className="bg-[#232323] px-4 py-8 md:px-8 md:py-12 rounded-2xl">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
          <Image
            src={ManWoman}
            width={350}
            height={350}
            alt=""
            layout=""
            objectFit="cover"
          />

          {/* Text Content */}
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <h2 className="max-w-md text-2xl font-bold text-white md:text-3xl">
              {t("talkWithSupport")}
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-[#229ED9] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1d8abd]"
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
      </div>
    </div>
  );
}
