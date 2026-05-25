import { PRODUCT_CATEGORY_IDS, isRouterCategoryId } from "@/shared/constants/productCategories";

export type FormType =
  | "SILENT_PHONE"
  | "APP_RONING"
  | "SOFTWARE_LICENSE"
  | "SOFTWARE_WITH_OS"
  | "SIM_FORM";

export type LicenseTabType = "three_way" | "new_renew" | "none";

export interface FormPolicy {
  formType: FormType;
  showLicenseTabs: boolean;
  licenseTabType: LicenseTabType;
  showOsSelector: boolean;
  showUsernameFields: boolean;
  showEmailField: boolean;
  showTelegramField: boolean;
  emailLabel: string;
  emailPlaceholder: string;
  paymentMethods: ("card" | "crypto")[];
}

export const FORM_POLICIES: Record<FormType, FormPolicy> = {
  SILENT_PHONE: {
    formType: "SILENT_PHONE",
    showLicenseTabs: true,
    licenseTabType: "three_way",
    showOsSelector: false,
    showUsernameFields: true,
    showEmailField: true,
    showTelegramField: false,
    emailLabel: "Correo electronico para recibir licencia",
    emailPlaceholder: "Email",
    paymentMethods: ["card", "crypto"],
  },
  APP_RONING: {
    formType: "APP_RONING",
    showLicenseTabs: false,
    licenseTabType: "none",
    showOsSelector: false,
    showUsernameFields: false,
    showEmailField: true,
    showTelegramField: false,
    emailLabel: "Correo electronico para recibir tu licencia",
    emailPlaceholder: "Email",
    paymentMethods: ["card", "crypto"],
  },
  SOFTWARE_LICENSE: {
    formType: "SOFTWARE_LICENSE",
    showLicenseTabs: true,
    licenseTabType: "new_renew",
    showOsSelector: false,
    showUsernameFields: false,
    showEmailField: true,
    showTelegramField: false,
    emailLabel: "Correo electronico para recibir licencia",
    emailPlaceholder: "Ingresa tu Email",
    paymentMethods: ["card", "crypto"],
  },
  SOFTWARE_WITH_OS: {
    formType: "SOFTWARE_WITH_OS",
    showLicenseTabs: true,
    licenseTabType: "new_renew",
    showOsSelector: true,
    showUsernameFields: false,
    showEmailField: true,
    showTelegramField: false,
    emailLabel: "Correo electronico para recibir licencia",
    emailPlaceholder: "Ingresa tu Email",
    paymentMethods: ["card", "crypto"],
  },
  SIM_FORM: {
    formType: "SIM_FORM",
    showLicenseTabs: false,
    licenseTabType: "none",
    showOsSelector: false,
    showUsernameFields: false,
    showEmailField: true,
    showTelegramField: false,
    emailLabel: "Correo electronico",
    emailPlaceholder: "Email",
    paymentMethods: ["card", "crypto"],
  },
};

export const PRODUCT_FORM_MAPPING: Record<string, FormType> = {
  "silent phone": "SILENT_PHONE",
  securecrypt: "SOFTWARE_WITH_OS",
};

const SYSTEMS_HIDE_TELEGRAM_NAMES = [
  "secure mdm iphone",
  "secure mdm android",
  "cryptcom",
  "renati",
  "chatmail",
  "armadillo",
  "vaultchat",
  "ultra x",
  "intact phone",
  "dec secure",
  "securecrypt",
];

const SYSTEMS_SUPPORT_ONLY_NAMES = [
  "armadillo",
  "vaultchat",
  "ultra x",
  "intact phone",
  "dec secure",
];

const APPS_SUPPORT_ONLY_NAMES = ["vaultchat", "vnc lagoon", "salt"];

function shouldHideTelegramField(productName: string, categoryId: number): boolean {
  if (categoryId !== PRODUCT_CATEGORY_IDS.SOFTWARE) return false;
  const nameLower = productName.toLowerCase().trim();
  return SYSTEMS_HIDE_TELEGRAM_NAMES.some((k) => nameLower.includes(k));
}

function shouldUseSupportOnly(productName: string, categoryId: number): boolean {
  const nameLower = productName.toLowerCase().trim();
  if (nameLower.includes("armadillo chat")) return false;
  if (categoryId === PRODUCT_CATEGORY_IDS.APPS) {
    return APPS_SUPPORT_ONLY_NAMES.some((k) => nameLower.includes(k));
  }
  if (categoryId === PRODUCT_CATEGORY_IDS.SOFTWARE) {
    return SYSTEMS_SUPPORT_ONLY_NAMES.some((k) => nameLower.includes(k));
  }
  return SYSTEMS_SUPPORT_ONLY_NAMES.some((k) => nameLower.includes(k));
}

export function getFormTypeForProduct(
  productName: string,
  categoryId: number
): FormType {
  const nameLower = productName.toLowerCase().trim();

  if (nameLower.includes("activar app")) {
    return "APP_RONING";
  }

  for (const [key, formType] of Object.entries(PRODUCT_FORM_MAPPING)) {
    if (nameLower.includes(key)) {
      return formType;
    }
  }

  switch (categoryId) {
    case PRODUCT_CATEGORY_IDS.APPS:
      return "APP_RONING";
    case PRODUCT_CATEGORY_IDS.SOFTWARE:
      return "SOFTWARE_LICENSE";
    case PRODUCT_CATEGORY_IDS.SIMS:
      return "SIM_FORM";
    case PRODUCT_CATEGORY_IDS.ACTIVATE_APPS:
      return "APP_RONING";
    default:
      return "APP_RONING";
  }
}

export function getFormPolicyForProduct(
  productName: string,
  categoryId: number
): FormPolicy {
  const formType = getFormTypeForProduct(productName, categoryId);
  const base = FORM_POLICIES[formType];

  if (!base) return FORM_POLICIES.APP_RONING;

  if (isRouterCategoryId(categoryId)) {
    return {
      ...base,
      emailLabel: "Correo electronico",
      emailPlaceholder: "Email",
    };
  }

  if (shouldUseSupportOnly(productName, categoryId)) {
    return {
      ...base,
      showLicenseTabs: false,
      licenseTabType: "none",
      showOsSelector: false,
      showUsernameFields: false,
      showEmailField: false,
      showTelegramField: false,
      paymentMethods: [],
    };
  }

  if (shouldHideTelegramField(productName, categoryId) && base.showTelegramField) {
    return { ...base, showTelegramField: false };
  }

  return base;
}
