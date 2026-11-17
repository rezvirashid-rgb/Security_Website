import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, type Locale } from "./config";

type BnDictionary = typeof import("@/dictionaries/bn.json");
type EnDictionary = typeof import("@/dictionaries/en.json");

/**
 * Compile-time translation parity: Bangla is the source of truth, and English
 * must have exactly the same keys. A missing or extra key fails `tsc`.
 */
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const parity: Same<BnDictionary, EnDictionary> = true;
void parity;

export type Dictionary = BnDictionary;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  bn: () => import("@/dictionaries/bn.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

/** Current locale from the root `[locale]` segment. 404s on unknown values. */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
