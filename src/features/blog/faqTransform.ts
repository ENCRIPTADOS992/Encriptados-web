// FAQ extractor + accordion transformer for blog posts.
// Detects an "FAQ" section in rendered Markdown HTML, converts the
// Q/A pairs into <details> accordions and returns the structured
// question/answer pairs for JSON-LD FAQPage schema.

export type FaqPair = { question: string; answer: string };

const FAQ_HEADING_RE = /<h2[^>]*>([\s\S]*?)<\/h2>/i;

function stripTags(input: string): string {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isFaqHeading(text: string): boolean {
  const clean = stripTags(text).toLowerCase();
  if (!clean) return false;
  if (clean.includes("faq")) return true;
  if (clean.includes("preguntas frecuentes")) return true;
  if (clean.includes("frequently asked")) return true;
  if (clean.includes("foire aux questions")) return true;
  if (clean.includes("domande frequenti")) return true;
  if (clean.includes("perguntas frequentes")) return true;
  return false;
}

export function extractAndTransformFaqs(html: string): {
  html: string;
  faqs: FaqPair[];
} {
  if (!html) return { html, faqs: [] };

  // Locate the FAQ <h2>
  const allH2 = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let faqStartMatch: RegExpExecArray | null = null;
  let m: RegExpExecArray | null;
  while ((m = allH2.exec(html)) !== null) {
    if (isFaqHeading(m[1])) {
      faqStartMatch = m;
      break;
    }
  }
  if (!faqStartMatch) return { html, faqs: [] };

  const faqStart = faqStartMatch.index;
  const headingHtml = faqStartMatch[0];
  const afterHeading = faqStart + headingHtml.length;

  // Find next <h2> after the FAQ heading (or end of doc)
  const nextH2Re = /<h2[^>]*>/g;
  nextH2Re.lastIndex = afterHeading;
  const nextH2Match = nextH2Re.exec(html);
  const faqEnd = nextH2Match ? nextH2Match.index : html.length;

  const faqBlock = html.substring(afterHeading, faqEnd);

  // Extract Q/A pairs: <h3>question</h3> ...(content until next <h3> or end)
  const qaRe = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi;
  const faqs: FaqPair[] = [];
  const accordionItems: string[] = [];
  let qa: RegExpExecArray | null;
  while ((qa = qaRe.exec(faqBlock)) !== null) {
    const question = stripTags(qa[1]);
    const answerHtml = qa[2].trim();
    const answerText = stripTags(answerHtml);
    if (!question || !answerText) continue;

    faqs.push({ question, answer: answerText });
    accordionItems.push(
      `<details class="blog-faq-item">` +
        `<summary class="blog-faq-question">` +
        `<span>${escapeAttr(question)}</span>` +
        `<svg class="blog-faq-chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>` +
        `</summary>` +
        `<div class="blog-faq-answer">${answerHtml}</div>` +
        `</details>`,
    );
  }

  if (faqs.length === 0) return { html, faqs };

  const wrapped =
    `<section class="blog-faq" data-faq>` +
    headingHtml +
    `<div class="blog-faq-list">${accordionItems.join("")}</div>` +
    `</section>`;

  const transformed =
    html.substring(0, faqStart) + wrapped + html.substring(faqEnd);

  return { html: transformed, faqs };
}

export function buildFaqJsonLd(faqs: FaqPair[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
