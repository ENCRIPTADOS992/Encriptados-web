"use client";

import CardTestLayout from "./components/CardTestLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CardTestLayout>{children}</CardTestLayout>
    </div>
  );
}
