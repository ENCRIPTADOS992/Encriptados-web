"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/shared/components/SectionWrapper";
import styles from "@/app/[locale]/blog/components/BlogTemplate.module.css";

type Props = {
  title: string;
};

export default function LegacyBlogBannerClient({ title }: Props) {
  const Banner = "/images/blog/blogidbanner.webp";
  const t = useTranslations("BlogPage");

  return (
    <section className="relative flex h-[360px] w-full items-center justify-center overflow-hidden bg-black md:h-[440px]">
      <Image
        src={Banner}
        alt="Blog Encriptados"
        fill
        sizes="100vw"
        className={`${styles.heroImage} absolute inset-0 z-0 object-cover scale-105`}
        priority
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.82)_68%,#000_100%)]" />
      <SectionWrapper className="relative z-20 flex justify-center items-center h-full">
        <div className={`${styles.fadeUp} w-full max-w-3xl px-4 text-center`}>
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
            {t("ourBlogTitleBanner")}
          </p>
          <h2 className="text-[32px] font-bold leading-[1.16] text-white md:text-[44px] lg:text-[52px]">
            {title}
          </h2>
        </div>
      </SectionWrapper>
    </section>
  );
}
