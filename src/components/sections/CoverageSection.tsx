import { divisions } from "@/data/catalog";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localDigits } from "@/i18n/format";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Division tiles instead of a drawn map: any map of Bangladesh must use accurate
 * official boundaries, so a sourced map SVG is added later rather than sketched.
 */
export function CoverageSection({ locale, d }: { locale: Locale; d: Dictionary }) {
  const c = d.home.coverage;
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="coverage-title">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="coverage-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
          <h3 className="mt-8 text-base text-navy-900">{c.officesTitle}</h3>
          <ul className="mt-3 grid gap-3">
            {c.offices.map((o) => (
              <li key={o.name} className="flex gap-3 rounded-xl border border-ink-200 bg-paper p-4">
                <Icon name="map-pin" className="mt-1 size-5 shrink-0 text-alert-600" strokeWidth={2} />
                <span>
                  <span className="block font-semibold text-navy-900">{o.name}</span>
                  <span className="block text-sm text-ink-600">{o.address}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid grid-cols-2 gap-3 self-start sm:grid-cols-4 lg:col-span-7">
          {divisions.map((div) => {
            const office = "office" in div ? div.office : undefined;
            return (
              <li
                key={div.key}
                className={`relative flex min-h-32 flex-col gap-1 rounded-2xl p-4 ${
                  office === "hq"
                    ? "bg-navy-900 text-white"
                    : office === "branch"
                      ? "bg-brand-800 text-white"
                      : "border border-ink-200 bg-paper text-navy-900"
                }`}
              >
                <span className="text-lg font-bold">{d.divisions[div.key]}</span>
                <span className={`text-sm ${office ? "text-white/70" : "text-ink-600"}`}>
                  {localDigits(div.districts, locale)}{c.districts}
                </span>
                {office && (
                  <span className="mt-auto inline-flex w-fit items-center rounded-full bg-gold-500 px-2 py-0.5 text-[0.7rem] font-semibold text-navy-950">
                    {office === "hq" ? c.hq : c.branch}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
