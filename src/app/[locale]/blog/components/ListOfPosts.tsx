import React from "react";
import CardOfPost from "./CardOfPost";

type Post = {
  image: string;
  title: string;
  description: string;
  author: string;
};

type ListOfPostsProps = {
  posts: Post[];
};

const ListOfPosts = ({ posts }: ListOfPostsProps) => {
  return (
    <div className="bg-black p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts?.map((post, index) => (
          <CardOfPost
            key={index}
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

export default ListOfPosts;
