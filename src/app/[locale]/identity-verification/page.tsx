import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildSeoMetadata } from '@/shared/seo/metadata';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale || "es";

  return buildSeoMetadata({
    title: "Identity Verification",
    description: "Verificacion de identidad en Encriptados para garantizar la seguridad de tu cuenta.",
    canonicalPath: `/${safeLocale}/identity-verification`,
    locale: safeLocale,
  });
}

const IdentityVerificationPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PlaceholderPages' });

  return <div>{t('identityVerification')}</div>;
};

export default IdentityVerificationPage;