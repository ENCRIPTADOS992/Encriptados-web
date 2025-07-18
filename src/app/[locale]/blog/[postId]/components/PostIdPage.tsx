import React from "react";
import BannerPostById from "./BannerPostById";
import TalkNowBanner from "./TalkNowBanner";
import ContentBlogById from "./ContentBlogById";
import PreviousPosts from "./PreviousPosts";

type Post = {
  id: number | string;
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
};

type PostIdPageProps = {
  allPosts: Post[];
  currentPostId: number | string;
};

const MAX_WIDTH = "max-w-[1239px]"; 

const PostIdPage: React.FC<PostIdPageProps> = ({ allPosts, currentPostId }) => {
  return (
    <>
      <BannerPostById />
      <div className="w-full bg-black flex flex-col justify-center items-center py-10 md:py-16 px-4 gap-10">
        <ContentBlogById />
        <div
          className={`relative w-full ${MAX_WIDTH} mx-auto flex justify-center items-center overflow-hidden`}
        >
          <div
            className="absolute left-0 top-0 h-full w-[36vw] md:w-[30vw] xl:w-[26rem] rounded-full blur-2xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, #00372B 60%, transparent 100%)",
              opacity: 0.7,
            }}
          ></div>

          <div
            className="absolute right-0 top-0 h-full w-[36vw] md:w-[30vw] xl:w-[26rem] rounded-full blur-2xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, #022530 60%, transparent 100%)",
              opacity: 0.7,
            }}
          ></div>

          <div className="relative z-10 w-full flex justify-center">
            <TalkNowBanner />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className={MAX_WIDTH + " w-full"}>
            <PreviousPosts posts={allPosts} currentPostId={currentPostId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostIdPage;
