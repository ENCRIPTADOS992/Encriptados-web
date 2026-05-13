import fs from "node:fs";
import path from "node:path";

const DEFAULT_CSV = "doc/seo/Redirecciones Encriptados.io - Wordpress Blog.csv";
const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const CSV_PATH = process.env.CSV_PATH || DEFAULT_CSV;
const LIMIT = Number(process.env.LIMIT || 0);
const CONCURRENCY = Math.max(Number(process.env.CONCURRENCY || 8), 1);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 30000);
const EXPECTED_STATUSES = new Set([200, 301, 302, 307, 308]);

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function readLegacyBlogUrls() {
  const absolutePath = path.resolve(process.cwd(), CSV_PATH);
  const raw = fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const rows = lines.slice(1).map(parseCsvLine);
  const urls = rows
    .map((row) => row[0])
    .filter((value) => value && value.startsWith("http"))
    .map((value) => {
      const sourceUrl = new URL(value);
      return `${BASE_URL}${sourceUrl.pathname}${sourceUrl.search}`;
    });

  return LIMIT > 0 ? urls.slice(0, LIMIT) : urls;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      headers: { Accept: "text/html,application/xhtml+xml" },
      signal: controller.signal,
    });

    return {
      url,
      status: response.status,
      location: response.headers.get("location") || "",
      ok: EXPECTED_STATUSES.has(response.status),
    };
  } catch (error) {
    return {
      url,
      status: 0,
      location: "",
      ok: false,
      error: error?.name === "AbortError" ? "timeout" : error?.message || String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runQueue(urls) {
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      const result = await fetchWithTimeout(urls[index]);
      results[index] = result;

      const label = result.ok ? "OK" : "FAIL";
      const suffix = result.location ? ` -> ${result.location}` : result.error ? ` (${result.error})` : "";
      console.log(`${label} ${result.status} ${new URL(result.url).pathname}${suffix}`);
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));
  return results;
}

const urls = readLegacyBlogUrls();
console.log(`Validando ${urls.length} URLs legacy de blog contra ${BASE_URL}`);

const results = await runQueue(urls);
const failures = results.filter((result) => !result.ok);

console.log(`\nTotal: ${results.length}`);
console.log(`OK: ${results.length - failures.length}`);
console.log(`Fallos: ${failures.length}`);

if (failures.length > 0) {
  console.log("\nPrimeros fallos:");
  for (const failure of failures.slice(0, 20)) {
    console.log(`- ${failure.status} ${failure.url}${failure.error ? ` (${failure.error})` : ""}`);
  }
  process.exit(1);
}