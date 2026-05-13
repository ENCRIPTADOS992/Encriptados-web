import fs from "node:fs";
import path from "node:path";

const locales = ["en", "es", "fr", "it", "pt"];
const namespaces = [
  ["AppTerms", "app-terms"],
  ["DashboardPage", "dashboard-page"],
  ["DeliveryPage", "delivery-page"],
  ["paymentModal", "payment-modal"],
  ["PaymentServicePage", "payment-service-page"],
  ["PlaceholderPages", "placeholder-pages"],
  ["RouterUi", "router-ui"],
  ["SharedUi", "shared-ui"],
];

const messagesDir = path.join(process.cwd(), "messages");
const modulesDir = path.join(messagesDir, "modules");

for (const locale of locales) {
  const rootFile = path.join(messagesDir, `${locale}.json`);
  const localeDir = path.join(modulesDir, locale);
  const root = JSON.parse(fs.readFileSync(rootFile, "utf8"));

  fs.mkdirSync(localeDir, { recursive: true });

  for (const [namespace, fileName] of namespaces) {
    if (!(namespace in root)) continue;

    const moduleFile = path.join(localeDir, `${fileName}.json`);
    fs.writeFileSync(
      moduleFile,
      `${JSON.stringify({ [namespace]: root[namespace] }, null, 2)}\n`,
      "utf8"
    );

    delete root[namespace];
  }

  fs.writeFileSync(rootFile, `${JSON.stringify(root, null, 2)}\n`, "utf8");
}

for (const locale of locales) {
  if (locale === "en") continue;

  const localeDir = path.join(modulesDir, locale);

  for (const [, fileName] of namespaces) {
    const moduleFile = path.join(localeDir, `${fileName}.json`);
    const fallbackFile = path.join(modulesDir, "en", `${fileName}.json`);

    if (!fs.existsSync(moduleFile) && fs.existsSync(fallbackFile)) {
      fs.copyFileSync(fallbackFile, moduleFile);
    }
  }
}