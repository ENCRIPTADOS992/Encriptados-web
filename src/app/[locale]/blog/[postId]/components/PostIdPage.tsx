import React from "react";
import TalkNowBanner from "./TalkNowBanner";
import ContentBlogById from "./ContentBlogById";
import PreviousPosts from "./PreviousPosts";
import type { BlogPostCard } from "@/features/blog/types";

type PostIdPageProps = {
  allPosts: BlogPostCard[];
  currentPostSlug: string;
};

const MAX_WIDTH = "max-w-[1239px]";

const PostIdPage: React.FC<PostIdPageProps> = ({ allPosts, currentPostSlug }) => {
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-10 overflow-hidden bg-black px-4 py-10 md:py-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div
          className={`w-full ${MAX_WIDTH} mx-auto flex flex-col items-start gap-8 lg:flex-row`}
        >
          <div className="w-full lg:flex-1">
            <ContentBlogById />
          </div>

          <aside className="w-full lg:sticky lg:top-24 lg:w-[360px] xl:w-[390px]">
            <PreviousPosts posts={allPosts} currentPostSlug={currentPostSlug} />
          </aside>
        </div>

        <div
          className={`relative w-full ${MAX_WIDTH} mx-auto flex justify-center items-center overflow-hidden`}
        >
          <div className="pointer-events-none absolute inset-x-4 top-8 z-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-[linear-gradient(90deg,rgba(34,158,217,0.08),rgba(255,255,255,0.025),rgba(42,255,166,0.06))] blur-2xl" />

          <div className="relative z-10 w-full flex justify-center">
            <TalkNowBanner />
          </div>
        </div>

      </div>
    </>
  );
};

export default PostIdPage;