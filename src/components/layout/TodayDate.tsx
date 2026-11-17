"use client";

import { useSyncExternalStore } from "react";
import { toBanglaDate } from "@/lib/bangla-date";
import type { Locale } from "@/i18n/config";

const subscribe = () => () => {};

/**
 * Today's date, rendered on the client only (pages are prerendered, so a
 * server-side date would freeze at build time). Bangla shows the Gregorian
 * date plus the Bangla calendar date, as is common on Bangladeshi sites.
 */
export function TodayDate({ locale }: { locale: Locale }) {
  const now = useSyncExternalStore(
    subscribe,
    () => new Date().toDateString(),
    () => null,
  );
  if (!now) return <span className="inline-block min-w-48" aria-hidden="true" />;

  const date = new Date();
  const gregorian = new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <span>
      {gregorian}
      {locale === "bn" && <span className="text-gold-300"> · {toBanglaDate(date)}</span>}
    </span>
  );
}
