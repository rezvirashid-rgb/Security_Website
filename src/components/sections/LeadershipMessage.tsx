import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SampleTag } from "@/components/ui/SampleTag";

/** "Message from the Managing Director" — an expected section on Bangladeshi corporate sites. */
export function LeadershipMessage({ locale, d }: { locale: Locale; d: Dictionary }) {
  const l = d.home.leadership;
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="md-title">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <PhotoPlaceholder caption={l.photo} className="mx-auto aspect-[3/4] max-w-xs lg:max-w-none" />
        </div>
        <div className="lg:col-span-8">
          <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-brand-700">
            <span className="kantha" aria-hidden="true" />
            <span id="md-title">{l.eyebrow}</span>
          </p>
          <Icon name="quote" className="size-12 text-gold-500" strokeWidth={1.5} />
          <blockquote className="mt-4 text-xl font-medium text-navy-900 sm:text-2xl">
            <p className="leading-relaxed">{l.quote}</p>
          </blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-200 pt-6">
            <div>
              <p className="text-lg font-bold text-navy-900">{l.name}</p>
              <p className="text-sm text-ink-600">{l.role}</p>
            </div>
            <SampleTag label={d.preview.sample} />
            <Link
              href={localePath(locale, "/about")}
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {l.readMore}
              <Icon name="arrow-right" className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
