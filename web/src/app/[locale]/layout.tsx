import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type AppLocale } from "@/content/locales";
import { getMessages } from "@/i18n/messages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

function isLocale(x: string): x is AppLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(x);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (raw || DEFAULT_LOCALE) as AppLocale;
  const m = getMessages(isLocale(locale) ? locale : DEFAULT_LOCALE);

  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) languages[l] = `/${l}`;

  return {
    metadataBase: new URL("https://bytedance.games"),
    title: {
      default: m.siteName,
      template: `%s | ${m.siteName}`,
    },
    description:
      "ByteDance Games brand entry site for game products, updates, and verifiable references.",
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: m.siteName,
      description:
        "ByteDance Games brand entry site for game products, updates, and verifiable references.",
      url: `https://bytedance.games/${locale}`,
      siteName: m.siteName,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  const locale = raw || DEFAULT_LOCALE;
  if (!isLocale(locale)) notFound();

  const m = getMessages(locale);

  return (
    <>
      <Header locale={locale} m={m} />
      {children}
      <Footer locale={locale} m={m} />
    </>
  );
}

