import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getArticle, localize } from "@/content/articles";
import { getMessages } from "@/i18n/messages";

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const m = getMessages(locale);
  const a = getArticle("insights", slug);
  if (!a) notFound();

  return (
    <main className="py-14">
      <Container>
        <nav className="text-sm text-zinc-600">
          <Link className="hover:text-zinc-950" href={`/${locale}/insights`}>
            {m.nav.insights}
          </Link>{" "}
          <span className="mx-2">/</span>
          <span className="text-zinc-950">{localize(a.title, locale)}</span>
        </nav>

        <article className="mt-8 max-w-3xl">
          <div className="text-xs font-medium text-zinc-600">{a.date}</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            {localize(a.title, locale)}
          </h1>
          <p className="mt-4 whitespace-pre-line text-base leading-7 text-zinc-600">
            {localize(a.body, locale)}
          </p>

          {a.sources?.length ? (
            <section className="mt-10 rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="text-sm font-semibold text-zinc-950">Sources</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                {a.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      className="text-zinc-950 underline underline-offset-4 hover:no-underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </Container>
    </main>
  );
}

