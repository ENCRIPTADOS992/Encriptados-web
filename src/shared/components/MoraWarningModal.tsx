"use client";

import React from "react";
import { useMoraWarning } from "@/providers/MoraWarningProvider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function MoraWarningModal() {
  const { moraStatus, showModal, dismissModal } = useMoraWarning();
  const t = useTranslations("DashboardPage.mora");
  const router = useRouter();

  if (!showModal || !moraStatus) return null;

  const level = moraStatus.warning_level;

  const messageKey =
    level === "daily"
      ? "dailyMessage"
      : level === "blocked"
      ? "blockedMessage"
      : "weeklyMessage";

  const handleRecharge = () => {
    dismissModal();
    router.push("/dashboard/store");
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70">
      <div className="w-[90%] max-w-[400px] rounded-2xl bg-[#1C1C1C] p-8 flex flex-col items-center gap-4">
        {/* Warning icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-yellow-500">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EAB308"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-white text-lg font-bold">{t("title")}</h2>

        {/* Message */}
        <p className="text-[#35CDFB] text-sm text-center leading-relaxed">
          {t(messageKey)}
        </p>

        {/* Thanks */}
        <p className="text-gray-500 text-xs">{t("thanks")}</p>

        {/* CTA Button */}
        <button
          onClick={handleRecharge}
          className="w-full py-3 rounded-full bg-[#35CDFB] text-white font-semibold text-base hover:bg-[#2bb8e7] transition"
        >
          {t("rechargeButton")}
        </button>

        {/* Close */}
        <button
          onClick={dismissModal}
          className="text-gray-400 text-sm hover:text-white transition"
        >
          {t("closeButton")}
        </button>
      </div>
    </div>
  );
}
