import React from 'react';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const IdentityVerificationPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PlaceholderPages' });

  return <div>{t('identityVerification')}</div>;
};

export default IdentityVerificationPage;