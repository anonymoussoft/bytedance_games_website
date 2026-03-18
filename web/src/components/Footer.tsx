import Link from "next/link";
import { Container } from "./Container";
import type { AppLocale } from "@/content/locales";
import type { Messages } from "@/i18n/messages";

export function Footer({ locale, m }: { locale: AppLocale; m: Messages }) {
  const base = `/${locale}`;
  return (
    <footer className="border-t border-black/5 bg-white">
      <Container className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-zinc-600">
          © {new Date().getFullYear()} ByteDance
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600">
          <Link className="hover:text-zinc-950" href={`${base}/legal`}>
            {m.footer.legal}
          </Link>
          <Link className="hover:text-zinc-950" href={`${base}/privacy`}>
            {m.footer.privacy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}

