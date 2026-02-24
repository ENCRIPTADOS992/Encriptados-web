// src/shared/components/ModalPayment/new/PurchaseScaffold.tsx
"use client";

import React from "react";
import Image from "next/image";
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

  console.log("[Scaffold] mode:", mode);

  const isSecureMdmIphone = /secure\s*mdm\s*iphone/i.test(
    headerProps.product?.name ?? ""
  );

  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <PurchaseHeader {...headerProps} />

      {/* Alert for Secure MDM iPhone */}
      {isSecureMdmIphone && (
        <div className="flex items-center gap-[6px] rounded-[8px] bg-[#FFF7E4] px-[8px] py-[10px]">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C98A00] text-[14px] font-bold text-[#C98A00]">
            !
          </span>
          <span className="text-[14px] leading-[20px] text-[#C98A00]">
            Para la instalación se requiere un MAC con OS 15.7 o superior.
          </span>
        </div>
      )}

      {/* Tabs are now handled inside UnifiedPurchaseForm based on formPolicy */}

      {children}

      {showRechargeCTA && (
        <div className="pt-2">
          <div className="text-center py-4">
            <Image
              src="/images/home/currency_exchange.webp"
              alt="Recargar"
              width={28}
              height={28}
              className="mx-auto"
              priority
            />
            <p className="mt-3 text-[24px] leading-[22px] font-semibold text-black">
              Si quieres recargar
            </p>
            <p className="text-[24px] leading-[28px] font-semibold text-black">
              comunícate con nosotros
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
              Ir a Telegram
            </TelegramButton>
          </div>
        </div>
      )}
    </div>
  );
}
