import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildSeoMetadata, buildLocalizedLanguageAlternates } from '@/shared/seo/metadata';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const COPY = {
  es: {
    title: "Verificacion de identidad",
    description: "Verificacion de identidad en Encriptados para garantizar la seguridad de tu cuenta y proteger tus comunicaciones.",
  },
  en: {
    title: "Identity Verification",
    description: "Identity verification at Encriptados to ensure account security and protect your communications.",
  },
  fr: {
    title: "Verification d'identite",
    description: "Verification d'identite chez Encriptados pour garantir la securite de votre compte et proteger vos communications.",
  },
  it: {
    title: "Verifica dell'identita",
    description: "Verifica dell'identita su Encriptados per garantire la sicurezza del tuo account e proteggere le tue comunicazioni.",
  },
  pt: {
    title: "Verificacao de identidade",
    description: "Verificacao de identidade na Encriptados para garantir a seguranca da sua conta e proteger suas comunicacoes.",
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale in COPY ? (locale as keyof typeof COPY) : "es";

  return buildSeoMetadata({
    title: COPY[safeLocale].title,
    description: COPY[safeLocale].description,
    canonicalPath: `/${safeLocale}/identity-verification`,
    locale: safeLocale,
    languages: buildLocalizedLanguageAlternates("/identity-verification"),
  });
}

const IdentityVerificationPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PlaceholderPages' });

  return <div>{t('identityVerification')}</div>;
};

export default IdentityVerificationPage;
