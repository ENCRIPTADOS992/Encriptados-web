import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center space-y-5">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">404</p>
        <h1 className="text-3xl md:text-5xl font-semibold">Pagina no encontrada</h1>
        <p className="text-gray-300">
          La URL solicitada no existe o fue movida. Puedes volver al inicio para seguir navegando.
        </p>
        <Link href="/" className="inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-black">
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}