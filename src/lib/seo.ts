import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/config";

/** Canonical URL plus hreflang alternates (bn, en, x-default → bn) for a page path. */
export function alternates(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: localePath(locale, path),
    languages: {
      bn: localePath("bn", path),
      en: localePath("en", path),
      "x-default": localePath("bn", path),
    },
  };
}
