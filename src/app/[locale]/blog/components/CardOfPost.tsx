import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type CardOfPostProps = {
  id: string;
  slug: string;
  legacyPath?: string;
  image: string;
  title: string;
  description: string;
  author: string;
  date?: string;
};

export default function CardOfPost({
  slug,
  legacyPath,
  image,
  title,
  description,
  author,
  date,
}: CardOfPostProps) {
  const t = useTranslations("BlogPage");
  const locale = useLocale();
  const postUrl = legacyPath ?? `/blog/${slug}`;

  const formattedDate = (() => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    try {
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    } catch {
      return d.toISOString().slice(0, 10);
    }
  })();

  return (
    <div className="flex flex-col w-full rounded-2xl shadow-lg overflow-hidden">
      <Link href={postUrl} className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56 block">
        <Image
          alt={title}
          className="object-cover rounded-t-2xl"
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1200px) 50vw, 
                 33vw"
        />
      </Link>
      <div className="flex flex-col justify-between flex-grow p-6 bg-white">
        {formattedDate && (
          <time
            dateTime={date}
            className="block mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
          >
            {formattedDate}
          </time>
        )}
        <Link href={postUrl}>
          <h3 className="line-clamp-2 text-[22px] leading-[1.5] font-medium text-gray-900 mb-3 hover:underline">
            {title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-base leading-relaxed text-gray-600 mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-6 rounded-full bg-[#0E0E0E] flex items-center justify-center border border-[#3E3E3E] flex-shrink-0">
              <span className="text-[10px] font-semibold text-white">
                {(author?.[0] || "?").toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-600 truncate">{author}</span>
          </div>
          <Link
            className="text-sm font-medium text-black hover:underline whitespace-nowrap"
            href={postUrl}
          >
            {t("readMore")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
