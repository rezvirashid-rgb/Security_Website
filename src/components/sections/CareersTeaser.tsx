import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareersTeaser({ locale, d }: { locale: Locale; d: Dictionary }) {
  const c = d.home.careers;
  return (
    <section className="py-20 lg:py-24" aria-labelledby="careers-title">
      <Container>
        <div className="grid gap-10 rounded-3xl border border-ink-200 bg-white p-6 shadow-card sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-7">
            <SectionHeading id="careers-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[0.95rem] text-ink-700">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={2.5} />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={localePath(locale, "/careers/apply-guard")} iconRight="arrow-right">
                {d.cta.apply}
              </ButtonLink>
              <ButtonLink href={site.hotline.href} variant="outline" icon="phone">
                {c.callToApply}
              </ButtonLink>
            </div>
          </div>
          <aside
            className="self-start rounded-2xl border-l-4 border-alert-600 bg-alert-50 p-6 lg:col-span-5"
            aria-labelledby="fraud-title"
          >
            <p id="fraud-title" className="flex items-center gap-2.5 text-lg font-bold text-alert-700">
              <Icon name="triangle-alert" className="size-6 shrink-0" strokeWidth={2} />
              {c.fraudTitle}
            </p>
            <p className="mt-3 text-[0.95rem] text-ink-700">{c.fraudText}</p>
            <a
              href={site.hotline.href}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-alert-700 ring-1 ring-alert-100"
            >
              <Icon name="phone" className="size-4" strokeWidth={2} />
              {c.fraudVerify}: {site.hotline.display}
            </a>
          </aside>
        </div>
      </Container>
    </section>
  );
}
