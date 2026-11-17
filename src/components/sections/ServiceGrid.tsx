import Link from "next/link";
import { services } from "@/data/catalog";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "@/components/ui/Icon";

export function ServiceGrid({
  locale,
  d,
  detailed = false,
}: {
  locale: Locale;
  d: Dictionary;
  detailed?: boolean;
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const item = d.services.items[s.slug];
        return (
          <li key={s.slug}>
            <Link
              href={localePath(locale, `/services/${s.slug}`)}
              className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                <Icon name={s.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-lg text-navy-900">{item.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-600">{item.summary}</p>
              {detailed && (
                <ul className="mt-4 grid gap-2 border-t border-ink-100 pt-4 text-sm text-ink-700">
                  {item.included.slice(0, 3).map((inc) => (
                    <li key={inc} className="flex gap-2">
                      <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={2.5} />
                      {inc}
                    </li>
                  ))}
                </ul>
              )}
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
                {d.cta.learnMore}
                <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
