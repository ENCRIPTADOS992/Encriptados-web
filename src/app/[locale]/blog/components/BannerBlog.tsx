import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./BlogTemplate.module.css";

const BannerBlog = () => {
  const Banner = "/images/blog/blogbanner.webp";

  const t = useTranslations("BlogPage");

  return (
    <section className="relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-black md:h-[500px]">
      <Image
        src={Banner}
        alt="Blog Encriptados"
        fill
        sizes="100vw"
        className={`${styles.heroImage} absolute inset-0 z-0 object-cover scale-105`}
        priority
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.82)_64%,#000_100%)]" />
      <div className="absolute inset-x-8 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />

      <div className={`${styles.fadeUp} relative z-20 mx-auto max-w-4xl px-4 text-center`}>
        <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
          {t("ourBlogTitleBanner")}
        </p>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[760px]">
            <h1 className="text-[32px] font-bold leading-[1.16] text-white md:text-[44px] lg:text-[54px]">
              {t("ourBlogDescriptionBanner")}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerBlog;
