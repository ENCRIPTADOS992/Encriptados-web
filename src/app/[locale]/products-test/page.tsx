import React from "react";
import { getTranslations } from "next-intl/server";
import { buildWpApiUrl } from "@/shared/constants/backend";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsTestPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TestingProducts.testPage" });
  const endpoint = buildWpApiUrl("/wc/v3/products");
  const token = process.env.WP_AUTH_TOKEN;

  if (!token) {
    return <div>Falta configurar WP_AUTH_TOKEN para esta prueba.</div>;
  }

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return <div>{t("fetchError")}</div>;
  }

  const products = await res.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1>{t("title")}</h1>
      {products && products.length > 0 ? (
        products.map((product: any) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <h2>{product.name}</h2>
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0].src}
                alt={product.name}
                style={{ maxWidth: "200px" }}
              />
            )}
            <p>
              <strong>{t("priceLabel")}:</strong> {product.price}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        ))
      ) : (
        <p>{t("empty")}</p>
      )}
    </div>
  );
}
