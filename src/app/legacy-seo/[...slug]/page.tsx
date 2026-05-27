import type { Metadata } from "next";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
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
import { fetchLegacySeoPage } from "@/shared/seo/legacyContent";
import { buildSeoMetadata } from "@/shared/seo/metadata";
import type { SeoLocale } from "@/shared/seo/constants";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(searchParams: Record<string, string | string[] | undefined>, key: string): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function normalizeLocale(value: string | undefined): SeoLocale {
  if (value === "en" || value === "fr" || value === "it" || value === "pt") return value;
  return "es";
}

function getHome(locale: SeoLocale): string {
  return locale === "es" ? "/" : `/${locale}`;
}

function formatDate(date: string | undefined, locale: SeoLocale): string | null {
  if (!date) return null;
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return null;
  return value.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getPageData(params: PageProps["params"], searchParams: PageProps["searchParams"]) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const locale = normalizeLocale(getParam(sp, "legacyLocale"));
  const legacyPath = getParam(sp, "legacyPath");

  if (!legacyPath) return null;

  const pageSlug = slug.join("/");
  const page = await fetchLegacySeoPage(pageSlug, locale);

  return page ? { page, locale, legacyPath } : null;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const data = await getPageData(params, searchParams);

  if (!data) {
    return buildSeoMetadata({
      title: "Encriptados",
      canonicalPath: "/",
      locale: "es",
      robots: { index: false, follow: true },
    });
  }

  return buildSeoMetadata({
    title: data.page.title,
    description: data.page.description,
    canonicalPath: data.legacyPath,
    locale: data.locale,
    type: "article",
    publishedTime: data.page.date,
    modifiedTime: data.page.modified,
    authors: [data.page.author],
    image: data.page.image
      ? {
          url: data.page.image,
          alt: data.page.title,
          width: 1200,
          height: 630,
        }
      : undefined,
    keywords: [data.page.title, "seguridad digital", "comunicacion segura", "Encriptados"],
  });
}

export default async function LegacySeoPage({ params, searchParams }: PageProps) {
  const data = await getPageData(params, searchParams);

  if (!data) notFound();

  const { page, locale } = data;
  const homeHref = getHome(locale);
  const messages = await loadMessages(locale);
  const publishedDate = formatDate(page.date, locale);
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppMobileProvider>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileLayout header={<CurrentHeader />} footer={<FooterEncrypted />}>
              <main className="min-h-screen bg-[#F5F8FA] text-[#111827]">
                <article className="mx-auto w-full max-w-4xl px-5 py-10 md:px-8 md:py-14">
                  <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#64748B]" aria-label="Breadcrumb">
                    <Link href={homeHref} className="hover:text-[#057C8D]">
                      Encriptados
                    </Link>
                    <span>/</span>
                    <span className="text-[#111827]">Contenido</span>
                  </nav>

                  <header className="border-b border-[#DDE6EE] pb-8">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#057C8D]">Encriptados</p>
                    <h1 className="text-3xl font-semibold leading-tight text-[#111827] md:text-5xl">{page.title}</h1>
                    {(publishedDate || page.author) && (
                      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                        {page.author && <span>{page.author}</span>}
                        {publishedDate && (
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" aria-hidden="true" />
                            {publishedDate}
                          </span>
                        )}
                      </div>
                    )}
                  </header>

                  <div
                    className="legacy-seo-content mt-8 max-w-none text-[#334155] [&_a]:font-semibold [&_a]:text-[#057C8D] [&_blockquote]:border-l-4 [&_blockquote]:border-[#35CDFB] [&_blockquote]:bg-white [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-[#475569] [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#111827] [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#111827] [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_li]:my-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_p]:text-base [&_p]:leading-8 [&_strong]:text-[#111827] [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#DDE6EE] [&_td]:p-3 [&_th]:border [&_th]:border-[#DDE6EE] [&_th]:bg-white [&_th]:p-3 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
                    dangerouslySetInnerHTML={{
                      __html: page.content
                        .replace(/href="https?:\/\/(?:www\.)?encriptados\.(?:net|io|es|co)(\/[^"]*)"/gi, 'href="$1"')
                        .replace(/href="https?:\/\/(?:www\.)?encriptados\.(?:net|io|es|co)"/gi, 'href="/"')
                    }}
                  />

                  <style>{`
                    .legacy-seo-content .legacy-preview-image {
                      display: block;
                      width: min(100%, 720px);
                      height: auto;
                      margin: 28px auto;
                      border-radius: 12px;
                    }

                    .legacy-seo-content .elementor-element-b195de0 > .e-con-inner {
                      display: grid;
                      grid-template-columns: repeat(3, minmax(0, 1fr));
                      gap: 16px;
                      margin-top: 16px;
                    }

                    .legacy-seo-content .elementor-element-b195de0 .e-con-full {
                      display: flex;
                      min-height: 150px;
                      flex-direction: column;
                      justify-content: space-between;
                      gap: 14px;
                      border: 1px solid #DDE6EE;
                      border-radius: 8px;
                      background: #fff;
                      padding: 18px;
                    }

                    .legacy-seo-content .elementor-element-b195de0 h2 {
                      margin: 0;
                      font-size: 18px;
                      line-height: 1.25;
                    }

                    .legacy-seo-content .elementor-element-b195de0 a {
                      display: inline-flex;
                      width: fit-content;
                      align-items: center;
                      justify-content: center;
                      border-radius: 999px;
                      background: #061014;
                      padding: 9px 16px;
                      color: #fff;
                      font-size: 14px;
                      font-weight: 700;
                      text-decoration: none;
                    }

                    .legacy-seo-content .elementor-spacer,
                    .legacy-seo-content .elementor-spacer-inner {
                      display: none;
                    }

                    @media (max-width: 768px) {
                      .legacy-seo-content .elementor-element-b195de0 > .e-con-inner {
                        grid-template-columns: 1fr;
                      }
                    }
                  `}</style>

                  <div className="mt-12 border-t border-[#DDE6EE] pt-8">
                    <Link
                      href={homeHref}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-[#15262A]"
                    >
                      Volver a Encriptados
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </main>
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