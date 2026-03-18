import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import * as cheerio from "cheerio";

const repoRoot = path.resolve(import.meta.dirname, "..", "..");
const seedPath = path.join(
  repoRoot,
  "content",
  "games",
  "seed",
  "nuverse_games_en_2026-03-18.json",
);

const outPublicRoot = path.join(repoRoot, "web", "public", "media", "games");
const manifestOut = path.join(repoRoot, "content", "media", "official_media_manifest.json");
const overridesPath = path.join(repoRoot, "content", "media", "media_source_overrides.json");

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function isLikelyImageUrl(u) {
  return /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(u);
}

function resolveUrl(base, maybeRelative) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return null;
  }
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) throw new Error(`Fetch HTML failed ${res.status} ${url}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchBytes(url, referer) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
        ...(referer ? { Referer: referer } : {}),
      },
    });
    if (!res.ok) throw new Error(`Fetch image failed ${res.status} ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "";
    return { buf, contentType };
  } finally {
    clearTimeout(timeout);
  }
}

function looksLikeParkedDomain(html, url) {
  const u = new URL(url);
  const host = u.hostname.toLowerCase();
  const text = html.toLowerCase();
  if (host.includes("hugedomains.com")) return true;
  if (text.includes("buy this domain") || text.includes("domain is for sale")) return true;
  if (text.includes("hugedomains") || text.includes("dan.com")) return true;
  return false;
}

function pickCandidates(html, pageUrl) {
  const $ = cheerio.load(html);
  const candidates = [];

  const metaNames = [
    ['meta[property="og:image"]', "content"],
    ['meta[name="twitter:image"]', "content"],
    ['meta[property="og:image:secure_url"]', "content"],
  ];
  for (const [sel, attr] of metaNames) {
    const v = $(sel).attr(attr);
    if (v) {
      const u = resolveUrl(pageUrl, v);
      if (u) candidates.push({ url: u, reason: sel });
    }
  }

  // Common icons
  const iconLinks = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="apple-touch-icon-precomposed"]',
  ];
  for (const sel of iconLinks) {
    const v = $(sel).attr("href");
    if (v) {
      const u = resolveUrl(pageUrl, v);
      if (u) candidates.push({ url: u, reason: sel });
    }
  }

  // Fallback: first large-ish img (avoid sprites)
  const imgs = $("img")
    .map((_, el) => $(el).attr("src") || $(el).attr("data-src"))
    .get()
    .filter(Boolean);
  for (const src of imgs.slice(0, 10)) {
    const u = resolveUrl(pageUrl, src);
    if (u && isLikelyImageUrl(u)) candidates.push({ url: u, reason: "img[src]" });
  }

  // Dedupe while preserving order
  const seen = new Set();
  const out = [];
  for (const c of candidates) {
    if (!seen.has(c.url)) {
      seen.add(c.url);
      out.push(c);
    }
  }
  return out;
}

async function renderDerivatives(inputBuf, outDir) {
  const img = sharp(inputBuf, { failOn: "none" });

  const cardWebp = path.join(outDir, "card_512.webp");
  const heroWebp = path.join(outDir, "hero_1600x900.webp");
  const thumbWebp = path.join(outDir, "thumb_800x600.webp");

  await img.clone().resize(512, 512, { fit: "cover" }).webp({ quality: 82 }).toFile(cardWebp);
  await img
    .clone()
    .resize(1600, 900, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(heroWebp);
  await img
    .clone()
    .resize(800, 600, { fit: "cover" })
    .webp({ quality: 80 })
    .toFile(thumbWebp);

  return { cardWebp, heroWebp, thumbWebp };
}

function scoreCandidate(reason, meta) {
  // Prefer OG images, then twitter, then icons, then generic images.
  const reasonScore =
    reason.includes('og:image') ? 100 :
    reason.includes('twitter:image') ? 90 :
    reason.includes('apple-touch-icon') ? 40 :
    reason.includes('rel="icon"') ? 30 :
    reason.includes('img[src]') ? 20 : 10;

  const w = meta?.width || 0;
  const h = meta?.height || 0;
  const areaScore = Math.min(200, Math.floor((w * h) / 100000)); // cap influence
  return reasonScore + areaScore;
}

async function main() {
  await ensureDir(path.dirname(manifestOut));
  await ensureDir(outPublicRoot);

  const seed = JSON.parse(await fs.readFile(seedPath, "utf-8"));
  const items = seed.items || [];

  let overrides = {};
  try {
    const o = JSON.parse(await fs.readFile(overridesPath, "utf-8"));
    overrides = o?.overrides || {};
  } catch {
    overrides = {};
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    seed_file: path.relative(repoRoot, seedPath),
    outputs_under: "web/public/media/games",
    items: {},
  };

  for (const game of items) {
    const gameId = game.id;
    const official = game.official_links?.[0]?.url;
    const fallbackPages = Array.isArray(overrides?.[gameId]) ? overrides[gameId] : [];
    const pagesToTry = [official, ...fallbackPages].filter(Boolean);
    if (!pagesToTry.length) continue;

    const gameOutDir = path.join(outPublicRoot, gameId);
    const sourceDir = path.join(gameOutDir, "source");
    const derivedDir = path.join(gameOutDir, "derived");
    await ensureDir(sourceDir);
    await ensureDir(derivedDir);

    const record = {
      official_url: official || null,
      tried_pages: pagesToTry,
      page_errors: {},
      picked: null,
      candidates: [],
      local: {},
    };

    try {
      let best = null;
      let pickedFromPage = null;

      for (const pageUrl of pagesToTry) {
        let candidates = [];
        try {
          const html = await fetchText(pageUrl);
          if (looksLikeParkedDomain(html, pageUrl)) {
            record.page_errors[pageUrl] = "parked-domain";
            continue;
          }
          candidates = pickCandidates(html, pageUrl);
          if (!candidates.length) {
            record.page_errors[pageUrl] = "no-image-candidates";
            continue;
          }
        } catch (err) {
          record.page_errors[pageUrl] = String(err?.message || err);
          continue;
        }

        // Keep a small debug window of candidates from the first page with candidates.
        if (!record.candidates.length) record.candidates = candidates.slice(0, 12);

        /** @type {null | {picked:any, score:number, rasterBuf:Buffer, ext:string, originalBuf:Buffer}} */
        let bestForPage = null;

        for (const c of candidates) {
          try {
            const referer = pageUrl || official || undefined;
            const { buf, contentType } = await fetchBytes(c.url, referer);

            const ext = contentType.includes("png")
              ? "png"
              : contentType.includes("webp")
                ? "webp"
                : contentType.includes("jpeg") || contentType.includes("jpg")
                  ? "jpg"
                  : contentType.includes("svg")
                    ? "svg"
                    : "bin";

            const rasterBuf =
              ext === "svg" ? await sharp(buf).png().toBuffer().catch(() => buf) : buf;

            const meta = await sharp(rasterBuf, { failOn: "none" }).metadata().catch(() => null);

            // Skip very small assets unless it's OG image (sometimes OG uses small but still relevant).
            const w = meta?.width || 0;
            const h = meta?.height || 0;
            const isTiny = w && h ? w < 256 && h < 256 : rasterBuf.length < 20_000;
            if (isTiny && !c.reason.includes("og:image") && !c.reason.includes("twitter:image")) {
              continue;
            }

            const picked = {
              url: c.url,
              reason: c.reason,
              contentType,
              sha256: sha256(buf),
              width: w || undefined,
              height: h || undefined,
            };
            const s = scoreCandidate(c.reason, meta);
            if (!bestForPage || s > bestForPage.score) {
              bestForPage = { picked, score: s, rasterBuf, ext, originalBuf: buf };
            }
          } catch {
            // try next candidate
          }
        }

        if (bestForPage) {
          best = bestForPage;
          pickedFromPage = pageUrl;
          break;
        } else {
          record.page_errors[pageUrl] = record.page_errors[pageUrl] || "all-candidates-download-failed";
          continue;
        }
      }

      if (best) {
        const primaryExt = best.ext || "bin";
        const fp = path.join(sourceDir, `primary.${primaryExt}`);
        await fs.writeFile(fp, best.originalBuf);
        record.picked = { ...best.picked, file: fp };
        record.picked.page = pickedFromPage || official || null;

        await renderDerivatives(best.rasterBuf, derivedDir);
        record.local = {
          card: `/media/games/${gameId}/derived/card_512.webp`,
          hero: `/media/games/${gameId}/derived/hero_1600x900.webp`,
          thumb: `/media/games/${gameId}/derived/thumb_800x600.webp`,
        };
      } else {
        record.error = record.error || "No downloadable image candidates found from official page.";
      }
    } catch (err) {
      record.error = String(err?.message || err);
    }

    manifest.items[gameId] = record;
  }

  await fs.writeFile(manifestOut, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Wrote official media manifest: ${path.relative(repoRoot, manifestOut)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

