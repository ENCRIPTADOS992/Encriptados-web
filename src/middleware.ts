import { jwtVerify, importSPKI } from "jose";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { protectedRoutesArray } from "./app/constants/protectedRoutes";

const intlMiddleware = createMiddleware(routing);

export async function middleware(
  request: NextRequest
): Promise<NextResponse | undefined> {
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
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return intlResponse || NextResponse.next();
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
      return NextResponse.redirect(new URL("/dashboard/data-usage", request.url));
    }

    // Retorna la respuesta de internacionalización o continua
    return intlResponse || NextResponse.next();
  } catch (error) {
    console.error("Error de verificación JWT:", error);

    // Si el token es inválido y la ruta es protegida, redirige al login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Si no, continúa con la respuesta internacionalizada
    return intlResponse || NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/", // Raíz del sitio
    "/(en|es|fr|it|pt|)/:path*", // Soporte para idiomas
    "/((?!_next|_vercel|.*\\..*).*)", // Excluye rutas internas y archivos estáticos
  ],
};



