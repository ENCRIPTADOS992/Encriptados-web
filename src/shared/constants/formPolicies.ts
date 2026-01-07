// src/shared/constants/formPolicies.ts
/**
 * Sistema robusto de políticas de formularios para el modal de compra.
 * Define exactamente qué campos y secciones mostrar según el tipo de producto.
 * 
 * TIPOS DE FORMULARIO:
 * 1. SILENT_PHONE (Silent Phone - Aplicación especial):
 *    - Tabs: "Quiero mi usuario", "Código RONING", "Recargar"
 *    - Campo: Nombres sugeridos (usernames)
 *    - Campo: Email para recibir licencia
 *    - Métodos de pago
 * 
 * 2. APP_RONING (Resto de Aplicaciones cat 38):
 *    - Sin tabs
 *    - Campo: Email para código Roning
 *    - Métodos de pago
 * 
 * 3. SOFTWARE_LICENSE (Software cat 35 - General):
 *    - Tabs: "Nueva licencia", "Renovar licencia"
 *    - Campo: Email
 *    - Campo: Telegram (opcional)
 *    - Métodos de pago
 * 
 * 4. SOFTWARE_WITH_OS (SecureCrypt - Software especial):
 *    - Selector: Sistema operativo (Android/iOS)
 *    - Tabs: "Nueva licencia", "Renovar licencia"
 *    - Campo: Email
 *    - Campo: Telegram (opcional)
 *    - Métodos de pago
 */

export type FormType = 
  | "SILENT_PHONE"      // Silent Phone con tabs de 3 opciones + usernames
  | "APP_RONING"        // Apps normales: solo email para código Roning
  | "SOFTWARE_LICENSE"  // Software con tabs Nueva/Renovar + email + telegram
  | "SOFTWARE_WITH_OS"  // SecureCrypt: selector SO + tabs + email + telegram
  | "SIM_FORM";         // SIMs: formulario específico de SIM

export type LicenseTabType = 
  | "three_way"   // Quiero mi usuario, Código RONING, Recargar
  | "new_renew"   // Nueva licencia, Renovar licencia
  | "none";       // Sin tabs

export interface FormPolicy {
  formType: FormType;
  
  // Tabs de licencia
  showLicenseTabs: boolean;
  licenseTabType: LicenseTabType;
  
  // Selector de SO (solo para SecureCrypt)
  showOsSelector: boolean;
  
  // Campos de formulario
  showUsernameFields: boolean;      // Nombres sugeridos (Silent Phone)
  showEmailField: boolean;          // Email siempre requerido
  showTelegramField: boolean;       // ID Telegram opcional
  
  // Labels personalizados
  emailLabel: string;
  emailPlaceholder: string;
  
  // Métodos de pago disponibles
  paymentMethods: ("card" | "crypto")[];
}

// Políticas por defecto para cada tipo de formulario
export const FORM_POLICIES: Record<FormType, FormPolicy> = {
  SILENT_PHONE: {
    formType: "SILENT_PHONE",
    showLicenseTabs: true,
    licenseTabType: "three_way",
    showOsSelector: false,
    showUsernameFields: true,
    showEmailField: true,
    showTelegramField: false,
    emailLabel: "Correo electrónico para recibir licencia",
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
    emailLabel: "Correo electrónico para recibir mi código Roning",
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
    showTelegramField: true,
    emailLabel: "Correo electrónico para recibir licencia",
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
    showTelegramField: true,
    emailLabel: "Correo electrónico para recibir licencia",
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
    showTelegramField: true,
    emailLabel: "Correo electrónico",
    emailPlaceholder: "Email",
    paymentMethods: ["card", "crypto"],
  },
};

// Nombres de productos que usan cada tipo de formulario
export const PRODUCT_FORM_MAPPING: Record<string, FormType> = {
  // Silent Phone - formulario especial con 3 tabs y usernames
  "silent phone": "SILENT_PHONE",
  
  // SecureCrypt - formulario con selector de SO
  "securecrypt": "SOFTWARE_WITH_OS",
  
  // El resto se determina por categoría
};

/**
 * Determina el tipo de formulario basándose en el nombre del producto y la categoría
 */
export function getFormTypeForProduct(
  productName: string,
  categoryId: number
): FormType {
  const nameLower = productName.toLowerCase().trim();
  
  // 1. Verificar mapeo directo por nombre
  for (const [key, formType] of Object.entries(PRODUCT_FORM_MAPPING)) {
    if (nameLower.includes(key)) {
      return formType;
    }
  }
  
  // 2. Determinar por categoría
  switch (categoryId) {
    case 38: // Aplicaciones
      return "APP_RONING";
    case 35: // Software/Sistemas
      return "SOFTWARE_LICENSE";
    case 40: // SIMs
      return "SIM_FORM";
    default:
      return "APP_RONING";
  }
}

/**
 * Obtiene la política de formulario completa para un producto
 */
export function getFormPolicyForProduct(
  productName: string,
  categoryId: number
): FormPolicy {
  const formType = getFormTypeForProduct(productName, categoryId);
  return FORM_POLICIES[formType];
}
