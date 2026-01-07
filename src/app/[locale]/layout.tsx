import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";
import CurrentHeader from "@/shared/CurrentHeader";
import { InitAuthClient } from "@/shared/InitAuthClient";
import { StripeProvider } from "@/shared/components/StripeProvider";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";
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
      <InitAuthClient />
      <NextIntlClientProvider messages={messages}>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileProvider>
              <AppMobileLayout
                header={<CurrentHeader />}
                footer={<FooterEncrypted />}
              >
                {children}
              </AppMobileLayout>
            </AppMobileProvider>
          </StripeProvider>
          <ModalPaymentController />
        </ModalPaymentProvider>
      </NextIntlClientProvider>
    </>
  );
}
