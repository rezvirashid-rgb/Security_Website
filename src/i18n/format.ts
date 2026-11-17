import type { Locale } from "./config";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Display-only digits: Bangla numerals in `bn`. Never use for phone numbers, form values or IDs. */
export function localDigits(value: string | number, locale: Locale): string {
  const s = String(value);
  return locale === "bn" ? s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]) : s;
}

/** Lakh/crore grouping in both languages: 1250000 → "12,50,000" / "১২,৫০,০০০". */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-IN").format(value);
}
