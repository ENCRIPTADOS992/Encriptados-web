import Image from "next/image";
import Link from "next/link";

type CardOfPostProps = {
  id: number | string;
  image: string;
  title: string;
  description: string;
  author: string;
};

export default function CardOfPost({
  id,
  image,
  title,
  description,
  author,
}: CardOfPostProps) {
  return (
    <div className="flex flex-col w-full rounded-2xl bg-white shadow-lg overflow-hidden">
      <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80">
        <Image
          alt={title}
          className="object-cover"
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1200px) 50vw, 
                 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-tight text-gray-900">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-normal text-gray-600">
          {description}
        </p>
        <div className="flex items-center justify-between pt-4">
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
            href={`/blog/${id}`}
          >
            Leer más →
          </Link>
        </div>
      </div>
    </div>
  );
}
