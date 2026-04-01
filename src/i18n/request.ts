import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Locale } from "@/shared/types/Locale";

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the requested locale
  const locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../messages/en.json")
        : import(`../../messages/${locale}.json`))
    ).default,
  };
});
