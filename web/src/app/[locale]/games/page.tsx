import Link from "next/link";
import { Container } from "@/components/Container";
import { GameCard } from "@/components/GameCard";
import { getSeedGameMedia, getSeedGames, PLACEHOLDER_GAME_IMAGE } from "@/content/seed";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const m = getMessages(locale);
  const games = await getSeedGames();

  return (
    <main className="py-14">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            {m.games.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600">{m.games.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {await Promise.all(
            games.map(async (g) => {
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

        <div className="mt-12 text-sm text-zinc-600">
          <div className="font-medium text-zinc-950">{m.home.disclaimerTitle}</div>
          <p className="mt-1 leading-6">{m.home.disclaimerBody}</p>
          <p className="mt-3 leading-6">
            Source snapshots for the current seed set are stored in{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5">content/_sources</code>.
          </p>
          <p className="mt-3 leading-6">
            Want to report an issue? Contact{" "}
            <Link
              className="text-zinc-950 underline underline-offset-4 hover:no-underline"
              href={`/${locale}/contact`}
            >
              {m.nav.contact}
            </Link>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}

