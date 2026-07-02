import { jwtVerify, importSPKI } from "jose";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { protectedRoutesArray } from "./app/constants/protectedRoutes";
import { resolveLegacyRoute } from "./shared/seo/legacyRoutes";
import {
  APP_ACCESS_QUERY_PARAM,
  getAppAccessToken,
  getExpectedSiteAccessToken,
  getSiteAccessCredentials,
  isSiteAccessPath,
  normalizeSiteAccessNextPath,
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_COOKIE_MAX_AGE_SECONDS,
  SITE_ACCESS_PATH,
} from "./lib/site-access";

const intlMiddleware = createMiddleware(routing);

function shouldNoIndexHost(request: NextRequest): boolean {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  return host === "encriptados.net" || host.endsWith(".encriptados.net");
}

function shouldNoIndexPath(pathname: string): boolean {
  return [
    /^\/site-access(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?dashboard(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?login(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?test(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?test-design-system(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?test-payment-modal(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?products-test(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?encrypted-test(?:\/|$)/,
    /^\/(en|es|fr|it|pt)?\/?security-test(?:\/|$)/,
  ].some((pattern) => pattern.test(pathname));
}

function withNoIndexHeader(request: NextRequest, response: NextResponse): NextResponse {
  if (shouldNoIndexHost(request) || shouldNoIndexPath(request.nextUrl.pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }
  return response;
}

async function enforceSiteAccess(request: NextRequest): Promise<NextResponse | null> {
  const pathname = request.nextUrl.pathname;
  const configuredCredentials = getSiteAccessCredentials();
  const shouldFailClosed = shouldNoIndexHost(request) && process.env.NODE_ENV === "production";

  // Bypass para WebView de la app movil:
  // si la URL trae ?appAccess=<APP_ACCESS_TOKEN> valido, setea la cookie de
  // site-access y redirige a la URL limpia. Navegaciones internas posteriores
  // pasan solas gracias a la cookie.
  const appAccessToken = getAppAccessToken();
  if (appAccessToken) {
    const providedAppAccess = request.nextUrl.searchParams.get(APP_ACCESS_QUERY_PARAM);
    if (providedAppAccess && providedAppAccess === appAccessToken) {
      const expectedToken = await getExpectedSiteAccessToken();
      if (expectedToken) {
        const cleanUrl = request.nextUrl.clone();
        cleanUrl.searchParams.delete(APP_ACCESS_QUERY_PARAM);
        const response = NextResponse.redirect(cleanUrl, 302);
        response.cookies.set({
          name: SITE_ACCESS_COOKIE,
          value: expectedToken,
          httpOnly: true,
          sameSite: "lax",
          secure: request.nextUrl.protocol === "https:",
          path: "/",
          maxAge: SITE_ACCESS_COOKIE_MAX_AGE_SECONDS,
        });
        return response;
      }
    }
  }

  if (!configuredCredentials) {
    if (!shouldFailClosed || isSiteAccessPath(pathname)) {
      return null;
    }

    const accessUrl = new URL(SITE_ACCESS_PATH, request.url);
    accessUrl.searchParams.set("next", normalizeSiteAccessNextPath(`${pathname}${request.nextUrl.search}`));
    return NextResponse.redirect(accessUrl);
  }

  const expectedToken = await getExpectedSiteAccessToken();

  if (!expectedToken) {
    return null;
  }

  const currentToken = request.cookies.get(SITE_ACCESS_COOKIE)?.value;
  const hasAccess = currentToken === expectedToken;

  if (isSiteAccessPath(pathname)) {
    if (!hasAccess) {
      return null;
    }

    const requestedNextPath = normalizeSiteAccessNextPath(request.nextUrl.searchParams.get("next"));
    return NextResponse.redirect(new URL(requestedNextPath, request.url));
  }

  if (hasAccess) {
    return null;
  }

  const accessUrl = new URL(SITE_ACCESS_PATH, request.url);
  accessUrl.searchParams.set("next", normalizeSiteAccessNextPath(`${pathname}${request.nextUrl.search}`));
  return NextResponse.redirect(accessUrl);
}

export async function middleware(
  request: NextRequest
): Promise<NextResponse | undefined> {
  // Protección contra rutas inválidas con "/null" o "/undefined"
  const pathname = request.nextUrl.pathname;

  const siteAccessResponse = await enforceSiteAccess(request);
  if (siteAccessResponse) {
    return withNoIndexHeader(request, siteAccessResponse);
  }

  if (isSiteAccessPath(pathname)) {
    return withNoIndexHeader(request, NextResponse.next());
  }

  if (pathname === "/es" || pathname === "/es/") {
    return withNoIndexHeader(request, NextResponse.redirect(new URL("/", request.url), 308));
  }

  if (pathname === "/") {
    return withNoIndexHeader(request, NextResponse.next());
  }

  // Colapsa dobles slashes (p.ej. /it//pages/chatmail/) con 301 al pathname limpio.
  if (/\/{2,}/.test(pathname)) {
    const collapsedUrl = request.nextUrl.clone();
    collapsedUrl.pathname = pathname.replace(/\/{2,}/g, "/");
    return withNoIndexHeader(request, NextResponse.redirect(collapsedUrl, 301));
  }

  if (pathname.endsWith("/null") || pathname.endsWith("/undefined") ||
      pathname.includes("/null/") || pathname.includes("/undefined/")) {
    console.warn(`[Middleware] ⚠️ Ruta inválida detectada: ${pathname}, redirigiendo a home`);
    return withNoIndexHeader(request, NextResponse.redirect(new URL("/", request.url)));
  }

  if (pathname.startsWith("/blogs/") && !pathname.startsWith("/blogs/category/")) {
    const blogLegacyRoute = resolveLegacyRoute(pathname);
    if (blogLegacyRoute.type === "redirect") {
      return withNoIndexHeader(
        request,
        NextResponse.redirect(
          new URL(blogLegacyRoute.destination, request.url),
          blogLegacyRoute.permanent ? 301 : 302,
        ),
      );
    }
    if (blogLegacyRoute.type === "rewrite") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = "/legacy-current";
      rewriteUrl.searchParams.set("target", blogLegacyRoute.destination);
      return withNoIndexHeader(request, NextResponse.rewrite(rewriteUrl));
    }

    return withNoIndexHeader(request, NextResponse.next());
  }

  if (pathname.startsWith("/location/")) {
    // Sanitiza variantes sucias (con .html, espacios sin encodear, mayúsculas):
    // 301 al slug normalizado. Si la URL ya viene limpia, cae al render normal.
    const decoded = decodeURIComponent(pathname);
    const needsSanitize =
      /\.html?$/i.test(decoded) || /\s/.test(decoded) || /[A-Z]/.test(decoded);
    if (needsSanitize) {
      const sanitized = decoded
        .toLowerCase()
        .replace(/\.html?$/i, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/-\/|\/-/g, "/");
      if (sanitized !== pathname) {
        const cleanUrl = request.nextUrl.clone();
        cleanUrl.pathname = sanitized;
        return withNoIndexHeader(request, NextResponse.redirect(cleanUrl, 301));
      }
    }
    return withNoIndexHeader(request, NextResponse.next());
  }

  const legacyRoute = resolveLegacyRoute(pathname);
  if (legacyRoute.type === "redirect") {
    return withNoIndexHeader(
      request,
      NextResponse.redirect(new URL(legacyRoute.destination, request.url), legacyRoute.permanent ? 301 : 302),
    );
  }

  if (legacyRoute.type === "rewrite") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/legacy-current";
    rewriteUrl.searchParams.set("target", legacyRoute.destination);
    return withNoIndexHeader(
      request,
      NextResponse.rewrite(rewriteUrl),
    );
  }

  if (legacyRoute.type === "wp-page") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/legacy-seo/${legacyRoute.slug}`;
    rewriteUrl.searchParams.set("legacyLocale", legacyRoute.locale);
    rewriteUrl.searchParams.set("legacyPath", legacyRoute.legacyPath);
    return withNoIndexHeader(request, NextResponse.rewrite(rewriteUrl));
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
    "/(en|es|fr|it|pt)/:path*", // Soporte para idiomas (solo rutas con prefijo de locale)
    "/((?!api|_next|_vercel|.*\\..*).*)", // Excluye API, rutas internas y archivos estáticos
  ],
};
