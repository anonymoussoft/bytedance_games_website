import { Container } from "@/components/Container";
import type { AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";

export default async function PrivacyPage({
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
            {m.footer.privacy}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            This MVP does not provide accounts or in-site transactions. Analytics and logs
            (if enabled) should follow applicable privacy regulations and internal policy.
          </p>

          <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
            <h2 className="text-sm font-semibold text-zinc-950">Outbound links</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              The site includes outbound links to official websites or official platform
              pages. External sites have their own privacy policies.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

