import { NextRequest, NextResponse } from "next/server";
import {
  createSiteAccessToken,
  getSiteAccessCredentials,
  normalizeSiteAccessNextPath,
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_PATH,
} from "@/lib/site-access";

function buildLoginRedirect(request: NextRequest, nextPath: string, hasError = false) {
  const url = new URL(SITE_ACCESS_PATH, request.url);
  url.searchParams.set("next", nextPath);

  if (hasError) {
    url.searchParams.set("error", "1");
  }

  return url;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = normalizeSiteAccessNextPath(String(formData.get("next") ?? "/"));
  const credentials = getSiteAccessCredentials();

  if (!credentials) {
    return NextResponse.json(
      { error: "Site access credentials are not configured." },
      { status: 500 },
    );
  }

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.redirect(buildLoginRedirect(request, nextPath, true), 303);
  }

  const token = await createSiteAccessToken(credentials.username, credentials.password);
  const response = NextResponse.redirect(new URL(nextPath, request.url), 303);

  response.cookies.set({
    name: SITE_ACCESS_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}