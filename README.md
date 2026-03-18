# bytedance_games_website

Source for `bytedance.games` (ByteDance Games entry site).

## Repository layout
- `content/`: Source-backed content + auditable source snapshots (seed stage)
- `web/`: Next.js site (multi-language, SEO-first, static-friendly)

## Quick start

```bash
cd web
npm install
npm run content:validate
npm run dev
```

Then open `http://localhost:3000` (it will redirect to `/<locale>`).

## Content validation

```bash
cd web
npm run content:validate
```

## Seed media normalization (optional)

This downloads externally hosted images referenced by the current seed set, generates
consistent derivatives, and writes a manifest under `content/media/`.

```bash
cd web
npm run media:seed
```

Notes:
- The manifest records fetch errors (e.g., timeouts or 404s). Pages will fall back to the
  original external URLs when local derivatives are unavailable.
- Treat all third-party assets as externally owned until licensing is verified.

