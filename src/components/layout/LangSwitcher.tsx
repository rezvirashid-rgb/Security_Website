"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

/** Switches language on the SAME page (never dumps the visitor on the home page). */
export function LangSwitcher({
  current,
  labels,
  ariaLabel,
  tone = "dark",
}: {
  current: Locale;
  labels: Record<Locale, string>;
  ariaLabel: string;
  tone?: "dark" | "light";
}) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav aria-label={ariaLabel} className="flex items-center">
      <ul
        className={`flex rounded-full p-0.5 text-[0.8rem] font-semibold ${
          tone === "dark" ? "bg-white/10" : "bg-ink-100"
        }`}
      >
        {locales.map((l) => {
          const active = l === current;
          return (
            <li key={l}>
              <Link
                href={`/${l}${rest ? `/${rest}` : ""}`}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
                }}
                className={`block rounded-full px-3 py-1 transition-colors ${
                  active
                    ? tone === "dark"
                      ? "bg-gold-500 text-navy-950"
                      : "bg-navy-900 text-white"
                    : tone === "dark"
                      ? "text-white/80 hover:text-white"
                      : "text-ink-700 hover:text-navy-900"
                }`}
              >
                {labels[l]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
