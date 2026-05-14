import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

type NotFoundPageProps = {
  homeHref?: string;
};

export default function NotFoundPage({ homeHref = "/" }: NotFoundPageProps) {
  return (
    <main className="min-h-screen bg-[#050B0E] px-5 py-12 text-white md:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
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
              La direccion puede haber cambiado o ya no estar disponible. Puedes volver al inicio o revisar nuestras soluciones de comunicacion segura.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={homeHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#35CDFB] px-6 py-3 font-semibold text-[#061014] transition hover:bg-[#7EE0FF]"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                Ir al inicio
              </Link>
              <Link
                href={`${homeHref === "/" ? "" : homeHref}/blog`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-[#35CDFB] hover:text-[#35CDFB]"
              >
                Ver contenido
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#35CDFB]/15 text-[#35CDFB]">
              <Search className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold">Tambien puedes explorar</h2>
            <div className="mt-5 grid gap-3 text-sm text-white/72">
              <Link href={`${homeHref === "/" ? "" : homeHref}/apps/securecrypt`} className="rounded-md border border-white/10 px-4 py-3 transition hover:border-[#35CDFB] hover:text-white">
                Apps encriptadas
              </Link>
              <Link href={`${homeHref === "/" ? "" : homeHref}/sim/sim-encriptada`} className="rounded-md border border-white/10 px-4 py-3 transition hover:border-[#35CDFB] hover:text-white">
                SIM encriptada
              </Link>
              <Link href={`${homeHref === "/" ? "" : homeHref}/encrypted-phones-distributors`} className="rounded-md border border-white/10 px-4 py-3 transition hover:border-[#35CDFB] hover:text-white">
                Celulares encriptados
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
