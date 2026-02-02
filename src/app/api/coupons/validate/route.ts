
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const productId = searchParams.get("product_id");

    if (!code) {
        return NextResponse.json({ error: true, message: "Código requerido" }, { status: 400 });
    }

    // Credentials provided by user (Should be in .env in production)
    const USER = "Dannaback";
    const PASS = "qlfC 1Rgp h8qZ JxED vNrw YOme";
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

        const coupons = await res.json();

        // The API returns a list of coupons matching the query. We need to find the exact match.
        // Adjust logic based on actual API response structure (assuming array of coupon objects).
        const match = Array.isArray(coupons)
            ? coupons.find((c: any) => c.code.toLowerCase() === code.toLowerCase())
            : null;

        if (!match) {
            return NextResponse.json({ error: true, message: "Cupón no encontrado" }, { status: 404 });
        }

        // Map WP coupon data to our format
        // Assuming structure based on standard WP usage, but trusting the "admin/coupons" return.
        // We map match.amount and match.discount_type (fixed_cart, percent, etc.)

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
