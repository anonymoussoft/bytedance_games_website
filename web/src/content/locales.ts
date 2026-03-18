export const SUPPORTED_LOCALES = ["en", "zh-hans", "ja", "ko"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export function toContentLocaleKey(locale: AppLocale): "en" | "zh-Hans" | "ja" | "ko" {
  switch (locale) {
    case "zh-hans":
      return "zh-Hans";
    case "en":
    case "ja":
    case "ko":
      return locale;
  }
}

