// Client-safe locale config. Server-only dictionary loading lives in dictionaries.ts.
export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// German copy uses Swiss spelling (ss instead of ß), hence de-CH.
export const htmlLang: Record<Locale, string> = { en: "en", de: "de-CH" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", de: "de_CH" };
export const languageNames: Record<Locale, string> = { en: "English", de: "Deutsch" };

// Self-referencing canonical plus hreflang for every language. x-default is the
// default language's URL: unprefixed URLs only redirect there (public/_redirects).
export function localeAlternates(locale: Locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
