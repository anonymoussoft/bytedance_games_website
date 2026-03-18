import Link from "next/link";
import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getArticles, localize } from "@/content/articles";
import { getMessages } from "@/i18n/messages";

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const m = getMessages(locale);
  const items = getArticles("insights");

  return (
    <main className="py-14">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            {m.nav.insights}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Maintainable notes on information architecture, SEO foundations, and content
            governance.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((a) => (
            <Link
              key={a.slug}
              href={`/${locale}/insights/${a.slug}`}
              className="rounded-2xl border border-black/5 bg-white p-6 hover:border-black/10"
            >
              <div className="text-xs font-medium text-zinc-600">{a.date}</div>
              <div className="mt-2 text-sm font-semibold text-zinc-950">
                {localize(a.title, locale)}
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {localize(a.summary, locale)}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}

