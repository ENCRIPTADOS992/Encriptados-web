"use client";

import Image from "next/image";

const CryptcomHero = () => {
	return (
		<section className="w-full">
			{/* Desktop only */}
			<div className="hidden lg:block w-full aspect-[1440/284] relative">
				<Image
					src="/images/apps/cryptcom/cryptcom-banner-desktop.png"
					alt="cryptcom Desktop Banner"
					fill
					className="object-contain"
					priority
				/>
			</div>

			{/* Tablet & Mobile */}
			<div className="block lg:hidden w-full h-[160px] sm:h-[210px] md:h-[239px] relative">
				<Image
					src="/images/apps/cryptcom/cryptcom-banner-mobile.png"
					alt="cryptcom Mobile Banner"
					fill
					className="object-cover"
					priority
				/>
			</div>
		</section>
	);
};

export default CryptcomHero;
