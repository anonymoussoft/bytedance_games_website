import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const m = getMessages(locale);

  return (
    <main className="py-14">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            {m.nav.about}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            {m.siteName} is designed as an enterprise-grade entry site for game-related
            products and updates. At this stage, the site prioritizes brand presentation,
            source-backed aggregation, and search discoverability.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4">
            <section className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="text-sm font-semibold text-zinc-950">What we do</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                <li>
                  Provide a curated list of game entries with verifiable references and
                  official outbound links.
                </li>
                <li>
                  Publish light-weight updates and insights that can be maintained over
                  time.
                </li>
                <li>
                  Maintain a stable information architecture and SEO foundation across
                  multiple languages.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="text-sm font-semibold text-zinc-950">What we do not do (MVP)</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                <li>No in-site transactions, downloads, login, or community features.</li>
                <li>No keyword stuffing, doorway pages, or low-quality scraped pages.</li>
                <li>
                  No claims about ownership/operation beyond what public sources can
                  support.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="text-sm font-semibold text-zinc-950">Reference</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                For official corporate information, see the company’s official channels.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}

