import { NextResponse } from "next/server";
import { buildWpAdminV3Url } from "@/shared/constants/backend";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const productId = searchParams.get("product_id");
    const variantId = searchParams.get("variant_id");
    const amount = searchParams.get("amount");

    if (!code) {
        return NextResponse.json({ error: true, message: "Código requerido" }, { status: 400 });
    }

    const endpoint = buildWpAdminV3Url("/coupon/validate", {
        code,
        product_id: productId ?? undefined,
        variant_id: variantId ?? undefined,
        amount: amount ?? undefined,
    });

    try {
        const res = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("WP API Error:", res.status, data?.message || res.statusText);
            return NextResponse.json({
                error: true,
                message: data?.message || "Cupón no válido",
            }, { status: data?.data?.status || res.status });
        }

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
            discount_type: data.discount_type,
            discount_value: data.discount_value,
            discount_applied: data.discount_applied,
            original_amount: data.original_amount,
            final_amount: data.final_amount,
            scope: data.scope,
            applies_to_products: data.applies_to_products,
            message: "Cupón " + data.code + " aplicado",
        });

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: true, message: "Error interno del servidor" }, { status: 500 });
    }
}
