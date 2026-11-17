import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function CTABand({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-16 text-white lg:py-20">
      <div className="bg-jamdani absolute inset-0 -z-10 opacity-[0.07]" />
      <div className="absolute -bottom-40 -left-20 -z-10 size-[32rem] rounded-full bg-brand-700/30 blur-3xl" />
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-white sm:text-3xl">{d.cta.bandTitle}</h2>
          <p className="mt-3 text-white/75">{d.cta.bandLead}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
          <ButtonLink href={localePath(locale, "/quote")} size="lg" iconRight="arrow-right">
            {d.cta.quote}
          </ButtonLink>
          <ButtonLink href={site.hotline.href} size="lg" variant="alert" icon="phone">
            {site.hotline.display}
          </ButtonLink>
          <ButtonLink href={site.profilePdf} size="lg" variant="light" icon="download">
            {d.cta.profile}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
