import { jwtVerify, importSPKI } from "jose";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { protectedRoutesArray } from "./app/constants/protectedRoutes";

const intlMiddleware = createMiddleware(routing);

function shouldNoIndexHost(request: NextRequest): boolean {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  return host === "encriptados.net" || host.endsWith(".encriptados.net");
}

function withNoIndexHeader(request: NextRequest, response: NextResponse): NextResponse {
  if (shouldNoIndexHost(request)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }
  return response;
}

export async function middleware(
  request: NextRequest
): Promise<NextResponse | undefined> {
  // Protección contra rutas inválidas con "/null" o "/undefined"
  const pathname = request.nextUrl.pathname;
  if (pathname.endsWith("/null") || pathname.endsWith("/undefined") || 
      pathname.includes("/null/") || pathname.includes("/undefined/")) {
    console.warn(`[Middleware] ⚠️ Ruta inválida detectada: ${pathname}, redirigiendo a home`);
    return withNoIndexHeader(request, NextResponse.redirect(new URL("/", request.url)));
  }

  // Manejo de internacionalización
  const intlResponse = await intlMiddleware(request);

  // Verifica si la ruta es protegida
  const isProtectedRoute = protectedRoutesArray.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Obtén el token JWT de las cookies
  const jwtToken = request.cookies.get("authToken");

  // Si no hay token y la ruta es protegida, redirige al login
  if (!jwtToken?.value) {
    if (isProtectedRoute) {
      return withNoIndexHeader(request, NextResponse.redirect(new URL("/login", request.url)));
    }
    return withNoIndexHeader(request, intlResponse || NextResponse.next());
  }

  // Verifica la clave pública
  const publicKey = process.env.JWT_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error("La clave pública no está definida.");
  }

  try {
    // Importa la clave pública
    const key = await importSPKI(publicKey, "RS256");

    // Verifica el token JWT
    await jwtVerify(jwtToken.value, key, {
      clockTolerance: 30,
    });

    // Redirige al dashboard si ya está autenticado y visita la página de login
    const loginPaths = ["/en/login", "/es/login", "/it/login", "/pt/login", "/fr/login"];
    if (loginPaths.includes(request.nextUrl.pathname)) {
      return withNoIndexHeader(request, NextResponse.redirect(new URL("/dashboard/data-usage", request.url)));
    }

    // Retorna la respuesta de internacionalización o continua
    return withNoIndexHeader(request, intlResponse || NextResponse.next());
  } catch (error) {
    console.error("Error de verificación JWT:", error);

    // Si el token es inválido y la ruta es protegida, redirige al login
    if (isProtectedRoute) {
      return withNoIndexHeader(request, NextResponse.redirect(new URL("/login", request.url)));
    }

    // Si no, continúa con la respuesta internacionalizada
    return withNoIndexHeader(request, intlResponse || NextResponse.next());
  }
}

export const config = {
  matcher: [
    "/", // Raíz del sitio
    "/(en|es|fr|it|pt|)/:path*", // Soporte para idiomas
    "/((?!api|_next|_vercel|.*\\..*).*)", // Excluye API, rutas internas y archivos estáticos
  ],
};


