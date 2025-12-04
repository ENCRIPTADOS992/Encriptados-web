import React, { useState } from "react";
import CardOfPost from "./CardOfPost";
import SectionWrapper from "@/shared/components/SectionWrapper";

type Post = {
  id: number | string;
  image: string;
  title: string;
  description: string;
  author: string;
};

type ListOfPostsProps = {
  posts: Post[];
};

const POSTS_PER_PAGE = 6;

const ListOfPosts = ({ posts }: ListOfPostsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="bg-black py-8">
      <SectionWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post, index) => (
            <CardOfPost
              key={post.id || index}
              id={post.id}
              image={post.image}
              title={post.title}
              description={post.description}
              author={post.author}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div
            className="
      flex flex-wrap justify-center
      mt-8 gap-2
      max-w-full
    "
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                className={`px-3 py-2 rounded-md border text-sm transition
          ${currentPage === i + 1
                    ? "bg-white text-black font-semibold"
                    : "bg-transparent text-white border-gray-600 hover:bg-gray-800"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </SectionWrapper>
    </div>
  );
};

export default ListOfPosts;