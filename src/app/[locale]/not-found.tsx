import NotFoundPage from "@/shared/components/NotFoundPage";
import { headers } from "next/headers";

export default async function LocaleNotFound() {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") || "es";
  return <NotFoundPage locale={locale} />;
}
