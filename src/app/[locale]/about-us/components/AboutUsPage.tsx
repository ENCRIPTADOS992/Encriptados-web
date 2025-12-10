// app/(site)/about-us/AboutUsPage.tsx
"use client";

import React from "react";
import Image from "next/image";

// BANNERS
import AboutUsBannerDesktop from "./AboutUsBanner";
import AboutUsBannerTablet from "./AboutUsBannerTablet";
import AboutUsBannerMobile from "./AboutUsBannerMobile";

// // WHO WE ARE
import WhoWeAreDesktop from "./WhoWeAre";
import WhoWeAreTablet from "./WhoWeAreTablet";
import WhoWeAreMobile from "./WhoWeAreMobile";

// // OUR GOALS
import OurGoalsDesktop from "./OurGoals";
import OurGoalsTablet from "./OurGoalsTablet";
import OurGoalsMobile from "./OurGoalsMobile";

// DOWNLOAD (ya tienes desktop/mobile)
import DownloadBanner from "../../ambassadors/components/DownloadBanner";
import DownloadBannerMobile from "../../ambassadors/components/DownloadBannerMobile";

const PeopleImage = "/images/about-us/peopleimage.png";
const Spiral = "/images/about-us/spiral.png";
const SpiralLeft = "/images/about-us/spiralleft.png";

export default function AboutUsPage() {
  return (
    <>
      {/* Sección 1 */}
      <div className="w-full bg-gradient-to-b from-[#005340] via-[#073A4B] to-black relative py-9">
        {/* BG spiral */}
        <div className="absolute inset-0 z-0">
          <Image
            src={Spiral}
            alt="Spiral Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Banner por breakpoint */}
        <div className="relative z-10">
          {/* Desktop */}
          <div className="hidden lg:block">
            <AboutUsBannerDesktop />
          </div>

          {/* Tablet (sm y md) */}
          <div className="hidden sm:block lg:hidden">
            <AboutUsBannerTablet />
          </div>

          {/* Mobile (<sm) */}
          <div className="block sm:hidden">
            <AboutUsBannerMobile />
          </div>
        </div>

        {/* Imagen de personas - solo visible en tablet y desktop */}
        <div className="relative w-full hidden sm:block -mt-12 md:-mt-14 lg:-mt-16">
          <div className="w-full">
            <Image
              src={PeopleImage}
              alt="Team members"
              width={2000}
              height={600}
              className="object-cover w-full"
              priority
            />
          </div>
        </div>

        {/* WhoWeAre por breakpoint */}
        <div className="relative z-10">
          <div className="hidden lg:block">
            <WhoWeAreDesktop />
          </div>
          <div className="hidden sm:block lg:hidden">
            <WhoWeAreTablet />
          </div>
          <div className="block sm:hidden">
            <WhoWeAreMobile />
          </div>
        </div>
      </div>

      {/* Sección 2 */}
      <div className="w-full bg-gradient-to-b from-black via-[#073A4B] to-black relative min-h-screen py-2">
        {/* BG spiral left */}
        <div className="absolute inset-0 z-0">
          <Image
            src={SpiralLeft}
            alt="Spiral Background Left"
            width={440}
            height={440}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* OurGoals por breakpoint */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

        {/* OurGoals por breakpoint */}
        <div className="relative z-10">
          <div className="hidden lg:block">
            <OurGoalsDesktop />
          </div>
          <div className="hidden sm:block lg:hidden">
            <OurGoalsTablet />
          </div>
          <div className="block sm:hidden">
            <OurGoalsMobile />
          </div>
        </div>

        {/* Download banners (ya tienes desktop/mobile) */}
        <div className="relative z-10">
          <div className="hidden lg:block">
            <DownloadBanner />
          </div>
          <div className="block lg:hidden">
            <DownloadBannerMobile />
          </div>
        </div>
      </div>
    </>
  );
}
