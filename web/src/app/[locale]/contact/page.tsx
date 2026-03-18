import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export default async function ContactPage({
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
            {m.nav.contact}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            For corporate contact channels and press inquiries, please use the company’s
            official contact channels.
          </p>

          <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">Official reference</div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Contact and press inquiries are handled through the company’s official
              channels.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-black/5 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">Content correction</div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              If you find incorrect attribution, broken links, or outdated information in a
              game entry, please open an internal issue in this repository and attach the
              relevant source URL.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

