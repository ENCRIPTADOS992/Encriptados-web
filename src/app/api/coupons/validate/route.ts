
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const productId = searchParams.get("product_id");
    const amount = searchParams.get("amount");

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

    // New endpoint: GET /wp-json/encriptados/v1/coupon/validate
    let endpoint = `${WP_API}/encriptados/v1/coupon/validate?code=${encodeURIComponent(code)}`;
    if (productId) {
        endpoint += `&product_id=${encodeURIComponent(productId)}`;
    }
    if (amount) {
        endpoint += `&amount=${encodeURIComponent(amount)}`;
    }

    try {
        const res = await fetch(endpoint, {
            headers: {
                Authorization: `Basic ${CREDENTIALS}`,
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            // The new endpoint returns { code, message, data: { status } } on error
            console.error("WP API Error:", res.status, data?.message || res.statusText);
            return NextResponse.json({
                error: true,
                message: data?.message || "Cupón no válido",
            }, { status: data?.data?.status || res.status });
        }

        // Successful response from new endpoint:
        // { valid, code, coupon_id, discount_type, discount_value, discount_applied, original_amount, final_amount, applies_to_products }
        if (!data.valid) {
            return NextResponse.json({
                error: true,
                message: data?.message || "Cupón no válido",
            }, { status: 400 });
        }

        return NextResponse.json({
            ok: true,
            code: data.code,
            coupon_id: data.coupon_id,
            discount_type: data.discount_type,       // "percent" | "fixed"
            discount_value: data.discount_value,      // raw coupon value (e.g. 20 for 20%)
            discount_applied: data.discount_applied,  // calculated discount amount in currency
            original_amount: data.original_amount,
            final_amount: data.final_amount,
            applies_to_products: data.applies_to_products,
            message: `Cupón ${data.code} aplicado`,
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: true, message: "Error interno del servidor" }, { status: 500 });
    }
}
