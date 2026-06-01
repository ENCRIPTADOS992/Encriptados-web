import type { Metadata } from "next";
import Link from "next/link";

import { getSiteAccessCredentials, normalizeSiteAccessNextPath } from "@/lib/site-access";
import EncryptedLogoSvg from "@/shared/svgs/EncryptedLogoSvg";

type PageProps = {
  searchParams?: Promise<{
    error?: string;
    next?: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acceso privado | Encriptados",
  description: "Acceso temporal restringido para el sitio principal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SiteAccessPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const nextPath = normalizeSiteAccessNextPath(params.next);
  const showError = params.error === "1";
  const hasConfiguredCredentials = getSiteAccessCredentials() !== null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4F8FA] text-[#111111]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(53,204,250,0.28),_transparent_26%),radial-gradient(circle_at_85%_15%,_rgba(5,124,141,0.18),_transparent_22%),linear-gradient(180deg,_#F4F8FA_0%,_#EAF7FC_45%,_#F4F8FA_100%)]" />
      <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-[#35CCFA]/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#057C8D]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 lg:px-8">
        <div className="grid w-full gap-8 rounded-[36px] border border-[#D9E8EF] bg-white/90 p-6 shadow-[0_30px_80px_rgba(5,124,141,0.14)] backdrop-blur md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <section className="flex flex-col justify-between gap-8">
            <div className="space-y-8">
              <div className="inline-flex w-fit items-center rounded-full bg-[#111111] px-5 py-3 shadow-[0_14px_40px_rgba(17,17,17,0.18)]">
                <EncryptedLogoSvg width={144} height={22} className="h-[22px] w-auto" />
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#057C8D]">
                  Acceso privado temporal
                </p>
                <h1 className="max-w-xl text-4xl font-semibold leading-none tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
                  Acceso restringido al sitio principal
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#4C5A62] md:text-lg">
                  {hasConfiguredCredentials
                    ? "Esta version del sitio esta protegida temporalmente. Ingresa con tus credenciales para continuar."
                    : "El acceso privado de este entorno aun no esta configurado. Mientras tanto, la web publica queda bloqueada para evitar exposicion accidental."}
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#CDE7F2] bg-[linear-gradient(90deg,_rgba(255,255,255,0.96)_0%,_rgba(230,248,255,0.96)_100%)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#057C8D]">Ya eres cliente</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#5F6E76]">
                Si ya eres cliente y necesitas entrar al sitio oficial, puedes continuar directamente desde el portal principal de Encriptados.
              </p>
              <Link
                href="https://encriptados.io/"
                className="mt-5 inline-flex items-center justify-center rounded-2xl border border-[#BFE7F4] bg-white px-5 py-3 text-sm font-semibold text-[#057C8D] shadow-[0_10px_24px_rgba(53,204,250,0.14)] transition hover:border-[#35CCFA] hover:text-[#035B68]"
              >
                Ir al sitio oficial
              </Link>
            </div>
          </section>

          <section className="rounded-[32px] border border-[#D9E8EF] bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8FDFF_100%)] p-6 shadow-[0_20px_60px_rgba(5,124,141,0.12)] md:p-8">
            <div className="mb-6 border-b border-[#E3EEF3] pb-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057C8D]">Portal de acceso</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#111111]">
                  {hasConfiguredCredentials ? "Ingresa tus credenciales" : "Configuracion pendiente"}
                </h2>
              </div>
            </div>

            {hasConfiguredCredentials ? (
              <form action="/api/site-access" method="POST" className="space-y-5">
                <input type="hidden" name="next" value={nextPath} />

                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-[#111111]">
                    Usuario
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="w-full rounded-2xl border border-[#D9E8EF] bg-[#F8FBFD] px-4 py-3 text-[#111111] outline-none transition placeholder:text-[#97A7B0] focus:border-[#35CCFA] focus:bg-white focus:ring-4 focus:ring-[#35CCFA]/20"
                    placeholder="Usuario"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-[#111111]">
                    Contrasena
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-2xl border border-[#D9E8EF] bg-[#F8FBFD] px-4 py-3 text-[#111111] outline-none transition placeholder:text-[#97A7B0] focus:border-[#35CCFA] focus:bg-white focus:ring-4 focus:ring-[#35CCFA]/20"
                    placeholder="Contrasena"
                  />
                </div>

                {showError ? (
                  <p className="rounded-2xl border border-[#E59EA7] bg-[#FFF1F3] px-4 py-3 text-sm text-[#8B2F3E]">
                    Usuario o contrasena invalidos.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[linear-gradient(90deg,_#35CCFA_0%,_#0EA5C6_100%)] px-4 py-3 text-sm font-semibold text-[#05222A] shadow-[0_14px_30px_rgba(53,204,250,0.28)] transition hover:brightness-105"
                >
                  Entrar al sitio
                </button>

                <div className="rounded-2xl border border-[#D9E8EF] bg-[#F8FBFD] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#057C8D]">Sesion temporal</p>
                  <p className="mt-2 text-sm leading-6 text-[#5F6E76]">
                    Al validar el acceso se crea una cookie temporal para navegar el sitio durante esta fase de pruebas.
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="rounded-2xl border border-[#E7C98B] bg-[#FFF9ED] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A06A00]">Acceso no disponible</p>
                  <p className="mt-2 text-sm leading-6 text-[#6E5A2A]">
                    Este entorno todavia no tiene configuradas las credenciales de acceso privado. Define
                    SITE_ACCESS_USERNAME y SITE_ACCESS_PASSWORD en el despliegue para habilitar el formulario.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D9E8EF] bg-[#F8FBFD] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#057C8D]">Siguiente paso</p>
                  <p className="mt-2 text-sm leading-6 text-[#5F6E76]">
                    Una vez se configuren las variables del entorno y se haga redeploy, esta pantalla mostrara el login y el resto del sitio seguira protegido.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}