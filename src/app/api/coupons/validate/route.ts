
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const productId = searchParams.get("product_id");

    if (!code) {
        return NextResponse.json({ error: true, message: "Código requerido" }, { status: 400 });
    }

    // Credentials from environment variables
    const USER = process.env.WP_COUPON_USERNAME;
    const PASS = process.env.WP_COUPON_PASSWORD;
    if (!USER || !PASS) {
        return NextResponse.json({ error: true, message: "Configuración del servidor incompleta" }, { status: 500 });
    }
    const CREDENTIALS = Buffer.from(`${USER}:${PASS}`).toString("base64");

    const WP_API = process.env.NEXT_PUBLIC_WP_API ?? "https://encriptados.es/wp-json";

    let endpoint = `${WP_API}/encriptados/v1/admin/coupons?q=${encodeURIComponent(code)}`;
    if (productId) {
        endpoint += `&product_id=${encodeURIComponent(productId)}`;
    }

    try {
        const res = await fetch(endpoint, {
            headers: {
                Authorization: `Basic ${CREDENTIALS}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("WP API Error:", res.status, res.statusText);
            return NextResponse.json({ error: true, message: "Error validando cupón con el servidor" }, { status: res.status });
        }

        const data = await res.json();

        // The API returns { items: [...] } or a flat array. Normalize to array.
        const coupons: any[] = Array.isArray(data)
            ? data
            : Array.isArray(data?.items)
              ? data.items
              : [];

        // Find exact code match
        const match = coupons.find((c: any) => c.code?.toLowerCase() === code.toLowerCase()) ?? null;

        if (!match) {
            return NextResponse.json({ error: true, message: "Cupón no encontrado" }, { status: 404 });
        }

        // Validar expiración
        if (match.date_expires) {
            const expires = new Date(match.date_expires);
            if (!isNaN(expires.getTime()) && expires < new Date()) {
                return NextResponse.json({ error: true, message: "Este cupón ha expirado" }, { status: 400 });
            }
        }

        // Validar restricción de producto
        const restrictedIds: string[] = Array.isArray(match.product_ids) ? match.product_ids.map(String) : [];
        if (restrictedIds.length > 0 && productId) {
            if (!restrictedIds.includes(String(productId))) {
                return NextResponse.json({ error: true, message: "Este cupón no aplica para este producto" }, { status: 400 });
            }
        }

        // Map WP coupon data to our format
        return NextResponse.json({
            ok: true,
            code: match.code,
            discount_type: match.discount_type === "percent" ? "percent" : "fixed",
            discount_amount: Number(match.amount),
            message: `Cupón ${match.code} aplicado`,
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: true, message: "Error interno del servidor" }, { status: 500 });
    }
}
