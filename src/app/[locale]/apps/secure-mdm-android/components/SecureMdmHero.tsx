"use client";

import Image from "next/image";

const SecureMdmHero = () => {
	return (
		<section className="w-full">
			{/* Desktop */}
			<div className="hidden lg:block w-full aspect-[1440/284] relative">
				<Image
					src="/images/apps/secure-mdm-android/secure-banner-desktop.png"
					alt="Secure Desktop Banner"
					fill
					className="object-contain"
					priority
				/>
			</div>

			{/* Mobile */}
			<div className="block lg:hidden w-full h-[239px] relative">
				<Image
					src="/images/apps/secure-mdm-android/secure-banner-mobile.png"
					alt="Secure Mobile Banner"
					fill
					className="object-cover"
					priority
				/>
			</div>

		</section>
	);
};

export default SecureMdmHero;