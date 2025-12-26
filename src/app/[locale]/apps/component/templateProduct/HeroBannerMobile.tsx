import React from "react";

interface HeroBannerProps {
  imageUrl: string;
  alt?: string;
}

const HeroBannerMobile: React.FC<HeroBannerProps> = ({ imageUrl, alt }) => (
  <div className="w-full h-[174px] sm:hidden">
    <img
      src={imageUrl}
      alt={alt || "Banner"}
      className="w-full h-full object-cover"
      draggable={false}
      style={{ display: 'block' }}
    />
  </div>
);

export default HeroBannerMobile;
