import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
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
import { buildHomeLanguageAlternates, buildSeoMetadata } from "@/shared/seo/metadata";
import HomePage from "./[locale]/page";

export const metadata: Metadata = buildSeoMetadata({
  title: "Celulares encriptados, SIMs anonimas y apps seguras",
  description:
    "Compra celulares encriptados, SIMs anonimas, eSIMs, routers y aplicaciones de comunicacion privada con soporte especializado de Encriptados.",
  canonicalPath: "/",
  locale: "es",
  image: {
    url: "/images/home/encriptados-preview.png",
    width: 1200,
    height: 630,
    alt: "Encriptados",
  },
  languages: buildHomeLanguageAlternates(),
  keywords: [
    "celulares encriptados",
    "SIM anonima",
    "eSIM encriptada",
    "apps seguras",
    "privacidad digital",
    "Encriptados",
  ],
});

export default async function RootSpanishHomePage() {
  setRequestLocale("es");
  const messages = await loadMessages("es");

  return (
    <NextIntlClientProvider locale="es" messages={messages}>
      <Suspense fallback={null}>
        <AppMobileProvider>
          <ModalPaymentProvider>
            <StripeProvider>
              <AppMobileLayout
                header={<CurrentHeader />}
                footer={<FooterEncrypted />}
              >
                <HomePage />
              </AppMobileLayout>
            </StripeProvider>
            <ModalPaymentController />
          </ModalPaymentProvider>
          <MoraWarningProvider>
            <MoraWarningModal />
          </MoraWarningProvider>
        </AppMobileProvider>
      </Suspense>
    </NextIntlClientProvider>
  );
}