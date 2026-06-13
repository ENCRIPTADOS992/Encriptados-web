import { NextResponse } from "next/server";

const wpApiBase = process.env.NEXT_PUBLIC_SITE_URL?.includes("encriptados.io")
  ? "https://admin.encriptados.io/wp-json"
  : (process.env.NEXT_PUBLIC_WP_API || "https://admin.encriptados.io/wp-json");

/**
 * Server-side JWT token endpoint.
 * Keeps WP credentials on the server — never exposes them to the client bundle.
 */
export async function POST() {
  const username = process.env.WP_USERNAME || process.env.NEXT_PUBLIC_WP_USERNAME;
  const password = process.env.WP_PASSWORD || process.env.NEXT_PUBLIC_WP_PASSWORD;

  if (!username || !password) {
    return NextResponse.json(
      { error: "WordPress credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(`${wpApiBase}/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Authentication failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ token: data.token });
  } catch (error: any) {
    if (error?.name === "AbortError") {
      return NextResponse.json({ error: "Authentication request timed out" }, { status: 504 });
    }
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
