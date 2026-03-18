import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

const FAQ = [
  {
    q: "What is bytedance.games for?",
    a: "It is a brand entry site focused on discoverability and accurate, source-backed information about game entries and updates. It is not a transactional or community platform in the MVP stage.",
  },
  {
    q: "Are all listed games owned or operated by ByteDance?",
    a: "Not necessarily. Each game entry should include a clear attribution label and links to publicly verifiable sources. We avoid making claims beyond what sources support.",
  },
  {
    q: "Why do some entries link to external websites or stores?",
    a: "To keep information verifiable and user-useful, we prioritize official outbound links (official sites and official platform pages) instead of duplicating content.",
  },
  {
    q: "Do you support downloads, accounts, or payments on this site?",
    a: "No. The MVP intentionally does not include downloads, login, payments, or community features.",
  },
  {
    q: "How do you maintain multi-language consistency?",
    a: "Fact fields (links, platforms, attribution labels, timestamps) are maintained in a single structured source and translated with an explicit governance workflow.",
  },
];

export default async function FaqPage({
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
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">{m.nav.faq}</h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">{m.home.disclaimerBody}</p>

          <div className="mt-10 space-y-4">
            {FAQ.map((item) => (
              <section key={item.q} className="rounded-2xl border border-black/5 bg-white p-6">
                <h2 className="text-sm font-semibold text-zinc-950">{item.q}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{item.a}</p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

