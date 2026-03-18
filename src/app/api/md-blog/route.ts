import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { MarkdownBlogMeta } from "@/features/blog/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Lazy-load marked only when needed (single post)
async function renderMarkdown(md: string): Promise<string> {
  const { marked } = await import("marked");
  return marked(md);
}

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") ?? "es";
  const slug = req.nextUrl.searchParams.get("slug");

  // ─── Single post by slug ──────────────────────────────────
  if (slug) {
    return handleSinglePost(slug, lang);
  }

  // ─── List all cards ────────────────────────────────────────
  return handleListCards(lang);
}

async function handleSinglePost(slug: string, lang: string) {
  // Validate slug (only allow alphanumeric, hyphens)
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const postDir = path.join(BLOG_DIR, slug);

  try {
    const metaPath = path.join(postDir, "meta.json");
    if (!fs.existsSync(metaPath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const meta: MarkdownBlogMeta = JSON.parse(
      fs.readFileSync(metaPath, "utf-8"),
    );

    // Read MD content (fallback to es if locale file doesn't exist)
    const mdFile = path.join(postDir, `${lang}.md`);
    const fallbackFile = path.join(postDir, "es.md");
    const contentFile = fs.existsSync(mdFile) ? mdFile : fallbackFile;

    if (!fs.existsSync(contentFile)) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const mdContent = fs.readFileSync(contentFile, "utf-8");
    const htmlContent = await renderMarkdown(mdContent);

    return NextResponse.json({
      id: `md-${meta.slug}`,
      slug: meta.slug,
      source: "markdown",
      title: meta.title[lang] ?? meta.title["es"] ?? "",
      description: meta.description[lang] ?? meta.description["es"] ?? "",
      image: meta.image,
      imageFull: meta.imageFull ?? meta.image,
      author: meta.author,
      date: meta.date,
      content: htmlContent,
    });
  } catch (err) {
    console.error("Error reading blog post:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function handleListCards(lang: string) {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      return NextResponse.json([]);
    }

    const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
    const cards: Array<Record<string, unknown>> = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const metaPath = path.join(BLOG_DIR, entry.name, "meta.json");
      if (!fs.existsSync(metaPath)) continue;

      const raw = fs.readFileSync(metaPath, "utf-8");
      const meta: MarkdownBlogMeta = JSON.parse(raw);

      const mdFile = path.join(BLOG_DIR, entry.name, `${lang}.md`);
      const fallbackFile = path.join(BLOG_DIR, entry.name, "es.md");
      if (!fs.existsSync(mdFile) && !fs.existsSync(fallbackFile)) continue;

      cards.push({
        id: `md-${meta.slug}`,
        slug: meta.slug,
        source: "markdown",
        title: meta.title[lang] ?? meta.title["es"] ?? "",
        description: meta.description[lang] ?? meta.description["es"] ?? "",
        image: meta.image,
        imageFull: meta.imageFull ?? meta.image,
        author: meta.author,
        date: meta.date,
      });
    }

    cards.sort(
      (a, b) =>
        new Date(b.date as string).getTime() -
        new Date(a.date as string).getTime(),
    );

    return NextResponse.json(cards);
  } catch (err) {
    console.error("Error reading blog content:", err);
    return NextResponse.json([]);
  }
}
