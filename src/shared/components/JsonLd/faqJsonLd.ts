type FaqJsonLdItem = {
  question?: string | null;
  answer?: string | null;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export function buildFaqJsonLd(items: FaqJsonLdItem[]) {
  const mainEntity = items
    .map((item) => ({
      question: stripHtml(String(item.question || "")),
      answer: stripHtml(String(item.answer || "")),
    }))
    .filter((item) => item.question && item.answer)
    .map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }));

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
