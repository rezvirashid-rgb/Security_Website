import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatNumber } from "@/i18n/format";
import { Container } from "@/components/ui/Container";

export function TrustStrip({ locale, d }: { locale: Locale; d: Dictionary }) {
  const stats = [
    { value: site.stats.years, label: d.stats.years },
    { value: site.stats.guards, label: d.stats.guards },
    { value: site.stats.clients, label: d.stats.clients },
    { value: site.stats.districts, label: d.stats.districts },
  ];
  return (
    <Container className="relative z-10 -mt-14 lg:-mt-16">
      <dl className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-ink-200 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col-reverse gap-1 px-5 py-6 text-center sm:px-8 sm:py-7 ${
              i % 2 === 1 ? "border-l border-ink-200" : ""
            } ${i >= 2 ? "border-t border-ink-200 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="text-sm text-ink-600">{s.label}</dt>
            <dd className="text-3xl font-bold text-navy-900 sm:text-4xl">
              {formatNumber(s.value, locale)}
              <span className="text-brand-600">+</span>
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
