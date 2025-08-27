// src/shared/components/ModalPayment/new/PurchaseScaffold.tsx
"use client";

import React from "react";
import Image from "next/image";
import PurchaseHeader from "./PurchaseHeader";
import PurchaseTabs, { Mode } from "./PurchaseTabs";
import TelegramButtonOriginal from "@/shared/components/TelegramButton";

type UIMode = Mode | "sim";

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
  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      <PurchaseHeader {...headerProps} />
      {mode !== "sim" && (
        <PurchaseTabs
          enableSwitching={enableTabSwitch}
          onSelect={onSelectMode as any}
        />
      )}

      {children}

      {showRechargeCTA && (
        <div className="pt-2">
          <div className="text-center py-6">
            <Image
              src="/images/home/currency_exchange.png"
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
        w-[416px] h-[54px]
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
