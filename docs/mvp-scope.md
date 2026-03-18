## MVP scope (freeze)

### MVP goals
- Brand entry and discoverability
- Source-backed, verifiable game entries
- Multi-language SEO foundations

### MVP non-goals
- No downloads, payments, accounts, or community/UGC
- No mass-generated keyword pages or scraped content farms

### Deliverables (implemented)
- **Tech**: Next.js App Router (Hybrid SSG/SSR), Tailwind, TypeScript
- **i18n**: locale-prefixed routing (`/en`, `/zh-hans`, `/ja`, `/ko`) + middleware redirect
- **SEO**: metadata + OpenGraph, `robots.txt`, `sitemap.xml`, per-game hreflang alternates
- **Content**: seed game list with auditable source snapshots + validation script
- **Media**: optional normalization pipeline + manifest + graceful fallback to external URLs

### Roles (recommended)
- Product/PM: scope, dependencies, governance
- Design: layout + components aligned with main corporate site style
- Frontend: templates, performance, SEO implementation
- SEO: keyword mapping, schema strategy, index monitoring
- Content editor: fact-checking, writing, update cadence
- Legal/brand: attribution wording, trademark/licensing guardrails

### Key risks & mitigations
- **Thin content**: require sources + official links + minimum field completeness (validated)
- **Misattribution**: explicit scope statement + per-entry attribution labels + sources
- **Media licensing**: keep source snapshots; avoid rehosting until cleared; record provenance
- **Locale drift**: single structured source for facts; translation governance workflow

