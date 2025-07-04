"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

const SeccureMdmBenefits = () => {
  const t = useTranslations("SecureMdmPage.benefits");

  return (
    <section className="lg:bg-[#F4F8FA] pt-[60px] overflow-hidden relative items-center justify-between">
      <div className="bg-[#0F0F0F] lg:rounded-[2rem] max-w-7xl mx-auto lg:mx-[5%] flex flex-col lg:flex-row items-center justify-center gap-10 lg:py-[40px] px-4 lg:px-20">

        {/* Image for Desktop */}
        <div className="w-full lg:w-1/2 flex justify-center hidden lg:flex relative overflow-hidden">
          <Image
            src="/images/apps/secure-mdm-android/secure-phone.png"
            alt="Secure Phone"
            width={400}
            height={800}
            className="object-contain"
          />
        </div>

        {/* Desktop */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 hidden lg:flex items-center">
          <h2 className="text-white text-2xl font-bold mb-4 text-center lg:text-left">
            {t("title")}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A] text-white rounded-2xl p-4 h-[auto] items-start gap-3">
              <CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mt-1 mb-5" />
              <div>
                <h3 className="font-bold text-white mb-1">{t("features.hiddenApps.title")}</h3>
                <p className="text-sm text-white">{t("features.hiddenApps.text")}</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] text-white rounded-2xl p-4 h-[auto] items-start gap-3">
              <CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mt-1 mb-5" />
              <div>
                <h3 className="font-bold mb-1">{t("features.manipulationProtection.title")}</h3>
                <p className="text-sm">{t("features.manipulationProtection.text")}</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] text-white rounded-2xl p-4 h-[auto] items-start gap-3">
              <CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mt-1 mb-5" />
              <div>
                <h3 className="font-bold text-white mb-1">{t("features.nfcBlocking.title")}</h3>
                <p className="text-sm text-white">{t("features.nfcBlocking.text")}</p>
              </div>
            </div>

            <div className="bg-[#1A1A1A] text-white rounded-2xl p-4 h-[auto] items-start gap-3">
              <CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mt-1 mb-5" />
              <div>
                <h3 className="font-bold mb-1">{t("features.anonymity.title")}</h3>
                <p className="text-sm">{t("features.anonymity.text")}</p>
              </div>
            </div>
          </div>
        </div>

				{/* Móviles */}
				{/* <div className="lg:hidden flex flex-col gap-6 mt-10">
					<h2 className="text-white text-2xl font-bold mb-4 text-center">{t("title")}</h2>

					<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
						<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
						<div>
							<h3 className="font-bold text-white">{t("features.hiddenApps.title")}</h3>
							<p className="text-sm text-white">{t("features.hiddenApps.text")}</p>
						</div>
					</div>

					<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
						<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
						<div>
							<h3 className="font-bold text-white">{t("features.manipulationProtection.title")}</h3>
							<p className="text-sm text-white">{t("features.manipulationProtection.text")}</p>
						</div>
					</div>

					<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
						<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
						<div>
							<h3 className="font-bold text-white">{t("features.nfcBlocking.title")}</h3>
							<p className="text-sm text-white">{t("features.nfcBlocking.text")}</p>
						</div>
					</div>

					<div className="bg-[#1A1A1A] rounded-2xl p-4 items-start gap-3">
						<CheckCircle className="text-[rgba(106,221,255,1)] w-8 h-8 mb-5" />
						<div>
							<h3 className="font-bold text-white">{t("features.anonymity.title")}</h3>
							<p className="text-sm text-white">{t("features.anonymity.text")}</p>
						</div>
					</div>

					<div className="flex justify-center mt-4">
						<Image
							src="/images/apps/secure-mdm-android/secure-phone-movil.png"
							alt="Secure Phone"
							width={324}
							height={397}
							className="object-contain"
						/>
					</div>
				</div> */}


      </div>
    </section>
  );
};

export default SeccureMdmBenefits;