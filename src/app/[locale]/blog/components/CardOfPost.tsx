import Image from "next/image";

type CardOfPostProps = {
  image: string;
  title: string;
  description: string;
  author: string;
};

export default function CardOfPost({
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
            <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
              <Image
                alt={author}
                className="object-cover"
                height={24}
                src="/placeholder.svg"
                width={24}
              />
            </div>
            <span className="text-sm text-gray-600">{author}</span>
          </div>
          <a
            className="text-sm font-medium text-black hover:underline"
            href="#"
          >
            Leer más →
          </a>
        </div>
      </div>
    </div>
  );
}
