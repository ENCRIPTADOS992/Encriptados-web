# Blog Content (Markdown)

This folder contains blog posts written in Markdown.

## Structure

```
content/blog/
  {slug}/
    meta.json     ← Metadata: author, date, image, title per locale, description per locale
    es.md         ← Spanish content
    en.md         ← English content
    fr.md         ← French content (optional)
    it.md         ← Italian content (optional)
    pt.md         ← Portuguese content (optional)
```

## meta.json Schema

```json
{
  "slug": "my-blog-post",
  "author": "Equipo Encriptados",
  "date": "2025-07-15T12:00:00-05:00",
  "image": "/images/blog/my-blog-post.jpg",
  "imageFull": "/images/blog/my-blog-post-full.jpg",
  "tags": ["security", "encryption"],
  "title": {
    "es": "Mi artículo de blog",
    "en": "My blog post"
  },
  "description": {
    "es": "Descripción corta del artículo",
    "en": "Short article description"
  }
}
```

## Notes

- Posts will be served by the NestJS backend API at `NEXT_PUBLIC_NESTJS_API`
- The slug is used as the URL identifier: `/blog/{slug}`
- WordPress posts use numeric IDs, MD posts use string slugs — auto-detected
- Only locales with a corresponding `.md` file will show the post
