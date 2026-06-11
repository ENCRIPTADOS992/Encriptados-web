import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";
import CurrentHeader from "@/shared/CurrentHeader";
import AppMobileLayout from "@/shared/components/AppMobileLayout";
import { StripeProvider } from "@/shared/components/StripeProvider";
import { AppMobileProvider } from "@/shared/context/AppMobileContext";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";
import MoraWarningModal from "@/shared/components/MoraWarningModal";
import { loadMessages } from "@/i18n/messages";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import { MoraWarningProvider } from "@/providers/MoraWarningProvider";
import type { SeoLocale } from "@/shared/seo/constants";
import HomePage from "@/app/[locale]/page";
import AboutUsPage from "@/app/[locale]/about-us/page";
import BecomeEncryptedPartnerPage from "@/app/[locale]/become-an-encrypted-partner/page";
import BlogIndexPage from "@/app/[locale]/blog/page";
import BlogDetailPage from "@/app/[locale]/blogs/[category]/[slug]/page";
import EncryptedPhonesDistributorsPage from "@/app/[locale]/encrypted-phones-distributors/page";
import FastDeliveryPage from "@/app/[locale]/fast-delivery/page";
import IdentityVerificationPage from "@/app/[locale]/identity-verification/page";
import NewsPage from "@/app/[locale]/news/page";
import OffersPage from "@/app/[locale]/offers/page";
import PrivacyPolicyPage from "@/app/[locale]/pages/politica-de-privacidad/page";
import CookiesPolicyPage from "@/app/[locale]/pages/politica-de-cookies/page";
import TermsPage from "@/app/[locale]/pages/terminos-y-condiciones/page";
import ProductPage from "@/app/[locale]/apps/[slug]/page";
import SecurityTestPage from "@/app/[locale]/security-test/page";
import SimProductPage from "@/app/[locale]/sim/[slug]/page";
import WhereToFindEncryptedPage from "@/app/[locale]/where-to-find-encrypted/page";
import WhereToFindUsPage from "@/app/[locale]/where-to-find-us/page";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const LOCALES = new Set<SeoLocale>(["es", "en", "fr", "it", "pt"]);

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeLocale(value: string | undefined): SeoLocale {
  if (value && LOCALES.has(value as SeoLocale)) return value as SeoLocale;
  return "es";
}

function parseTarget(target: string): { locale: SeoLocale; segments: string[] } | null {
  const pathname = target.split("?")[0]?.replace(/\/+$/, "") ?? "";
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return { locale: "es", segments: [] };

  const [first, ...rest] = segments;
  if (LOCALES.has(first as SeoLocale)) {
    return {
      locale: first as SeoLocale,
      segments: rest,
    };
  }

  return {
    locale: "es",
    segments,
  };
}

async function renderTarget(locale: SeoLocale, segments: string[]): Promise<ReactNode> {
  if (!segments.length) return <HomePage />;

  const pageParams = Promise.resolve({ locale });

  if (segments[0] === "apps" && segments[1]) {
    return <ProductPage params={Promise.resolve({ locale, slug: segments[1] })} />;
  }

  if (segments[0] === "blogs" && segments[1] && segments[2]) {
    return (
      <BlogDetailPage
        params={Promise.resolve({
          locale,
          category: segments[1],
          slug: segments[2],
        })}
      />
    );
  }

  if (segments[0] === "sim" && segments[1]) {
    return (
      <SimProductPage
        params={Promise.resolve({ locale, slug: segments[1] })}
        searchParams={Promise.resolve({})}
      />
    );
  }

  if (segments[0] === "pages" && segments[1] === "terminos-y-condiciones") {
    return <TermsPage />;
  }

  if (segments[0] === "pages" && segments[1] === "politica-de-privacidad") {
    return <PrivacyPolicyPage />;
  }

  if (segments[0] === "pages" && segments[1] === "politica-de-cookies") {
    return <CookiesPolicyPage />;
  }

  if (segments[0] === "pages" && segments[1] === "politica-de-tratamiento-de-datos") {
    return <PrivacyPolicyPage />;
  }

  switch (segments[0]) {
    case "about-us":
      return <AboutUsPage />;
    case "become-an-encrypted-partner":
      return <BecomeEncryptedPartnerPage />;
    case "blog":
      return <BlogIndexPage />;
    case "encrypted-phones-distributors":
      return <EncryptedPhonesDistributorsPage />;
    case "fast-delivery":
      return <FastDeliveryPage />;
    case "identity-verification":
      return <IdentityVerificationPage params={pageParams} />;
    case "news":
      return <NewsPage />;
    case "offers":
      return <OffersPage />;
    case "security-test":
      return <SecurityTestPage />;
    case "where-to-find-encrypted":
      return <WhereToFindEncryptedPage params={pageParams} />;
    case "where-to-find-us":
      return <WhereToFindUsPage />;
    default:
      return notFound();
  }
}

export default async function LegacyCurrentPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const target = firstParam(sp.target);
  const parsed = target ? parseTarget(target) : null;

  if (!parsed) notFound();

  const locale = normalizeLocale(parsed.locale);
  const messages = await loadMessages(locale);
  const content = await renderTarget(locale, parsed.segments);

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppMobileProvider>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileLayout header={<CurrentHeader />} footer={<FooterEncrypted />}>
              {content}
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
