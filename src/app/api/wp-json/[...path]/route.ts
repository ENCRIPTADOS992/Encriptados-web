import { NextResponse } from "next/server";

const PUBLIC_WP_CACHE_SECONDS = 120;

const isProductionServer = process.env.NEXT_PUBLIC_SITE_URL?.includes("encriptados.io");
const wpApiBase = isProductionServer
  ? "https://admin.encriptados.io/wp-json"
  : (process.env.NEXT_PUBLIC_WP_API || "https://admin.encriptados.io/wp-json");

function isCacheablePublicGet(pathStr: string, hasAuthHeader: boolean) {
  if (hasAuthHeader) return false;

  return (
    pathStr.startsWith("encriptados/v3/store/") ||
    pathStr.startsWith("encriptados/v1/products/") ||
    pathStr.startsWith("encriptados/v1/blogs") ||
    pathStr.startsWith("wp/v2/")
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const { searchParams } = new URL(request.url);
  const pathStr = path.join("/");
  const targetUrl = `${wpApiBase.replace(/\/$/, "")}/${pathStr}?${searchParams.toString()}`;

  try {
    const headers = new Headers();
    const auth = request.headers.get("authorization");
    const isCacheableRequest = isCacheablePublicGet(pathStr, Boolean(auth));

    if (auth) headers.set("authorization", auth);
    const accept = request.headers.get("accept");
    if (accept) headers.set("accept", accept);

    const response = await fetch(targetUrl, {
      method: "GET",
      headers,
      ...(isCacheableRequest
        ? { next: { revalidate: PUBLIC_WP_CACHE_SECONDS } }
        : { cache: "no-store" as const }),
    });

    const contentType = response.headers.get("content-type") || "";
    const responseHeaders =
      isCacheableRequest && response.ok
        ? { "Cache-Control": `public, s-maxage=${PUBLIC_WP_CACHE_SECONDS}, stale-while-revalidate=600` }
        : undefined;

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          ...(responseHeaders ?? {}),
        },
      });
    }
  } catch (error: any) {
    console.error(`Error proxying GET /wp-json/${pathStr}:`, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const { searchParams } = new URL(request.url);
  const pathStr = path.join("/");
  const targetUrl = `${wpApiBase.replace(/\/$/, "")}/${pathStr}?${searchParams.toString()}`;

  try {
    const headers = new Headers();
    const auth = request.headers.get("authorization");
    if (auth) headers.set("authorization", auth);
    const contentType = request.headers.get("content-type") || "";
    if (contentType) headers.set("content-type", contentType);
    const accept = request.headers.get("accept");
    if (accept) headers.set("accept", accept);

    let body: any = null;
    if (contentType.includes("application/json")) {
      body = JSON.stringify(await request.json());
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      body = await request.text();
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body,
    });

    const responseContentType = response.headers.get("content-type") || "";
    if (responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: { "Content-Type": responseContentType },
      });
    }
  } catch (error: any) {
    console.error(`Error proxying POST /wp-json/${pathStr}:`, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
