import { localDigits } from "@/i18n/format";

const MONTHS = [
  "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
  "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র",
];

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/**
 * Revised Bangla Academy calendar (as used in Bangladesh since 2019):
 * 1 Boishakh = 14 April; Boishakh–Ashwin 31 days; Kartik–Chaitra 30 days,
 * except Falgun 29 (30 in a Gregorian leap year). Keeps 21 Feb = 8 Falgun,
 * 26 Mar = 12 Chaitra and 16 Dec = 1 Poush fixed.
 */
export function toBanglaDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const y = get("year");
  const m = get("month");
  const d = get("day");

  const startYear = m > 4 || (m === 4 && d >= 14) ? y : y - 1;
  let index = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(startYear, 3, 14)) / 86_400_000);
  const lengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap(startYear + 1) ? 30 : 29, 30];

  let month = 0;
  while (index >= lengths[month]) {
    index -= lengths[month];
    month += 1;
  }
  return `${localDigits(index + 1, "bn")} ${MONTHS[month]} ${localDigits(startYear - 593, "bn")} বঙ্গাব্দ`;
}
