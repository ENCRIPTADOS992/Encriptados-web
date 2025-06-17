"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

const SecureBenefits = () => {
  const t = useTranslations("SecurePage.benefits");

  return (
    <section className="lg:bg-[#F7FAFC] lg:pt-[80px] lg:pb-[10px] lg:px-[80px] lg:px-20">
			<div className="bg-[#0F0F0F] lg:pt-[80px] lg:rounded-3xl px-5">
				<div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2">
					{/* Image Desktop */}
					<div className="w-full lg:w-1/2 flex justify-center hidden lg:flex">
						<Image
							src="/images/apps/secure-mdm-iphone/secure-phone.png"
							alt="Secure Phone"
							width={404}
							height={713}
							className="object-contain"
						/>
					</div>

					{/* Benefits Section - Desktop */}
					<div className="w-full lg:w-1/2 flex-col gap-6 hidden lg:flex">
						<h2 className="text-white text-2xl font-bold mb-4 text-center lg:text-left">{t("title")}</h2>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-gradient-to-r from-[rgba(106,221,255,1)] to-[rgba(168,235,255,1)] text-[rgba(27,27,27,1)] rounded-2xl p-4 h-[150px] items-start gap-3">
								<CheckCircle className="text-[rgba(27,27,27,1)] w-8 h-8 mb-5" />
								<p className="text-[rgba(27,27,27,1)] text-sm text-left">{t("features.endToEndEncryption")}</p>
							</div>
							<div className="bg-[#1A1A1A] text-white rounded-2xl p-4 h-[150px] items-start gap-3">
								<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
								<p className="text-white text-sm text-left">{t("features.chatHiding")}</p>
							</div>
							<div className="bg-[#1A1A1A] text-white rounded-2xl p-4 h-[150px] items-start gap-3">
								<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
								<p className="text-white text-sm text-left">{t("features.privateCalls")}</p>
							</div>
							<div className="bg-gradient-to-r from-[rgba(106,221,255,1)] to-[rgba(168,235,255,1)] text-[rgba(27,27,27,1)] rounded-2xl p-4 h-[150px] items-start gap-3">
								<CheckCircle className="text-[rgba(27,27,27,1)] w-8 h-8 mb-5" />
								<p className="text-[rgba(27,27,27,1)] text-sm text-left">{t("features.extra")}</p>
							</div>
						</div>
					</div>

					{/* Mobile */}
					<div className="lg:hidden flex flex-col gap-6 mt-10">
						<h2 className="text-white text-2xl font-bold mb-4 text-center">{t("mobileTitle")}</h2>
						<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
							<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
							<div>
								<h3 className="font-bold text-white">{t("mobileFeatures.hiddenAppsTitle")}</h3>
								<p className="text-sm text-white">{t("mobileFeatures.hiddenAppsText")}</p>
							</div>
						</div>
						<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
							<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
							<div>
								<h3 className="font-bold text-white">{t("mobileFeatures.manipulationProtectionTitle")}</h3>
								<p className="text-sm text-white">{t("mobileFeatures.manipulationProtectionText")}</p>
							</div>
						</div>
						<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
							<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
							<div>
								<h3 className="font-bold text-white">{t("mobileFeatures.nfcBlockingTitle")}</h3>
								<p className="text-sm text-white">{t("mobileFeatures.nfcBlockingText")}</p>
							</div>
						</div>
						<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
							<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
							<div>
								<h3 className="font-bold text-white">{t("mobileFeatures.anonymityTitle")}</h3>
								<p className="text-sm text-white">{t("mobileFeatures.anonymityText")}</p>
							</div>
						</div>

						<div className="flex justify-center mt-4">
							<Image
								src="/images/apps/secure-mdm-iphone/secure-phone.png"
								alt="Secure Phone"
								width={324}
								height={397}
								className="object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
    </section>
  );
};

export default SecureBenefits;