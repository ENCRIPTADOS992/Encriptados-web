export const SITE_ACCESS_COOKIE = "encriptados-site-access";
export const SITE_ACCESS_PATH = "/site-access";
export const APP_ACCESS_QUERY_PARAM = "appAccess";
export const SITE_ACCESS_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 dias

type SiteAccessCredentials = {
  username: string;
  password: string;
};

/**
 * Token que la app movil pasa como ?appAccess=<token> para saltarse el gate.
 * Reutilizamos el SITE_ACCESS_PASSWORD para no manejar un secreto separado:
 * la app conoce el mismo password que el gate normal.
 */
export function getAppAccessToken(): string | null {
  const credentials = getSiteAccessCredentials();
  if (!credentials) return null;
  const trimmed = credentials.password.trim();
  if (trimmed.length < 8) return null;
  return trimmed;
}

export function getSiteAccessCredentials(): SiteAccessCredentials | null {
  const username = process.env.SITE_ACCESS_USERNAME ?? process.env.APP_ADMIN_USER;
  const password = process.env.SITE_ACCESS_PASSWORD ?? process.env.APP_ADMIN_APP_PASSWORD;

  if (!username || !password) {
    return null;
  }

  return { username, password };
}

export function hasConfiguredSiteAccess(): boolean {
  return getSiteAccessCredentials() !== null;
}

export function normalizeSiteAccessNextPath(nextPath?: string | null): string {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/";
  }

  if (isSiteAccessPath(nextPath)) {
    return "/";
  }

  return nextPath;
}

export async function createSiteAccessToken(username: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${username}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedSiteAccessToken(): Promise<string | null> {
  const credentials = getSiteAccessCredentials();

  if (!credentials) {
    return null;
  }

  return createSiteAccessToken(credentials.username, credentials.password);
}

export function isSiteAccessPath(pathname: string): boolean {
  return pathname === SITE_ACCESS_PATH || pathname.startsWith(`${SITE_ACCESS_PATH}/`);
}