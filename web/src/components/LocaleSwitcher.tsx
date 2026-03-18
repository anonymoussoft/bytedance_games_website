"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type AppLocale } from "@/content/locales";

function replaceLocale(pathname: string, nextLocale: AppLocale) {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return `/${nextLocale}`;
  const first = parts[0] as string;
  const isLocale = (SUPPORTED_LOCALES as readonly string[]).includes(first);
  const rest = isLocale ? parts.slice(1) : parts;
  return `/${nextLocale}/${rest.join("/")}`.replace(/\/$/, "");
}

export function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: AppLocale | undefined;
}) {
  const pathname = usePathname() || `/${DEFAULT_LOCALE}`;
  const locale = currentLocale ?? DEFAULT_LOCALE;

  return (
    <div className="flex items-center gap-2 text-sm text-zinc-600">
      {SUPPORTED_LOCALES.map((l) => {
        const href = replaceLocale(pathname, l);
        const active = l === locale;
        return (
          <Link
            key={l}
            href={href}
            className={
              active
                ? "rounded-full bg-zinc-900 px-2 py-1 text-white"
                : "rounded-full px-2 py-1 hover:bg-zinc-100"
            }
            aria-current={active ? "page" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

