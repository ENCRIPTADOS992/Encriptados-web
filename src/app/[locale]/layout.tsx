import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import FooterEncrypted from "@/shared/FooterEncrypted/FooterEncrypted";
import CurrentHeader from "@/shared/CurrentHeader";
import { InitAuthClient } from "@/shared/InitAuthClient";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <>
      <InitAuthClient />
      <NextIntlClientProvider messages={messages}>
        <CurrentHeader />
        {children}
        <FooterEncrypted />
      </NextIntlClientProvider>
    </>
  );
}
