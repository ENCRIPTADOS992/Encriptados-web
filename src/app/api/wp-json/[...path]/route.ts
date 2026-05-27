import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const { searchParams } = new URL(request.url);
  const pathStr = path.join("/");
  const targetUrl = `http://127.0.0.1/wp-json/${pathStr}?${searchParams.toString()}`;

  try {
    const headers = new Headers(request.headers);
    // Force Host header so WordPress knows which site to serve
    headers.set("Host", "admin.encriptados.io");

    const response = await fetch(targetUrl, {
      method: "GET",
      headers,
    });

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: { "Content-Type": contentType },
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
  const targetUrl = `http://127.0.0.1/wp-json/${pathStr}?${searchParams.toString()}`;

  try {
    const headers = new Headers(request.headers);
    // Force Host header so WordPress knows which site to serve
    headers.set("Host", "admin.encriptados.io");

    let body: any = null;
    const contentType = request.headers.get("content-type") || "";
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
