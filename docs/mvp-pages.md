## MVP page inventory (bytedance.games)

### Locales
- `en`
- `zh-hans`
- `ja`
- `ko`

### Core routes (per locale)
- `/<locale>/` (Home)
- `/<locale>/games` (Games index)
- `/<locale>/games/<gameId>` (Game detail)
- `/<locale>/news` + `/<locale>/news/<slug>`
- `/<locale>/insights` + `/<locale>/insights/<slug>`
- `/<locale>/about`
- `/<locale>/faq`
- `/<locale>/contact`
- `/<locale>/legal`
- `/<locale>/privacy`

### Global routes
- `/sitemap.xml`
- `/robots.txt`

### Notes
- Locale routing is enforced by middleware; non-locale paths are redirected to `/en` by default.
- Game entries are loaded from seed content under `content/games/seed/` and must be validated via `web/scripts/validate-content.mjs`.

