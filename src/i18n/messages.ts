import { Locale } from "@/shared/types/Locale";

type MessageRecord = Record<string, any>;
type MessageModule = { default: MessageRecord };
type MessageLoader = () => Promise<MessageModule>;

const loaders: Record<Locale, MessageLoader[]> = {
  en: [
    () => import("../../messages/en.json"),
    () => import("../../messages/modules/en/app-terms.json"),
    () => import("../../messages/modules/en/dashboard-page.json"),
    () => import("../../messages/modules/en/delivery-page.json"),
    () => import("../../messages/modules/en/payment-modal.json"),
    () => import("../../messages/modules/en/payment-service-page.json"),
    () => import("../../messages/modules/en/placeholder-pages.json"),
    () => import("../../messages/modules/en/router-ui.json"),
    () => import("../../messages/modules/en/shared-ui.json"),
  ],
  es: [
    () => import("../../messages/es.json"),
    () => import("../../messages/modules/es/app-terms.json"),
    () => import("../../messages/modules/es/dashboard-page.json"),
    () => import("../../messages/modules/es/delivery-page.json"),
    () => import("../../messages/modules/es/payment-modal.json"),
    () => import("../../messages/modules/es/payment-service-page.json"),
    () => import("../../messages/modules/es/placeholder-pages.json"),
    () => import("../../messages/modules/es/router-ui.json"),
    () => import("../../messages/modules/es/shared-ui.json"),
  ],
  fr: [
    () => import("../../messages/fr.json"),
    () => import("../../messages/modules/fr/app-terms.json"),
    () => import("../../messages/modules/fr/dashboard-page.json"),
    () => import("../../messages/modules/fr/delivery-page.json"),
    () => import("../../messages/modules/fr/payment-modal.json"),
    () => import("../../messages/modules/fr/payment-service-page.json"),
    () => import("../../messages/modules/fr/placeholder-pages.json"),
    () => import("../../messages/modules/fr/router-ui.json"),
    () => import("../../messages/modules/fr/shared-ui.json"),
  ],
  it: [
    () => import("../../messages/it.json"),
    () => import("../../messages/modules/it/app-terms.json"),
    () => import("../../messages/modules/it/dashboard-page.json"),
    () => import("../../messages/modules/it/delivery-page.json"),
    () => import("../../messages/modules/it/payment-modal.json"),
    () => import("../../messages/modules/it/payment-service-page.json"),
    () => import("../../messages/modules/it/placeholder-pages.json"),
    () => import("../../messages/modules/it/router-ui.json"),
    () => import("../../messages/modules/it/shared-ui.json"),
  ],
  pt: [
    () => import("../../messages/pt.json"),
    () => import("../../messages/modules/pt/app-terms.json"),
    () => import("../../messages/modules/pt/dashboard-page.json"),
    () => import("../../messages/modules/pt/delivery-page.json"),
    () => import("../../messages/modules/pt/payment-modal.json"),
    () => import("../../messages/modules/pt/payment-service-page.json"),
    () => import("../../messages/modules/pt/placeholder-pages.json"),
    () => import("../../messages/modules/pt/router-ui.json"),
    () => import("../../messages/modules/pt/shared-ui.json"),
  ],
};

function isRecord(value: unknown): value is MessageRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(target: MessageRecord, source: MessageRecord): MessageRecord {
  const result: MessageRecord = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const currentValue = result[key];

    result[key] = isRecord(currentValue) && isRecord(value)
      ? deepMerge(currentValue, value)
      : value;
  }

  return result;
}

export async function loadMessages(locale: Locale) {
  const modules = await Promise.all(loaders[locale].map((load) => load()));

  return modules.reduce<MessageRecord>(
    (messages, module) => deepMerge(messages, module.default),
    {}
  );
}