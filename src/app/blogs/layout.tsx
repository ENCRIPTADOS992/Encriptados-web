import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";
import CurrentHeader from "@/shared/CurrentHeader";
import { StripeProvider } from "@/shared/components/StripeProvider";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";
import { MoraWarningProvider } from "@/providers/MoraWarningProvider";
import MoraWarningModal from "@/shared/components/MoraWarningModal";
import { AppMobileProvider } from "@/shared/context/AppMobileContext";
import AppMobileLayout from "@/shared/components/AppMobileLayout";
import { loadMessages } from "@/i18n/messages";

export default async function LegacySpanishBlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setRequestLocale("es");
  const messages = await loadMessages("es");

  return (
    <NextIntlClientProvider locale="es" messages={messages}>
      <AppMobileProvider>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileLayout
              header={<CurrentHeader />}
              footer={<FooterEncrypted />}
            >
              {children}
            </AppMobileLayout>
          </StripeProvider>
          <ModalPaymentController />
        </ModalPaymentProvider>
        <MoraWarningProvider>
          <MoraWarningModal />
        </MoraWarningProvider>
      </AppMobileProvider>
    </NextIntlClientProvider>
  );
}