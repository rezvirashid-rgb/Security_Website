import Link from "next/link";
import { industries } from "@/data/catalog";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustryRow({ locale, d }: { locale: Locale; d: Dictionary }) {
  const s = d.home.industries;
  return (
    <section className="py-20 lg:py-24" aria-labelledby="industries-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="industries-title" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={localePath(locale, `/industries/${ind.slug}`)}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-6 text-center transition-colors hover:border-brand-300"
              >
                <span className="grid size-14 place-items-center rounded-full bg-paper text-navy-900 ring-1 ring-ink-200 transition-colors group-hover:bg-navy-900 group-hover:text-gold-400">
                  <Icon name={ind.icon} className="size-7" />
                </span>
                <span className="text-[0.95rem] font-semibold text-navy-900">{d.industries[ind.slug]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
