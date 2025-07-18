import React from "react";
import CardOfPost from "../../components/CardOfPost";

type Post = {
  id: number | string;
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
};

type PreviousPostsProps = {
  posts: Post[];        
  currentPostId: number | string; 
};

const PreviousPosts: React.FC<PreviousPostsProps> = ({ posts, currentPostId }) => {
  const currentPost = posts.find(post => String(post.id) === String(currentPostId));

  if (!currentPost) {
    console.warn("No se encontró el post actual en la lista de posts", currentPostId, posts);
    return null;
  }

  const previousPosts = posts
    .filter(
      post => String(post.id) !== String(currentPostId) && new Date(post.date) < new Date(currentPost.date)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (previousPosts.length === 0) {
    console.warn("No se encontraron posts anteriores para el post actual", currentPostId, posts);
    return null;
  }

  return (
    <div className="w-full py-8">
      <h3 className="text-xl text-white mb-6 font-bold">Artículos anteriores</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {previousPosts.map(post => (
          <CardOfPost
            key={post.id}
            id={post.id}
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
