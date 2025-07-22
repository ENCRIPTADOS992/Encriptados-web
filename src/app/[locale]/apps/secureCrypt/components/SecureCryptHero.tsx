"use client";

import Image from "next/image";

const SecureHero = () => {
	return (
		<section className="w-full bg-white">
			<div className="relative w-full aspect-[1440/284]">
				<Image
					src="/images/apps/secureCrypt/banner.png"
					alt="Secure Banner"
					fill
					className="object-contain object-center"
					priority
				/>
			</div>
		</section>
	);
};

export default SecureHero;
