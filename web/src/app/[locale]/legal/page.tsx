import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export default async function LegalPage({
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
            {m.footer.legal}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            This MVP site provides informational content and outbound links for reference.
            Game entries are displayed with attribution and source snapshots where
            applicable.
          </p>

          <div className="mt-8 space-y-4">
            <section className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="text-sm font-semibold text-zinc-950">Trademarks & copyrights</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                All product names, logos, and brands are property of their respective
                owners. Any media assets referenced from external sources should be treated
                as third-party materials unless explicitly licensed.
              </p>
            </section>
            <section className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="text-sm font-semibold text-zinc-950">Attribution</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                When the site uses seed data, it stores verbatim source snapshots under{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5">content/_sources</code>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}

