import React from "react";
import DownloadAppBanner from "../../our-products/components/DownloadAppBanner";
import AboutUsBanner from "./AboutUsBanner";
import Image from "next/image";
import WhoWeAre from "./WhoWeAre";
import OurGoals from "./OurGoals";

const AboutUsPage = () => {
  const PeopleImage = "/images/about-us/peopleimage.png";
  const Spiral = "/images/about-us/spiral.png";
  const SpiralLeft = "/images/about-us/spiralleft.png";

  return (
    <>
      <div className="w-full bg-gradient-to-b from-[#005340] via-[#073A4B] to-black relative py-9">
        {/* Imagen del espiral en el fondo */}
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <Image
            src={Spiral}
            alt="Spiral Background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Contenido principal */}
        <AboutUsBanner />

        <Image
          src={PeopleImage}
          alt="Phone in Hand"
          width={2000}
          height={2000}
          className="object-contain -translate-y-10 md:-translate-y-11 xl:-translate-y-20  "
          priority
        />

        <div>
          <WhoWeAre />
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-[black] via-[#073A4B] to-black relative min-h-screen py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={SpiralLeft}
            alt="Spiral Background"
            width={340}
            height={340}
            objectFit="cover"
            priority
          />
        </div>

        <div className="relative z-10">
          <OurGoals />
        </div>
      </div>

      <DownloadAppBanner />
    </>
  );
};

export default AboutUsPage;
