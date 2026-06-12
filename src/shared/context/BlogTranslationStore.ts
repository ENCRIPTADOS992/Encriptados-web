"use client";

import type { BlogTranslationRef } from "@/features/blog/types";

/**
 * Module-level store for the current blog post's translations.
 *
 * Populated by ContentBlogById when a post loads,
 * consumed by useLanguageSwitcher to resolve translated slugs.
 *
 * This avoids the need for a React Context provider in the layout tree,
 * since the header (language switcher) and blog content sit in different
 * branches of the component tree.
 */

type TranslationMap = Record<string, BlogTranslationRef>;

let current: TranslationMap | null = null;

export function setBlogTranslations(translations: TranslationMap | undefined | null): void {
  current = translations ?? null;
}

export function getBlogTranslations(): TranslationMap | null {
  return current;
}

export function clearBlogTranslations(): void {
  current = null;
}
