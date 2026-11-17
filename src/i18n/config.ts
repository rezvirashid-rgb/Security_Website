export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];

/** Bangla is the default language at the bare domain. */
export const defaultLocale: Locale = "bn";

/** Remembers an explicit language choice made with the switcher. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Prefix an app path with the locale: localePath("bn", "/services") → "/bn/services". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
