import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { toContentLocaleKey, type AppLocale } from "./locales";
import { getOfficialMediaManifest, getSeedMediaManifest } from "./media";

/** Fallback image for games with no local asset (project-maintained only, no external requests). */
export const PLACEHOLDER_GAME_IMAGE = "/media/placeholder-game.svg";

const SeedFileSchema = z.object({
  seed_set: z.string(),
  fetched_at: z.string(),
  locale: z.string(),
  sources: z.array(z.any()),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.record(z.string(), z.string()).default({}),
      relationship: z.object({
        collection: z.string(),
        label: z.string(),
        claims: z.array(z.string()).default([]),
      }),
      platforms: z.array(z.string()).default([]),
      official_links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
      descriptions: z.record(z.string(), z.string()).default({}),
      assets: z
        .object({
          icon: z.string().optional(),
          small_bg: z.string().optional(),
          big_bg: z.string().optional(),
        })
        .default({}),
    }),
  ),
});

export type SeedGame = z.infer<typeof SeedFileSchema>["items"][number];

export type SeedMediaLocal = {
  icon?: string;
  card?: string;
  hero?: string;
  thumb?: string;
  fallback?: {
    card?: string;
    hero?: string;
    thumb?: string;
  };
};

let cached: SeedGame[] | null = null;
let cachedMedia: Record<string, SeedMediaLocal> | null = null;

async function loadSeedFile() {
  const repoRoot = path.resolve(process.cwd(), "..");
  const seedPath = path.join(
    repoRoot,
    "content",
    "games",
    "seed",
    "nuverse_games_en_2026-03-18.json",
  );
  const raw = await fs.readFile(seedPath, "utf-8");
  return SeedFileSchema.parse(JSON.parse(raw));
}

export async function getSeedGames(): Promise<SeedGame[]> {
  if (cached) return cached;
  const seed = await loadSeedFile();
  cached = seed.items;
  return cached;
}

export async function getSeedGameMedia(gameId: string) {
  if (!cachedMedia) {
    const official = await getOfficialMediaManifest();
    const manifest = await getSeedMediaManifest();
    cachedMedia = {};
    if (official?.items) {
      for (const [id, rec] of Object.entries(official.items)) {
        if (rec?.local) cachedMedia[id] = rec.local as SeedMediaLocal;
      }
    }
    if (manifest?.items) {
      for (const [id, rec] of Object.entries(manifest.items)) {
        if (rec?.local) cachedMedia[id] = rec.local as SeedMediaLocal;
      }
    }
  }
  return cachedMedia?.[gameId] ?? null;
}

export async function getSeedGameById(id: string): Promise<SeedGame | null> {
  const all = await getSeedGames();
  return all.find((g) => g.id === id) ?? null;
}

export function getLocalizedGameName(game: SeedGame, locale: AppLocale): string {
  const key = toContentLocaleKey(locale);
  const localized = game.name?.[key];
  return localized && localized.trim().length ? localized : game.name?.en ?? game.id;
}

export function getLocalizedDescription(game: SeedGame, locale: AppLocale): string {
  const key = toContentLocaleKey(locale);
  const localized = game.descriptions?.[key];
  return localized && localized.trim().length ? localized : game.descriptions?.en ?? "";
}

