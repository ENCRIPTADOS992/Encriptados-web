import localFont from "next/font/local";
import "../globals.css";
import { getMessages } from "next-intl/server";

import { NextIntlClientProvider } from "next-intl";

import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";

import CurrentHeader from "@/shared/CurrentHeader";
import { QueryClientProvider } from "@/providers/query-client/QueryClientProvider";
import { ToastProvider } from "@/shared/context/ToastContext";
import { InitAuthClient } from "@/shared/InitAuthClient";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
// import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InitAuthClient />
        <ToastProvider>
          <QueryClientProvider>
            <NextIntlClientProvider messages={messages}>
              <CurrentHeader />
              {/* <ModalPaymentProvider> */}
                {children}
                {/* <ModalPaymentController /> */}
              {/* </ModalPaymentProvider> */}
              <FooterEncrypted />
            </NextIntlClientProvider>
          </QueryClientProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
