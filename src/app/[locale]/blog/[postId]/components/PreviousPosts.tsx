import React from "react";
import { useTranslations } from "next-intl";
import CardOfPost from "../../components/CardOfPost";
import type { BlogPostCard } from "@/features/blog/types";

type PreviousPostsProps = {
  posts: BlogPostCard[];
  currentPostSlug: string;
};

const PreviousPosts: React.FC<PreviousPostsProps> = ({ posts, currentPostSlug }) => {
  const t = useTranslations("BlogPage");

  const currentPost = posts.find(
    (post) => post.slug === currentPostSlug,
  );

  if (!currentPost) {
    return null;
  }

  const previousPosts = posts
    .filter(
      (post) =>
        post.slug !== currentPostSlug &&
        new Date(post.date) < new Date(currentPost.date)
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3);

  if (previousPosts.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-[22px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-6">
      <h3 className="mb-6 text-[24px] font-bold leading-[1.3] text-white">
        {t("previousArticles")}
      </h3>

      <div className="flex flex-col gap-5">
        {previousPosts.map((post) => (
          <CardOfPost
            key={post.id}
            id={post.id}
            slug={post.slug}
            legacyPath={post.legacyPath}
            image={post.image}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousPosts;