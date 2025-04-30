import React from "react";

export default async function ProductsTestPage() {
  const endpoint = "https://encriptados.es/wp-json/wc/v3/products";

  const headers = {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VuY3JpcHRhZG9zLmVzIiwiaWF0IjoxNzQyMzIyNjY0LCJuYmYiOjE3NDIzMjI2NjQsImV4cCI6MTc0MjkyNzQ2NCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.OfuRHg4xTCQgbSw1ah_sYSsloqLQL5RC2Aw5oo5aodA",
  };

  const res = await fetch(endpoint, {
    headers,
    next: { revalidate: 0 }, 
  });

  if (!res.ok) {
    return <div>Error al obtener los productos.</div>;
  }

  const products = await res.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de productos desde WooCommerce</h1>
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
              <strong>Precio:</strong> {product.price}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        ))
      ) : (
        <p>No hay productos o la respuesta está vacía.</p>
      )}
    </div>
  );
}


