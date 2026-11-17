import type { Metadata } from "next";
import { site } from "@/config/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CTABand } from "@/components/sections/CTABand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceGrid";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  return { title: d.services.hub.title, description: d.services.hub.lead, alternates: alternates("/services", locale) };
}

export default async function ServicesPage() {
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  const hub = d.services.hub;
  return (
    <>
      <PageHeader locale={locale} d={d} title={hub.title} lead={hub.lead} />
      <section className="py-16 lg:py-20">
        <Container>
          <ServiceGrid locale={locale} d={d} detailed />
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-200 bg-brand-50 p-7 sm:p-9 lg:flex-row lg:items-center">
            <div className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-700 text-white">
                <Icon name="scan-search" className="size-6" />
              </span>
              <div>
                <h2 className="text-xl text-navy-900">{hub.notSureTitle}</h2>
                <p className="mt-1.5 max-w-2xl text-ink-700">{hub.notSureText}</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={localePath(locale, "/quote")} iconRight="arrow-right">
                {d.cta.survey}
              </ButtonLink>
              <ButtonLink href={site.hotline.href} variant="alert" icon="phone">
                {site.hotline.display}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <ProcessSteps locale={locale} d={d} />
      <CTABand locale={locale} d={d} />
    </>
  );
}
