import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

type NotFoundPageProps = {
  homeHref?: string;
  locale?: string;
};

const COPY: Record<string, { badge: string; title: string; description: string; button: string }> = {
  es: {
    badge: "Error 404",
    title: "No encontramos esta pagina",
    description: "La direccion puede haber cambiado o ya no estar disponible. Puedes volver al inicio para continuar navegando.",
    button: "Ir al inicio",
  },
  en: {
    badge: "Error 404",
    title: "Page not found",
    description: "The address may have changed or is no longer available. You can go back to the homepage to continue browsing.",
    button: "Go to homepage",
  },
  fr: {
    badge: "Erreur 404",
    title: "Page introuvable",
    description: "L'adresse a peut-etre change ou n'est plus disponible. Vous pouvez retourner a l'accueil pour continuer.",
    button: "Retour a l'accueil",
  },
  it: {
    badge: "Errore 404",
    title: "Pagina non trovata",
    description: "L'indirizzo potrebbe essere cambiato o non essere piu disponibile. Puoi tornare alla home per continuare.",
    button: "Vai alla home",
  },
  pt: {
    badge: "Erro 404",
    title: "Pagina nao encontrada",
    description: "O endereco pode ter mudado ou nao esta mais disponivel. Voce pode voltar ao inicio para continuar navegando.",
    button: "Ir para o inicio",
  },
};

export default function NotFoundPage({ homeHref = "/", locale = "es" }: NotFoundPageProps) {
  const copy = COPY[locale] || COPY.es;

  return (
    <main className="min-h-screen bg-[#050B0E] px-5 py-12 text-white md:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center justify-center">
        <div className="w-full">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-100">
              <Image
                src="/images/footer/encriptados-logo-201.png"
                alt="Encriptados"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                priority
              />
              Encriptados
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#35CDFB]">{copy.badge}</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={homeHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#35CDFB] px-6 py-3 font-semibold text-[#061014] transition hover:bg-[#7EE0FF]"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                {copy.button}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
