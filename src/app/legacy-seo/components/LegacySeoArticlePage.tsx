import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
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
import type { LegacySeoPageContent } from "@/shared/seo/legacyContent";
import type { SeoLocale } from "@/shared/seo/constants";
import styles from "@/app/[locale]/blog/components/BlogTemplate.module.css";
import LegacyBlogBannerClient from "@/app/legacy-seo/[...slug]/components/LegacyBlogBannerClient";
import LegacyPreviousPostsClient from "@/app/legacy-seo/[...slug]/components/LegacyPreviousPostsClient";

type Props = {
  page: LegacySeoPageContent;
  locale: SeoLocale;
  legacyPath: string;
};

function normalizeLegacyInternalLinks(html: string): string {
  return html
    .replace(/href="https?:\/\/(?:[\w-]+\.)?encriptados\.(?:net|io|es|co)(\/[^"]*)"/gi, 'href="$1"')
    .replace(/href="https?:\/\/(?:[\w-]+\.)?encriptados\.(?:net|io|es|co)"/gi, 'href="/"');
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

export default async function LegacySeoArticlePage({ page, locale, legacyPath }: Props) {
  const homeHref = getHome(locale);
  const messages = await loadMessages(locale);
  const publishedDate = formatDate(page.date, locale);
  const currentPostSlug = legacyPath.split("/").filter(Boolean).pop() || "";

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppMobileProvider>
        <ModalPaymentProvider>
          <StripeProvider>
            <AppMobileLayout header={<CurrentHeader />} footer={<FooterEncrypted />}>
              <main className="min-h-screen bg-black text-white/90">
                <LegacyBlogBannerClient title={page.title} />

                <div className="relative flex w-full flex-col items-center justify-center gap-10 overflow-hidden bg-black px-4 py-10 md:py-16">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

                  <div className="w-full max-w-[1239px] mx-auto flex flex-col items-start gap-8 lg:flex-row">
                    <div className="w-full lg:flex-1">
                      <div className={`${styles.fadeUp} mx-auto w-full max-w-5xl rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8 lg:p-10`}>
                        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
                          <Link href={homeHref} className="hover:text-cyan-400 transition-colors">
                            Encriptados
                          </Link>
                          <span>/</span>
                          <span className="text-white">Contenido</span>
                        </nav>

                        {page.image && (
                          <div className="group relative mb-8 aspect-[1199/629] w-full overflow-hidden rounded-[22px] bg-[#101010] shadow-[0_18px_70px_rgba(0,0,0,0.32)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={page.image}
                              alt={page.title}
                              className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          </div>
                        )}

                        <header className="border-b border-white/10 pb-8">
                          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">Encriptados</p>
                          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">{page.title}</h1>
                          {(publishedDate || page.author) && (
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/55">
                              {page.author && (
                                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-cyan-100">
                                  {page.author}
                                </span>
                              )}
                              {publishedDate && (
                                <span className="inline-flex items-center gap-2 ml-2">
                                  <CalendarDays className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                                  {publishedDate}
                                </span>
                              )}
                            </div>
                          )}
                        </header>

                        {page.content.trim() ? (
                          <article
                            className="prose prose-invert max-w-none text-white/78 prose-headings:font-bold prose-headings:text-white prose-h2:mt-12 prose-h2:text-[30px] prose-h2:leading-[1.25] prose-h3:text-[24px] prose-h3:leading-[1.35] prose-p:text-base prose-p:leading-8 prose-a:text-cyan-200 prose-a:no-underline hover:prose-a:text-cyan-100 prose-img:rounded-[18px] prose-img:border prose-img:border-white/10 prose-img:shadow-[0_18px_60px_rgba(0,0,0,0.28)] prose-blockquote:border-cyan-300/60 prose-blockquote:bg-white/[0.04] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-white/80 mt-8"
                            dangerouslySetInnerHTML={{
                              __html: normalizeLegacyInternalLinks(page.content),
                            }}
                          />
                        ) : (
                          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">
                            <p>El contenido de esta pagina no esta disponible en este momento.</p>
                            <Link href={homeHref} className="mt-4 inline-block text-cyan-300 hover:text-cyan-100">
                              Volver a Encriptados
                            </Link>
                          </div>
                        )}

                        <div className="mt-12 border-t border-white/10 pt-8">
                          <Link
                            href={homeHref}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
                          >
                            Volver a Encriptados
                            <ArrowRight className="h-5 w-5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <aside className="w-full lg:sticky lg:top-24 lg:w-[360px] xl:w-[390px]">
                      <LegacyPreviousPostsClient locale={locale} currentPostSlug={currentPostSlug} />
                    </aside>
                  </div>

                </div>
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
