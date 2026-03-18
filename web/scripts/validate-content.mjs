import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const LocaleKeySchema = z.enum(["en", "zh-Hans", "ja", "ko"]);

const SourceSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["website", "api", "store", "press", "other"]),
  url: z.string().url(),
  note: z.string().optional(),
});

const SeedRelationshipSchema = z.object({
  collection: z.enum(["official-owned", "official-plus-publisher", "ecosystem"]),
  label: z.string().min(1),
  claims: z.array(z.string().min(1)).default([]),
});

const SeedGameItemSchema = z.object({
  id: z.string().min(1),
  external_ids: z.record(z.string(), z.string()).optional(),
  name: z.record(LocaleKeySchema, z.string()).or(z.object({ en: z.string().min(1) })),
  relationship: SeedRelationshipSchema,
  platforms: z.array(z.string().min(1)).default([]),
  official_links: z
    .array(z.object({ label: z.string().min(1), url: z.string().url() }))
    .default([]),
  descriptions: z.record(z.string(), z.string()).default({}),
  assets: z
    .object({
      icon: z.string().url().optional(),
      small_bg: z.string().url().optional(),
      big_bg: z.string().url().optional(),
    })
    .default({}),
});

const SeedFileSchema = z.object({
  seed_set: z.string().min(1),
  fetched_at: z.string().min(1),
  locale: z.string().min(1),
  sources: z.array(SourceSchema).min(1),
  items: z.array(SeedGameItemSchema).min(1),
});

async function main() {
  const repoRoot = path.resolve(import.meta.dirname, "..", "..");
  const seedPath = path.join(
    repoRoot,
    "content",
    "games",
    "seed",
    "nuverse_games_en_2026-03-18.json",
  );

  const raw = await fs.readFile(seedPath, "utf-8");
  const json = JSON.parse(raw);
  const parsed = SeedFileSchema.parse(json);

  const ids = new Set();
  for (const item of parsed.items) {
    if (ids.has(item.id)) throw new Error(`Duplicate game id: ${item.id}`);
    ids.add(item.id);
    if (!item.official_links.length)
      throw new Error(`Missing official_links for game: ${item.id}`);
  }

  // Minimal quality gates: avoid empty names.
  for (const item of parsed.items) {
    const nameEn =
      typeof item.name === "object" && "en" in item.name ? item.name.en : undefined;
    if (!nameEn || !nameEn.trim()) throw new Error(`Missing name.en for ${item.id}`);
  }

  console.log(
    `content:validate OK (${parsed.items.length} games) from ${path.relative(
      repoRoot,
      seedPath,
    )}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

