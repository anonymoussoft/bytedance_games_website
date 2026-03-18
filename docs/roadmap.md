## Roadmap (implementation-aligned)

### Phase 0 (done in this repo)
- Next.js multi-language routing scaffold (`/<locale>/...`) + middleware redirect
- Source-backed seed content with snapshots under `content/_sources/`
- Content schema validation script (`npm run content:validate`)
- Baseline SEO: metadata, OpenGraph, `sitemap.xml`, `robots.txt`, per-game hreflang

### Phase 1 (MVP hardening)
- Replace seed-only articles with editorial workflow (MDX + review gates)
- Expand JA/KR translations via governance (not machine-only)
- Add per-page canonical/hreflang for all article routes
- Add structured data for lists (`ItemList`) and breadcrumbs (`BreadcrumbList`)
- Improve media pipeline reliability and licensing checks (avoid rehosting when unclear)

### Phase 2 (content expansion)
- Add categories with real, verifiable taxonomy (genre/platform/region)
- Add studio/capabilities pages (only with verifiable sources)
- Increase News cadence with source citations and author attribution

### Phase 3 (SEO iteration)
- Topic cluster expansion (FAQ clusters, insights series)
- External citation strategy and controlled internal linking audits
- Ongoing thin-content prevention (release gates, duplication checks)

