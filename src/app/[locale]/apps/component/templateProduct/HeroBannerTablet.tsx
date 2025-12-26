import React from "react";

interface HeroBannerProps {
  imageUrl: string;
  alt?: string;
}

const HeroBannerTablet: React.FC<HeroBannerProps> = ({ imageUrl, alt }) => (
  <div className="w-full h-[147px] hidden sm:block lg:hidden">
    <img
      src={imageUrl}
      alt={alt || "Banner"}
      className="w-full h-full object-cover"
      draggable={false}
      style={{ display: 'block' }}
    />
  </div>
);

export default HeroBannerTablet;
