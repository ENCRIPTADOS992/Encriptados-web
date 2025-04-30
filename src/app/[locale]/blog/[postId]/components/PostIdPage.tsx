import React from "react";
import BannerPostById from "./BannerPostById";
import TalkNowBanner from "./TalkNowBanner";

const PostIdPage = () => {
  return (
    <>
      <BannerPostById />
      <div className="w-full bg-gradient-to-b from-[#00372B] via-black to-[#022530] flex justify-center items-center py-10 md:py-16 px-4">
        <TalkNowBanner />
      </div>
    </>
  );
};

export default PostIdPage;
