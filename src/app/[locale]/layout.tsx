import localFont from "next/font/local";
import { Inter } from "next/font/google";
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

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

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
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
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
      </body>
    </html>
  );
}
