import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const LocalMediaSchema = z.object({
  icon: z.string().optional(),
  card: z.string().optional(),
  hero: z.string().optional(),
  thumb: z.string().optional(),
  fallback: z
    .object({
      card: z.string().optional(),
      hero: z.string().optional(),
      thumb: z.string().optional(),
    })
    .optional(),
});

const MediaManifestSchema = z.object({
  generated_at: z.string(),
  seed_file: z.string(),
  outputs_under: z.string(),
  items: z.record(
    z.string(),
    z.object({
      local: LocalMediaSchema.optional(),
      sources: z.record(z.string(), z.any()).optional(),
    }),
  ),
});

export type MediaManifest = z.infer<typeof MediaManifestSchema>;

let cached: MediaManifest | null = null;

export async function getSeedMediaManifest(): Promise<MediaManifest | null> {
  if (cached) return cached;
  try {
    const repoRoot = path.resolve(process.cwd(), "..");
    const fp = path.join(repoRoot, "content", "media", "seed_manifest_2026-03-18.json");
    const raw = await fs.readFile(fp, "utf-8");
    cached = MediaManifestSchema.parse(JSON.parse(raw));
    return cached;
  } catch {
    return null;
  }
}

const OfficialMediaManifestSchema = z.object({
  generated_at: z.string(),
  seed_file: z.string(),
  outputs_under: z.string(),
  items: z.record(
    z.string(),
    z.object({
      official_url: z.string().url().optional(),
      local: LocalMediaSchema.optional(),
    }),
  ),
});

export type OfficialMediaManifest = z.infer<typeof OfficialMediaManifestSchema>;

let cachedOfficial: OfficialMediaManifest | null = null;

export async function getOfficialMediaManifest(): Promise<OfficialMediaManifest | null> {
  if (cachedOfficial) return cachedOfficial;
  try {
    const repoRoot = path.resolve(process.cwd(), "..");
    const fp = path.join(repoRoot, "content", "media", "official_media_manifest.json");
    const raw = await fs.readFile(fp, "utf-8");
    cachedOfficial = OfficialMediaManifestSchema.parse(JSON.parse(raw));
    return cachedOfficial;
  } catch {
    return null;
  }
}

