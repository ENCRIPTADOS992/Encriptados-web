"use client";

import Image from "next/image";

const ThreemaHero = () => {
  return (
    <section className="w-full">
      {/* Desktop */}
      <div className="hidden lg:block w-full aspect-[1440/284] relative">
        <Image
          src="/images/threema/threema-banner-desktop.png"
          alt="threema Desktop Banner"
          fill
          className="object-contain"
          priority
        />
      </div>

			{/* Mobile */}
			<div className="block lg:hidden w-full h-[239px] relative">
				<Image
					src="/images/threema/threema-banner-mobile.png"
					alt="threema Mobile Banner"
					fill
					className="object-cover"
					priority
				/>
			</div>

    </section>
  );
};

export default ThreemaHero;
