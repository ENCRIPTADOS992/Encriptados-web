import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

type NotFoundPageProps = {
  homeHref?: string;
};

export default function NotFoundPage({ homeHref = "/" }: NotFoundPageProps) {
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

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#35CDFB]">Error 404</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              No encontramos esta pagina
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              La direccion puede haber cambiado o ya no estar disponible. Puedes volver al inicio para continuar navegando.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={homeHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#35CDFB] px-6 py-3 font-semibold text-[#061014] transition hover:bg-[#7EE0FF]"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
