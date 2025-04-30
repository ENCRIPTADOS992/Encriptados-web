import React from "react";
import Image from "next/image";

const OffersBanner = () => {
  const offersImage = "/images/offers/EncryptedOffers.png";

  return (
    <div className="relative w-full h-[165px] md:h-[450px] bg-black">
      <Image
        src={offersImage}
        alt="Offers Banner"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
};

export default OffersBanner;
