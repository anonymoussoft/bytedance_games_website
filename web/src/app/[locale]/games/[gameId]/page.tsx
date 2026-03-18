import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { SafeImage } from "@/components/SafeImage";
import {
  getLocalizedDescription,
  getLocalizedGameName,
  getSeedGameMedia,
  getSeedGameById,
  PLACEHOLDER_GAME_IMAGE,
} from "@/content/seed";
import type { AppLocale } from "@/content/locales";
import { SUPPORTED_LOCALES } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; gameId: string }>;
}): Promise<Metadata> {
  const { locale, gameId } = await params;
  const game = await getSeedGameById(gameId);
  if (!game) return {};

  const title = getLocalizedGameName(game, locale);
  const description =
    getLocalizedDescription(game, locale).slice(0, 160) ||
    "Platforms, official links, and source-backed references.";
  const media = await getSeedGameMedia(gameId);
  const ogImage = media?.hero ?? PLACEHOLDER_GAME_IMAGE;

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) languages[l] = `/${l}/games/${gameId}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/games/${gameId}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; gameId: string }>;
}) {
  const { locale, gameId } = await params;
  const m = getMessages(locale);
  const game = await getSeedGameById(gameId);
  if (!game) notFound();

  const title = getLocalizedGameName(game, locale);
  const description = getLocalizedDescription(game, locale);
  const media = await getSeedGameMedia(game.id);
  const hero = media?.hero || PLACEHOLDER_GAME_IMAGE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: title,
    url: `https://bytedance.games/${locale}/games/${gameId}`,
    operatingSystem: game.platforms?.join(", "),
    sameAs: game.official_links?.map((l) => l.url).filter(Boolean),
  };

  return (
    <main className="py-14">
      <Container>
        <nav className="text-sm text-zinc-600">
          <Link className="hover:text-zinc-950" href={`/${locale}`}>
            {m.siteName}
          </Link>{" "}
          <span className="mx-2">/</span>
          <Link className="hover:text-zinc-950" href={`/${locale}/games`}>
            {m.nav.games}
          </Link>{" "}
          <span className="mx-2">/</span>
          <span className="text-zinc-950">{title}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 whitespace-pre-line text-base leading-7 text-zinc-600">
                {description}
              </p>
            ) : null}

            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-black/5 bg-white p-5">
                <div className="text-sm font-semibold text-zinc-950">{m.games.officialLinks}</div>
                <div className="mt-3 flex flex-col gap-2">
                  {(game.official_links || []).map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-sm text-zinc-950 hover:border-black/10"
                    >
                      <span className="font-medium">{l.label}</span>
                      <span className="text-zinc-600">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-5">
                <div className="text-sm font-semibold text-zinc-950">{m.games.platforms}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(game.platforms || []).map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs leading-5 text-zinc-600">
                  {m.home.disclaimerBody}
                </div>
              </div>
            </div>
          </div>

          <aside>
            <div className="rounded-3xl border border-black/5 bg-white p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100">
                <SafeImage
                    alt={title}
                    src={hero}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    priority
                    className="h-full w-full object-cover"
                  />
              </div>
              <div className="mt-4 text-xs font-medium text-zinc-600">{m.games.sourceNote}</div>
              <div className="mt-2 text-sm text-zinc-950">{game.relationship?.label}</div>
              {game.relationship?.claims?.length ? (
                <ul className="mt-3 list-disc pl-5 text-xs leading-5 text-zinc-600">
                  {game.relationship.claims.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

