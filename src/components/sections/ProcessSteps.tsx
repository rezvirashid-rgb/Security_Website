import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localDigits } from "@/i18n/format";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSteps({ locale, d }: { locale: Locale; d: Dictionary }) {
  const p = d.home.process;
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 py-20 text-white lg:py-24" aria-labelledby="process-title">
      <div className="bg-jamdani absolute inset-0 -z-10 opacity-[0.08]" />
      <Container>
        <SectionHeading id="process-title" eyebrow={p.eyebrow} title={p.title} lead={p.lead} align="center" tone="dark" />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="kantha-line absolute top-7 right-[12%] left-[12%] hidden opacity-60 lg:block" aria-hidden="true" />
          {p.steps.map((step, i) => (
            <li key={step.title} className="relative text-center">
              <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-gold-500 text-2xl font-bold text-navy-950 ring-8 ring-brand-900">
                {localDigits(i + 1, locale)}
              </span>
              <h3 className="mt-5 text-lg text-white">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[0.95rem] text-white/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
