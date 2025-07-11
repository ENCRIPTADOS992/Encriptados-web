import React from "react";
import BannerPostById from "./BannerPostById";
import TalkNowBanner from "./TalkNowBanner";
import ContentBlogById from "./ContentBlogById";

const MAX_WIDTH = "max-w-[1239px]"; // suma de tus bloques en desktop

const PostIdPage = () => {
  return (
    <>
      <BannerPostById />
      <div className="w-full bg-black flex flex-col justify-center items-center py-10 md:py-16 px-4 gap-10">
        <ContentBlogById />

        {/* Contenedor limitado para gradientes y banner */}
        <div
          className={`relative w-full ${MAX_WIDTH} mx-auto flex justify-center items-center overflow-hidden`}
        >
          {/* Gradiente izquierdo */}
          <div
            className="absolute left-0 top-0 h-full w-[36vw] md:w-[30vw] xl:w-[26rem] rounded-full blur-2xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, #00372B 60%, transparent 100%)",
              opacity: 0.7,
            }}
          ></div>

          {/* Gradiente derecho */}
          <div
            className="absolute right-0 top-0 h-full w-[36vw] md:w-[30vw] xl:w-[26rem] rounded-full blur-2xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, #022530 60%, transparent 100%)",
              opacity: 0.7,
            }}
          ></div>

          {/* Banner centrado */}
          <div className="relative z-10 w-full flex justify-center">
            <TalkNowBanner />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostIdPage;
