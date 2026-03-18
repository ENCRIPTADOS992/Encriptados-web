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
    <div className="w-full py-12 md:py-16">
      <h3 className="text-[24px] leading-[1.5] font-bold text-white mb-8">
        {t("previousArticles")}
      </h3>

      {/* Lista vertical */}
      <div className="flex flex-col gap-6">
        {previousPosts.map((post) => (
          <CardOfPost
            key={post.id}
            id={post.id}
            slug={post.slug}
            image={post.image}
            title={post.title}
            description={post.description}
            author={post.author}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousPosts;