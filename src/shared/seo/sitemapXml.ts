export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export type SitemapUrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

export function buildUrlSet(entries: SitemapUrlEntry[]): string {
  const urls = entries
    .map((entry) => {
      let url = `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n`;
      if (entry.lastmod) {
        url += `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n`;
      }
      if (entry.changefreq) {
        url += `    <changefreq>${escapeXml(entry.changefreq)}</changefreq>\n`;
      }
      if (entry.priority !== undefined) {
        url += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      }
      url += "  </url>";
      return url;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function buildSitemapIndex(locations: string[]): string {
  const sitemaps = locations
    .map((loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
