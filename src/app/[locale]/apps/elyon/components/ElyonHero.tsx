"use client";

import Image from "next/image";

const ElyonHero = () => {
	return (
		<section className="w-full">
			{/* Desktop */}
			<div className="hidden lg:block w-full aspect-[1440/284] relative">
				<Image
					src="/images/apps/elyon/elyon-banner-desktop.png"
					alt="elyon Desktop Banner"
					fill
					className="object-contain"
					priority
				/>
			</div>

			{/* Mobile */}
			<div className="block lg:hidden w-full h-[239px] relative">
				<Image
					src="/images/apps/elyon/elyon-banner-mobile.png"
					alt="elyon Mobile Banner"
					fill
					className="object-cover"
					priority
				/>
			</div>

		</section>
	);
};

export default ElyonHero;