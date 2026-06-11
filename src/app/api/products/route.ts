import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    NEXT_PUBLIC_WP_API: process.env.NEXT_PUBLIC_WP_API || null,
    WP_ADMIN_API: process.env.WP_ADMIN_API || null,
    isProductionServer: process.env.NEXT_PUBLIC_SITE_URL?.includes("encriptados.io") ?? false
  });
}

