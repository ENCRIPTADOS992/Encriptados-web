import { NextRequest, NextResponse } from "next/server";

const WP_ORDER_BASE = "https://admin.encriptados.io/wp-json/encriptados/v1/orders";

export async function proxyOrderPost(request: NextRequest, orderType: "userid" | "roaming") {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const targetUrl = `${WP_ORDER_BASE}/${orderType}${query ? `?${query}` : ""}`;

  try {
    const headers = new Headers();
    const auth = request.headers.get("authorization");
    if (auth) headers.set("authorization", auth);

    const contentType = request.headers.get("content-type") || "application/json";
    headers.set("content-type", contentType);

    const accept = request.headers.get("accept");
    if (accept) headers.set("accept", accept);

    const body = await request.text();

    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const responseContentType = response.headers.get("content-type") || "";
    if (responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": responseContentType || "text/plain" },
    });
  } catch (error: any) {
    console.error(`Error proxying POST /wp-json/encriptados/v1/orders/${orderType}:`, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
