import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const repoRoot = path.resolve(import.meta.dirname, "..", "..");
const seedPath = path.join(
  repoRoot,
  "content",
  "games",
  "seed",
  "nuverse_games_en_2026-03-18.json",
);

const outPublicRoot = path.join(repoRoot, "web", "public", "media", "seed");
const manifestOut = path.join(
  repoRoot,
  "content",
  "media",
  "seed_manifest_2026-03-18.json",
);

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function fetchBytes(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal });
    if (!res.ok) {
      // Fallback: some seed assets are accessible via an alternate CDN host.
      // Example transform:
      // https://lf16-fe-tos.bytedgame.com/obj/...  -> https://p16-marketing-sg.bytedgame.com/obj/...
      if (
        res.status === 404 &&
        url.startsWith("https://lf16-fe-tos.bytedgame.com/obj/")
      ) {
        const alt = url.replace(
          "https://lf16-fe-tos.bytedgame.com/obj/",
          "https://p16-marketing-sg.bytedgame.com/obj/",
        );
        const res2 = await fetch(alt, { redirect: "follow", signal: controller.signal });
        if (!res2.ok) throw new Error(`Fetch failed ${res2.status} ${alt}`);
        const array2 = await res2.arrayBuffer();
        const buf2 = Buffer.from(array2);
        const contentType2 = res2.headers.get("content-type") || "";
        return { buf: buf2, contentType: contentType2, resolvedUrl: alt };
      }
      throw new Error(`Fetch failed ${res.status} ${url}`);
    }
    const array = await res.arrayBuffer();
    const buf = Buffer.from(array);
    const contentType = res.headers.get("content-type") || "";
    return { buf, contentType, resolvedUrl: url };
  } finally {
    clearTimeout(timeout);
  }
}

async function writeFileIfChanged(fp, buf) {
  try {
    const old = await fs.readFile(fp);
    if (old.length === buf.length && sha256(old) === sha256(buf)) return false;
  } catch {
    // ignore
  }
  await fs.writeFile(fp, buf);
  return true;
}

async function renderDerivatives({ inputBuf, outDir }) {
  const img = sharp(inputBuf, { failOn: "none" });
  const out = {};

  // Card (square)
  out.cardWebp = path.join(outDir, "card_512.webp");
  out.cardJpg = path.join(outDir, "card_512.jpg");
  await img
    .clone()
    .resize(512, 512, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(out.cardWebp);
  await img
    .clone()
    .resize(512, 512, { fit: "cover" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out.cardJpg);

  // Hero (16:9)
  out.heroWebp = path.join(outDir, "hero_1600x900.webp");
  out.heroJpg = path.join(outDir, "hero_1600x900.jpg");
  await img
    .clone()
    .resize(1600, 900, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(out.heroWebp);
  await img
    .clone()
    .resize(1600, 900, { fit: "cover" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out.heroJpg);

  // Thumb (4:3)
  out.thumbWebp = path.join(outDir, "thumb_800x600.webp");
  out.thumbJpg = path.join(outDir, "thumb_800x600.jpg");
  await img
    .clone()
    .resize(800, 600, { fit: "cover" })
    .webp({ quality: 80 })
    .toFile(out.thumbWebp);
  await img
    .clone()
    .resize(800, 600, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out.thumbJpg);

  return out;
}

async function main() {
  await ensureDir(path.dirname(manifestOut));
  await ensureDir(outPublicRoot);

  const seed = JSON.parse(await fs.readFile(seedPath, "utf-8"));
  const items = seed.items || [];

  const manifest = {
    generated_at: new Date().toISOString(),
    seed_file: path.relative(repoRoot, seedPath),
    outputs_under: "web/public/media/seed",
    items: {},
  };

  for (const game of items) {
    const gameId = game.id;
    const srcIcon = game.assets?.icon;
    const srcHero = game.assets?.big_bg || game.assets?.small_bg || game.assets?.icon;
    const srcCard = game.assets?.icon || game.assets?.small_bg || game.assets?.big_bg;

    const gameOutDir = path.join(outPublicRoot, gameId);
    const sourceDir = path.join(gameOutDir, "source");
    await ensureDir(sourceDir);

    const record = {
      sources: {},
      local: {},
    };

    async function handleSource(name, url) {
      if (!url) return null;
      let lastErr;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const { buf, contentType, resolvedUrl } = await fetchBytes(url);
          const ext = contentType.includes("png")
            ? "png"
            : contentType.includes("webp")
              ? "webp"
              : contentType.includes("jpeg") || contentType.includes("jpg")
                ? "jpg"
                : "bin";
          const fp = path.join(sourceDir, `${name}.${ext}`);
          await writeFileIfChanged(fp, buf);
          record.sources[name] = {
            url,
            resolvedUrl,
            contentType,
            sha256: sha256(buf),
            file: fp,
          };
          return { buf, ext, fp };
        } catch (err) {
          lastErr = err;
          await new Promise((r) => setTimeout(r, 300 * attempt));
        }
      }
      record.sources[name] = {
        url,
        error: String(lastErr?.message || lastErr),
      };
      return null;
    }

    const iconSrc = await handleSource("icon", srcIcon);
    const heroSrc = await handleSource("hero", srcHero);
    const cardSrc = await handleSource("card", srcCard);

    // Prefer hero asset for hero derivatives; prefer card for card derivatives.
    const heroBase = heroSrc?.buf || cardSrc?.buf || iconSrc?.buf;
    const cardBase = cardSrc?.buf || iconSrc?.buf || heroSrc?.buf;
    if (!heroBase || !cardBase) {
      console.warn(`Skipping media generation for ${gameId} (missing sources)`);
      manifest.items[gameId] = record;
      continue;
    }

    const derivedDir = path.join(gameOutDir, "derived");
    await ensureDir(derivedDir);

    const heroDer = await renderDerivatives({ inputBuf: heroBase, outDir: derivedDir });
    const cardDer = await renderDerivatives({ inputBuf: cardBase, outDir: derivedDir });

    // Publish stable public URLs (prefer webp).
    record.local = {
      icon: iconSrc ? `/media/seed/${gameId}/source/icon.${iconSrc.ext}` : undefined,
      card: `/media/seed/${gameId}/derived/card_512.webp`,
      hero: `/media/seed/${gameId}/derived/hero_1600x900.webp`,
      thumb: `/media/seed/${gameId}/derived/thumb_800x600.webp`,
      fallback: {
        card: `/media/seed/${gameId}/derived/card_512.jpg`,
        hero: `/media/seed/${gameId}/derived/hero_1600x900.jpg`,
        thumb: `/media/seed/${gameId}/derived/thumb_800x600.jpg`,
      },
      _debug: { heroDer, cardDer },
    };

    manifest.items[gameId] = record;
  }

  await fs.writeFile(manifestOut, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Wrote media manifest: ${path.relative(repoRoot, manifestOut)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

