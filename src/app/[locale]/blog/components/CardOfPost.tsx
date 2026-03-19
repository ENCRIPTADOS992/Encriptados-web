import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type CardOfPostProps = {
  id: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  author: string;
};

export default function CardOfPost({
  slug,
  image,
  title,
  description,
  author,
}: CardOfPostProps) {
  const t = useTranslations("BlogPage");
  const postUrl = `/blog/${slug}`;
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
        <Link href={postUrl}>
          <h3 className="line-clamp-2 text-[22px] leading-[1.5] font-medium text-gray-900 mb-3 hover:underline">
            {title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-base leading-relaxed text-gray-600 mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#0E0E0E] flex items-center justify-center border border-[#3E3E3E]">
              <span className="text-[10px] font-semibold text-white">
                {(author?.[0] || "?").toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-600">{author}</span>
          </div>
          <Link
            className="text-sm font-medium text-black hover:underline"
            href={`/blog/${slug}`}
          >
            {t("readMore")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
