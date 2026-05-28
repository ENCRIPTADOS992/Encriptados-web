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
import HtmlLangSetter from "@/shared/components/HtmlLangSetter";
import TelegramFloatingButton from "@/shared/components/TelegramFloatingButton/TelegramFloatingButton";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <>
      <HtmlLangSetter locale={locale} />
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
          <TelegramFloatingButton />
        </AppMobileProvider>
      </NextIntlClientProvider>
    </>
  );
}
