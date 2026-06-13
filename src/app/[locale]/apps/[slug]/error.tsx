"use client";

import { useEffect } from "react";

export default function AppProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[apps/slug] Client error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          An error occurred while loading this product page.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
