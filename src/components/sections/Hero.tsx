import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function Hero({ locale, d }: { locale: Locale; d: Dictionary }) {
  const h = d.home.hero;
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="bg-jamdani absolute inset-0 -z-10 opacity-[0.07]" />
      <div className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-brand-700/30 blur-3xl" />
      <Container className="grid items-center gap-12 pt-12 pb-28 sm:pt-16 lg:grid-cols-12 lg:pt-20 lg:pb-36">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-gold-500/10 px-3.5 py-1.5 text-sm font-medium text-gold-300">
            <Icon name="badge-check" className="size-4" strokeWidth={2} />
            {h.eyebrow}
          </p>
          <h1 className="mt-6 text-[2rem] text-white sm:text-5xl lg:text-[3.35rem]">{h.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">{h.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localePath(locale, "/quote")} size="lg" iconRight="arrow-right">
              {d.cta.quote}
            </ButtonLink>
            <ButtonLink href={site.hotline.href} size="lg" variant="alert" icon="phone">
              {d.cta.call}: {site.hotline.display}
            </ButtonLink>
          </div>
          <ul className="mt-9 grid gap-3 text-[0.95rem] text-white/85 sm:grid-cols-1">
            {h.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-950">
                  <Icon name="check" className="size-3.5" strokeWidth={3} />
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <PhotoPlaceholder caption={h.photo} className="aspect-[4/5] w-full border border-white/10 shadow-lift" />
          <div className="absolute -bottom-6 -left-4 flex max-w-[17rem] items-center gap-3 rounded-xl bg-white p-4 text-navy-900 shadow-lift sm:-left-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <Icon name="shield-check" className="size-6" />
            </span>
            <span className="leading-snug">
              <span className="block text-sm font-semibold">{d.licence.licensedBy}</span>
              <span className="mt-0.5 block text-xs text-ink-500">
                {d.licence.number}: <span className="font-mono whitespace-nowrap">{site.licences.moha}</span>
              </span>
            </span>
          </div>
          <div className="absolute -top-4 -right-2 hidden items-center gap-2.5 rounded-xl bg-navy-950/90 px-4 py-3 shadow-lift ring-1 ring-white/10 sm:flex">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-alert-600 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-alert-600" />
            </span>
            <span className="text-sm">
              {d.cta.hotline} <strong className="text-gold-300">{site.hotline.display}</strong>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
