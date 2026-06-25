type DownloadAppLocale = "es" | "en" | "fr" | "it" | "pt"

type DownloadAppFeatureCopy = {
    anonymousSignup: string
    fastPurchases: string
    instantLicenses: string
    balanceAndSims: string
    appActivations: string
    multilingualSupport: string
}

type DownloadAppCopy = {
    buttonLine1: string
    buttonLine2: string
    newTag: string
    benefitsTag: string
    downloadCta: string
    titleLine1: string
    titleLine2: string
    qrLabel: string
    closeModal: string
    qrAlt: string
    appAlt: string
    features: DownloadAppFeatureCopy
}

const DOWNLOAD_APP_COPY: Record<DownloadAppLocale, DownloadAppCopy> = {
    es: {
        buttonLine1: "Descarga la",
        buttonLine2: "App Encriptados",
        newTag: "NUEVO",
        benefitsTag: "Beneficios:",
        downloadCta: "Descarga la nueva App",
        titleLine1: "Más privacidad. Más",
        titleLine2: "control. Más fácil.",
        qrLabel: "Escanear QR",
        closeModal: "Cerrar modal",
        qrAlt: "Código QR para descargar la App Encriptados",
        appAlt: "App Encriptados",
        features: {
            anonymousSignup: "Registro anónimo, sin datos personales",
            fastPurchases: "Compra servicios en segundos",
            instantLicenses: "Recibe tus licencias automáticamente",
            balanceAndSims: "Gestiona saldo, SIMs y eSIMs",
            appActivations: "Activa aplicaciones de mensajería y más",
            multilingualSupport: "Soporte multidioma desde la app"
        }
    },
    en: {
        buttonLine1: "Download the",
        buttonLine2: "Encriptados App",
        newTag: "NEW",
        benefitsTag: "Benefits:",
        downloadCta: "Download the new App",
        titleLine1: "More privacy. More",
        titleLine2: "control. Easier.",
        qrLabel: "Scan QR",
        closeModal: "Close modal",
        qrAlt: "QR code to download the Encriptados App",
        appAlt: "Encriptados App",
        features: {
            anonymousSignup: "Anonymous signup, no personal data",
            fastPurchases: "Buy services in seconds",
            instantLicenses: "Receive your licenses automatically",
            balanceAndSims: "Manage balance, SIMs and eSIMs",
            appActivations: "Activate messaging apps and more",
            multilingualSupport: "Multilingual support from the app"
        }
    },
    fr: {
        buttonLine1: "Téléchargez",
        buttonLine2: "l'app Encriptados",
        newTag: "NOUVEAU",
        benefitsTag: "Avantages :",
        downloadCta: "Téléchargez la nouvelle app",
        titleLine1: "Plus de confidentialité. Plus de",
        titleLine2: "contrôle. Plus simple.",
        qrLabel: "Scanner le QR",
        closeModal: "Fermer la fenêtre",
        qrAlt: "Code QR pour télécharger l'app Encriptados",
        appAlt: "App Encriptados",
        features: {
            anonymousSignup: "Inscription anonyme, sans données personnelles",
            fastPurchases: "Achetez des services en quelques secondes",
            instantLicenses: "Recevez vos licences automatiquement",
            balanceAndSims: "Gérez le solde, les SIM et les eSIM",
            appActivations: "Activez les applications de messagerie et plus encore",
            multilingualSupport: "Support multilingue depuis l'app"
        }
    },
    it: {
        buttonLine1: "Scarica",
        buttonLine2: "l'app Encriptados",
        newTag: "NUOVO",
        benefitsTag: "Vantaggi:",
        downloadCta: "Scarica la nuova app",
        titleLine1: "Più privacy. Più",
        titleLine2: "controllo. Più facile.",
        qrLabel: "Scansiona QR",
        closeModal: "Chiudi finestra",
        qrAlt: "Codice QR per scaricare l'app Encriptados",
        appAlt: "App Encriptados",
        features: {
            anonymousSignup: "Registrazione anonima, senza dati personali",
            fastPurchases: "Acquista servizi in pochi secondi",
            instantLicenses: "Ricevi automaticamente le tue licenze",
            balanceAndSims: "Gestisci saldo, SIM ed eSIM",
            appActivations: "Attiva app di messaggistica e altro",
            multilingualSupport: "Supporto multilingua dall'app"
        }
    },
    pt: {
        buttonLine1: "Baixe o",
        buttonLine2: "App Encriptados",
        newTag: "NOVO",
        benefitsTag: "Benefícios:",
        downloadCta: "Baixe o novo App",
        titleLine1: "Mais privacidade. Mais",
        titleLine2: "controle. Mais fácil.",
        qrLabel: "Escanear QR",
        closeModal: "Fechar modal",
        qrAlt: "Código QR para baixar o App Encriptados",
        appAlt: "App Encriptados",
        features: {
            anonymousSignup: "Cadastro anônimo, sem dados pessoais",
            fastPurchases: "Compre serviços em segundos",
            instantLicenses: "Receba suas licenças automaticamente",
            balanceAndSims: "Gerencie saldo, SIMs e eSIMs",
            appActivations: "Ative aplicativos de mensagens e mais",
            multilingualSupport: "Suporte multilíngue pelo app"
        }
    }
}

function normalizeLocale(locale: string): DownloadAppLocale {
    if (locale === "en" || locale === "fr" || locale === "it" || locale === "pt") {
        return locale
    }

    return "es"
}

function resolveTranslatedValue(value: string, fallback: string) {
    return value.startsWith("SharedUi.downloadApp.") ? fallback : value
}

export function getDownloadAppCopy(locale: string, translate: (key: string) => string) {
    const fallback = DOWNLOAD_APP_COPY[normalizeLocale(locale)]

    return {
        buttonLine1: resolveTranslatedValue(translate("buttonLine1"), fallback.buttonLine1),
        buttonLine2: resolveTranslatedValue(translate("buttonLine2"), fallback.buttonLine2),
        newTag: resolveTranslatedValue(translate("newTag"), fallback.newTag),
        benefitsTag: resolveTranslatedValue(translate("benefitsTag"), fallback.benefitsTag),
        downloadCta: resolveTranslatedValue(translate("downloadCta"), fallback.downloadCta),
        titleLine1: resolveTranslatedValue(translate("titleLine1"), fallback.titleLine1),
        titleLine2: resolveTranslatedValue(translate("titleLine2"), fallback.titleLine2),
        qrLabel: resolveTranslatedValue(translate("qrLabel"), fallback.qrLabel),
        closeModal: resolveTranslatedValue(translate("closeModal"), fallback.closeModal),
        qrAlt: resolveTranslatedValue(translate("qrAlt"), fallback.qrAlt),
        appAlt: resolveTranslatedValue(translate("appAlt"), fallback.appAlt),
        features: {
            anonymousSignup: resolveTranslatedValue(translate("features.anonymousSignup"), fallback.features.anonymousSignup),
            fastPurchases: resolveTranslatedValue(translate("features.fastPurchases"), fallback.features.fastPurchases),
            instantLicenses: resolveTranslatedValue(translate("features.instantLicenses"), fallback.features.instantLicenses),
            balanceAndSims: resolveTranslatedValue(translate("features.balanceAndSims"), fallback.features.balanceAndSims),
            appActivations: resolveTranslatedValue(translate("features.appActivations"), fallback.features.appActivations),
            multilingualSupport: resolveTranslatedValue(translate("features.multilingualSupport"), fallback.features.multilingualSupport)
        }
    }
}