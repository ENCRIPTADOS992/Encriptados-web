import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";
import CurrentHeader from "@/shared/CurrentHeader";
import { StripeProvider } from "@/shared/components/StripeProvider";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";
import { MoraWarningProvider } from "@/providers/MoraWarningProvider";
import MoraWarningModal from "@/shared/components/MoraWarningModal";
import { AppMobileProvider } from "@/shared/context/AppMobileContext";
import AppMobileLayout from "@/shared/components/AppMobileLayout";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
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
    </>
  );
}
