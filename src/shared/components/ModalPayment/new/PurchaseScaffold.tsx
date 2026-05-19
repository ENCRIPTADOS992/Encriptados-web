// src/shared/components/ModalPayment/new/PurchaseScaffold.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PurchaseHeader from "./PurchaseHeader";
import TelegramButtonOriginal from "@/shared/components/TelegramButton";

type UIMode = "new_user" | "roning_code" | "recharge" | "sim";

const TelegramButton =
  TelegramButtonOriginal as unknown as React.ComponentType<{
    className?: string;
    children?: React.ReactNode;
  }>;

type HeaderProps = React.ComponentProps<typeof PurchaseHeader>;

type Props = React.PropsWithChildren<
  HeaderProps & {
    mode: UIMode;
    enableTabSwitch?: boolean;
    onSelectMode?: (m: UIMode) => void;
    showRechargeCTA?: boolean;
    className?: string;
  }
>;

export default function PurchaseScaffold({
  mode,
  children,
  enableTabSwitch = false,
  onSelectMode,
  showRechargeCTA = false,
  className,
  ...headerProps
}: Props) {
  const t = useTranslations("paymentModal");

  console.log("[Scaffold] mode:", mode);

  const productName = headerProps.product?.name ?? "";
  const productId = headerProps.product?.id;
  const isMdmIphone = /secure\s*mdm\s*iphone/i.test(productName) ||
    /galaxia\s*mdm/i.test(productName);
  const isRouter = /camal[eé]on|router/i.test(productName);
  const isPhysicalSim =
    mode === "sim" && headerProps.shipping != null && headerProps.shipping > 0;
  const isProduct61588 = productId === 61588;

  const AlertBox = ({ lines }: { lines: string[] }) => (
    <div className="flex gap-[6px] rounded-[8px] bg-[#FFF7E4] px-[8px] py-[10px]">
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C98A00] text-[14px] font-bold text-[#C98A00]">
        !
      </span>
      <div className="flex flex-col gap-[2px]">
        {lines.map((line, i) => (
          <span key={i} className="text-[14px] leading-[20px] text-[#C98A00]">
            {line}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <PurchaseHeader {...headerProps} />

      {/* Alert for MDM iPhone products */}
      {isMdmIphone && (
        <AlertBox lines={[t("mdmInstallWarning")]} />
      )}

      {/* Alert for Router products */}
      {isRouter && (
        <AlertBox lines={[
          t("routerShippingWarning"),
        ]} />
      )}

      {/* Alert for Physical SIM products */}
      {isPhysicalSim && (
        <AlertBox lines={[
          t("simShippingWarning"),
        ]} />
      )}

      {/* Alert for product 61588 */}
      {isProduct61588 && (
        <AlertBox lines={[
          t("downloadAppWarning"),
        ]} />
      )}

      {/* Tabs are now handled inside UnifiedPurchaseForm based on formPolicy */}

      {children}

      {showRechargeCTA && (
        <div className="pt-2">
          <div className="text-center py-4">
            <Image
              src="/images/home/currency_exchange.webp"
              alt={t("recharge")}
              width={28}
              height={28}
              className="mx-auto"
              priority
            />
            <p className="mt-3 text-[24px] leading-[22px] font-semibold text-black">
              {t("rechargeTitle")}
            </p>
            <p className="text-[24px] leading-[28px] font-semibold text-black">
              {t("rechargeSubtitle")}
            </p>
          </div>

          <div className="w-full flex justify-center">
            <TelegramButton
              className="
        w-full sm:w-[416px] max-w-[416px] h-[54px]
        rounded-[8px] px-[10px] py-[10px]
        flex items-center justify-center gap-[10px]
        !bg-[#1CB9EC] text-white
        min-w-0
        [&>svg]:w-5 [&>svg]:h-5
        [&>svg]:mr-[10px]
      "
            >
              {t("goToTelegram")}
            </TelegramButton>
          </div>
        </div>
      )}
    </div>
  );
}
