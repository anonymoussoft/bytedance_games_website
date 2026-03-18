import Link from "next/link";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { AppLocale } from "@/content/locales";
import type { Messages } from "@/i18n/messages";

export function Header({ locale, m }: { locale: AppLocale; m: Messages }) {
  const base = `/${locale}`;

  return (
    <header className="border-b border-black/5 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={base} className="text-sm font-semibold tracking-tight text-zinc-950">
            {m.siteName}
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-zinc-600 md:flex">
            <Link className="hover:text-zinc-950" href={`${base}/games`}>
              {m.nav.games}
            </Link>
            <Link className="hover:text-zinc-950" href="/chat">
              {m.nav.chat}
            </Link>
            <Link className="hover:text-zinc-950" href={`${base}/news`}>
              {m.nav.news}
            </Link>
            <Link className="hover:text-zinc-950" href={`${base}/insights`}>
              {m.nav.insights}
            </Link>
            <Link className="hover:text-zinc-950" href={`${base}/about`}>
              {m.nav.about}
            </Link>
            <Link className="hover:text-zinc-950" href={`${base}/faq`}>
              {m.nav.faq}
            </Link>
            <Link className="hover:text-zinc-950" href={`${base}/contact`}>
              {m.nav.contact}
            </Link>
          </nav>
        </div>
        <LocaleSwitcher currentLocale={locale} />
      </Container>
    </header>
  );
}

