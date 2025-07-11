import React from "react";
import BannerPostById from "./BannerPostById";
import TalkNowBanner from "./TalkNowBanner";
import ContentBlogById from "./contentBlogById";

const PostIdPage = () => {
  return (
    <>
      <BannerPostById />
      <div className="w-full bg-gradient-to-b from-[#00372B] via-black to-[#022530] flex flex-col justify-center items-center py-10 md:py-16 px-4 gap-10">
      <ContentBlogById />
      <TalkNowBanner />
    </div>

    </>
  );
};

export default PostIdPage;
