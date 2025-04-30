"use client";

import { ProductByIdProvider } from "./context/ProductByIdContext";

export default function ProductByIdLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductByIdProvider>
      <section>{children}</section>
    </ProductByIdProvider>
  );
}
