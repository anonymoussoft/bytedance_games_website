import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/content/locales";
import { getSeedGames } from "@/content/seed";
import { ARTICLES } from "@/content/articles";

const BASE_URL = "https://bytedance.games";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const games = await getSeedGames();

  const staticPaths = [
    "",
    "/games",
    "/news",
    "/insights",
    "/about",
    "/faq",
    "/contact",
    "/legal",
    "/privacy",
  ];

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/chat`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://chat.bytedance.games/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  for (const locale of SUPPORTED_LOCALES) {
    for (const p of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${p}`,
        lastModified: now,
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1 : 0.6,
      });
    }

    for (const g of games) {
      entries.push({
        url: `${BASE_URL}/${locale}/games/${g.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const a of ARTICLES) {
      entries.push({
        url: `${BASE_URL}/${locale}/${a.kind}/${a.slug}`,
        lastModified: new Date(a.date),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}

