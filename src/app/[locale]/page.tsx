import type { Metadata } from "next";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareersTeaser } from "@/components/sections/CareersTeaser";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { CTABand } from "@/components/sections/CTABand";
import { Hero } from "@/components/sections/Hero";
import { IndustryRow } from "@/components/sections/IndustryRow";
import { LeadershipMessage } from "@/components/sections/LeadershipMessage";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyUs } from "@/components/sections/WhyUs";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: alternates("/", await getLocale()) };
}

export default async function HomePage() {
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  const s = d.home.services;
  return (
    <>
      <Hero locale={locale} d={d} />
      <TrustStrip locale={locale} d={d} />

      <section className="py-20 lg:py-24" aria-labelledby="services-title">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading id="services-title" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
            <ButtonLink href={localePath(locale, "/services")} variant="outline" iconRight="arrow-right" className="self-start lg:self-auto">
              {d.cta.allServices}
            </ButtonLink>
          </div>
          <ServiceGrid locale={locale} d={d} />
        </Container>
      </section>

      <WhyUs d={d} />
      <ProcessSteps locale={locale} d={d} />
      <IndustryRow locale={locale} d={d} />
      <LeadershipMessage locale={locale} d={d} />
      <ClientsSection d={d} />
      <CoverageSection locale={locale} d={d} />
      <CareersTeaser locale={locale} d={d} />
      <CTABand locale={locale} d={d} />
    </>
  );
}
