# Translation Structure

The app loads translations from the root locale file plus modular namespace files:

- `messages/en.json`
- `messages/modules/en/*.json`

Keep shared or page-specific namespaces in `messages/modules/<locale>/` when they grow or are touched frequently. Each module should export the top-level namespace it owns, for example:

```json
{
  "DashboardPage": {
    "promoBanner": {
      "title": "..."
    }
  }
}
```

When adding a new module file, register it in `src/i18n/messages.ts` and import the English module in `global.d.ts` so typed `next-intl` keys stay complete.