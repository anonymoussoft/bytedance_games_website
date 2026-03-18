import Link from "next/link";
import { Container } from "@/components/Container";
import { GameCard } from "@/components/GameCard";
import { getSeedGameMedia, getSeedGames, PLACEHOLDER_GAME_IMAGE } from "@/content/seed";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const m = getMessages(locale);
  const games = await getSeedGames();
  const featured = games.slice(0, 6);

  return (
    <main>
      <section className="py-14">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              {m.home.heroTitle}
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">{m.home.heroSubtitle}</p>
          </div>
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          <div className="rounded-3xl border border-black/5 bg-white p-6">
            <div className="text-sm font-semibold tracking-tight text-zinc-950">
              {m.home.disclaimerTitle}
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{m.home.disclaimerBody}</p>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
              {m.home.featuredGames}
            </h2>
            <Link
              href={`/${locale}/games`}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
            >
              {m.nav.games} →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {await Promise.all(
              featured.map(async (g) => {
                const media = await getSeedGameMedia(g.id);
                return (
                  <GameCard
                    key={g.id}
                    game={g}
                    locale={locale}
                    href={`/${locale}/games/${g.id}`}
                    imageUrl={media?.card || media?.thumb || media?.icon || PLACEHOLDER_GAME_IMAGE}
                  />
                );
              }),
            )}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
            {m.home.latestUpdates}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-sm font-semibold text-zinc-950">MVP launch</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                This is an MVP focused on brand discoverability, SEO foundations, and
                source-backed game entries.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-sm font-semibold text-zinc-950">Content governance</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Each entry is expected to include verifiable sources and official outbound
                links.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="text-sm font-semibold text-zinc-950">Next steps</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Expand language coverage, add News/Insights cadence, and replace seed sources
                with first-party references when available.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

